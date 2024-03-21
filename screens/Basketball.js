import { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  StyleSheet,
} from 'react-native';
import { Foundation, FontAwesome5 } from 'react-native-vector-icons';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import NotificationModal from '../components/NotificationModal';
import TeamContainer from '../components/TeamContainer';
import BackgroundImage, { BG_IMAGES } from '../components/BackgroundImage';
import ModalContainer from '../components/ModalContainer';
import { TEAMS } from '../assets/BasketballTeams';
import { SOCIAL_MEDIA_ICONS } from '../assets/Icons';

const Basketball = ({ navigation }) => {
  const [modalState, setModalState] = useState(false);
  const [homeTeam, setHomeTeam] = useState({});
  const [awayTeam, setAwayTeam] = useState({});
  const [matches, setMatches] = useState([]);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [username, setUsername] = useState('mustafaxt2');
  const [icon, setIcon] = useState(SOCIAL_MEDIA_ICONS.ig.img);

  const buttonScale = useSharedValue(1);

  const onPressIn = () => {
    buttonScale.value = withSpring(0.9);
  };

  const onPressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const usernameHandler = (text) => {
    setUsername(text);
  };

  const iconHandler = (text) => {
    setIcon(text);
  };

  const HomePointsHandler = useCallback((team) => {
    setHomeTeam(team);
  }, []);

  const AwayPointsHandler = useCallback((team) => {
    setAwayTeam(team);
  }, []);

  const getPredictedScore = useCallback(() => {
    const {
      avgScoreWhenWon: homeScoreWhenWon,
      avgScoreWhenLost: homeScoreWhenLost,
      avgConcedeWhenWon: homeConcedeWhenWon,
      avgConcedeWhenLost: homeConcedeWhenLost,
    } = homeTeam;

    const {
      avgScoreWhenWon: awayScoreWhenWon,
      avgScoreWhenLost: awayScoreWhenLost,
      avgConcedeWhenWon: awayConcedeWhenWon,
      avgConcedeWhenLost: awayConcedeWhenLost,
    } = awayTeam;

    const homePredictedScore = (
      (parseFloat(homeScoreWhenWon) + parseFloat(awayConcedeWhenLost)) / 2 +
      (parseFloat(homeConcedeWhenWon) + parseFloat(awayScoreWhenLost)) / 2
    ).toFixed(2);
    const totalPointsWhenHomeLost = (
      parseFloat(homeScoreWhenLost) + parseFloat(homeConcedeWhenLost)
    ).toFixed(2);
    const totalPointsWhenHomeWon = (
      parseFloat(homeScoreWhenWon) + parseFloat(homeConcedeWhenWon)
    ).toFixed(2);
    const awayPredictedScore = (
      (parseFloat(awayScoreWhenWon) + parseFloat(homeConcedeWhenLost)) / 2 +
      (parseFloat(awayConcedeWhenWon) + parseFloat(homeScoreWhenLost)) / 2
    ).toFixed(2);
    const totalPointsWhenAwayLost = (
      parseFloat(awayScoreWhenLost) + parseFloat(awayConcedeWhenLost)
    ).toFixed(2);
    const totalPointsWhenAwayWon = (
      parseFloat(awayScoreWhenWon) + parseFloat(awayConcedeWhenWon)
    ).toFixed(2);
    const avgTotalPointsIfHomeWins = (
      (parseFloat(totalPointsWhenHomeWon) +
        parseFloat(totalPointsWhenAwayLost)) /
      2
    ).toFixed(2);
    const avgTotalPointsIfAwayWins = (
      (parseFloat(totalPointsWhenAwayWon) +
        parseFloat(totalPointsWhenHomeLost)) /
      2
    ).toFixed(2);
    const avgPredictedScore = (
      (parseFloat(homePredictedScore) + parseFloat(awayPredictedScore)) /
      2
    ).toFixed(2);
    const avgTotalPoints = (
      (parseFloat(avgTotalPointsIfHomeWins) +
        parseFloat(avgTotalPointsIfAwayWins)) /
      2
    ).toFixed(2);

    return {
      homePredictedScore,
      totalPointsWhenHomeWon,
      totalPointsWhenHomeLost,
      awayPredictedScore,
      totalPointsWhenAwayWon,
      totalPointsWhenAwayLost,
      avgTotalPointsIfHomeWins,
      avgTotalPointsIfAwayWins,
      avgPredictedScore,
      avgTotalPoints,
    };
  }, [awayTeam, homeTeam]);

  const GuessButtonHandler = useCallback(() => {
    if (!homeTeam.calculated || !awayTeam.calculated) {
      Alert.alert('Not Calculated', 'Please calculate the scores!');
    } else {
      let avgPredictedScores = getPredictedScore();
      setMatches([
        ...matches,
        {
          id: Math.random(),
          homeTeamID: homeTeam.id,
          homeTeamTitle: homeTeam.title,
          homeTeamImg: homeTeam.img,
          homeTeamAvgScore: homeTeam.score,
          homeTeamAvgConcede: homeTeam.concede,
          homeTeamAvgScoreWhenWon: homeTeam.avgScoreWhenWon,
          homeTeamAvgScoreWhenLost: homeTeam.avgScoreWhenLost,
          homeTeamAvgConcedeWhenWon: homeTeam.avgConcedeWhenWon,
          homeTeamAvgConcedeWhenLost: homeTeam.avgConcedeWhenLost,
          homeTeamWinRate: homeTeam.rate,
          awayTeamID: awayTeam.id,
          awayTeamTitle: awayTeam.title,
          awayTeamImg: awayTeam.img,
          awayTeamAvgScore: awayTeam.score,
          awayTeamAvgConcede: awayTeam.concede,
          awayTeamAvgScoreWhenWon: awayTeam.avgScoreWhenWon,
          awayTeamAvgScoreWhenLost: awayTeam.avgScoreWhenLost,
          awayTeamAvgConcedeWhenWon: awayTeam.avgConcedeWhenWon,
          awayTeamAvgConcedeWhenLost: awayTeam.avgConcedeWhenLost,
          awayTeamWinRate: awayTeam.rate,
          predictedScores: avgPredictedScores,
        },
      ]);
      setNotificationVisible(true);
    }
  }, [homeTeam, awayTeam, matches, getPredictedScore]);

  const ClearButtonHandler = useCallback(() => {
    setMatches([]);
    Alert.alert('Success', 'Coupon is cleared!');
  }, []);

  const CouponButtonHandler = useCallback(() => {
    matches.length !== 0
      ? setModalState(true)
      : Alert.alert('Empty', 'Your coupon is empty, make one!');
  }, [matches]);

  const removeMatch = (matchId) => {
    setMatches(matches.filter((match) => match.id !== matchId));
    Alert.alert('Match Removed', 'The match has been successfully removed.');
  };
  return (
    <BackgroundImage img={BG_IMAGES.basketball}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={[styles.innerContainer, { height: hp('90%') }]}>
            <TeamContainer onPress={HomePointsHandler} data={TEAMS} />
            <View style={styles.buttonContainer}>
              <TapGestureHandler
                onGestureEvent={onPressIn}
                onHandlerStateChange={({ nativeEvent }) => {
                  if (nativeEvent.state === State.END) {
                    onPressOut();
                    CouponButtonHandler();
                  }
                }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { transform: [{ scale: buttonScale.value }] },
                  ]}
                  onPress={CouponButtonHandler}>
                  <Foundation
                    name="clipboard-notes"
                    size={wp('10%')}
                    color="#fff"
                  />
                </TouchableOpacity>
              </TapGestureHandler>
              <TouchableOpacity
                style={styles.button}
                disabled={!homeTeam || !awayTeam}
                onPress={GuessButtonHandler}>
                <Foundation
                  name="clipboard-pencil"
                  size={wp('10%')}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ClearButtonHandler}>
                <FontAwesome5 name="eraser" size={wp('10%')} color="#fff" />
              </TouchableOpacity>
            </View>
            <TeamContainer onPress={AwayPointsHandler} data={TEAMS} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ModalContainer
        state={modalState}
        type={'basketball'}
        onPress={() => setModalState(false)}
        data={matches}
        teams={TEAMS}
        onLongPress={removeMatch}
        img={{
          bg: BG_IMAGES.basketball,
          ball: BG_IMAGES.basketball_ball,
        }}
        username={username}
        usernameHandler={usernameHandler}
        icon={icon}
        iconHandler={iconHandler}
      />
      <NotificationModal
        state={notificationVisible}
        onHide={() => setNotificationVisible(false)}
        match={{
          homeTeamID: homeTeam.id,
          homeTeamImg: homeTeam.img,
          awayTeamID: awayTeam.id,
          awayTeamImg: awayTeam.img,
        }}
      />
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: hp('90%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: wp('6%'),
    borderRadius: wp('12%'),
    justifyContent: 'center',
    marginHorizontal: wp('2%'),
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default Basketball;
