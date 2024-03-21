import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Entypo } from 'react-native-vector-icons';
import normalOlasiligi from '../functs/NormalDistribution';
import BackgroundImage from './BackgroundImage';
import BarChart from './BarChartContainer';
import InfoContainer from './InfoContainer';

const ProbTable = ({ state, type, match, onClose, img }) => {
  const [infoState, setInfoState] = useState(false);

  const probabilities = normalOlasiligi(
    match.predictedScores?.avgPredictedScore,
    type
  );
  const probabilitiesHome = normalOlasiligi(
    match.predictedScores?.homePredictedScore,
    type
  );
  const probabilitiesAway = normalOlasiligi(
    match.predictedScores?.awayPredictedScore,
    type
  );

  const stats = {
    home: {
      labels: ['AS', 'ASW', 'ASL', 'AC', 'ACW', 'ACL'],
      values: [
        match?.homeTeamAvgScore,
        match?.homeTeamAvgScoreWhenWon,
        match?.homeTeamAvgScoreWhenLost,
        match?.homeTeamAvgConcede,
        match?.homeTeamAvgConcedeWhenWon,
        match?.homeTeamAvgConcedeWhenLost,
      ],
    },
    away: {
      labels: ['AS', 'ASW', 'ASL', 'AC', 'ACW', 'ACL'],
      values: [
        match?.awayTeamAvgScore,
        match?.awayTeamAvgScoreWhenWon,
        match?.awayTeamAvgScoreWhenLost,
        match?.awayTeamAvgConcede,
        match?.awayTeamAvgConcedeWhenWon,
        match?.awayTeamAvgConcedeWhenLost,
      ],
    },
    average: {
      labels: ['AS', 'ASW', 'ASL', 'AC', 'ACW', 'ACL'],
      values: [
        (
          (parseFloat(match?.homeTeamAvgScore) +
            parseFloat(match?.awayTeamAvgScore)) /
          2
        ).toFixed(2),
        (
          (parseFloat(match?.homeTeamAvgScoreWhenWon) +
            parseFloat(match?.awayTeamAvgScoreWhenWon)) /
          2
        ).toFixed(2),
        (
          (parseFloat(match?.homeTeamAvgScoreWhenLost) +
            parseFloat(match?.awayTeamAvgScoreWhenLost)) /
          2
        ).toFixed(2),
        (
          (parseFloat(match?.homeTeamAvgConcede) +
            parseFloat(match?.awayTeamAvgConcede)) /
          2
        ).toFixed(2),
        (
          (parseFloat(match?.homeTeamAvgConcedeWhenWon) +
            parseFloat(match?.awayTeamAvgConcedeWhenWon)) /
          2
        ).toFixed(2),
        (
          (parseFloat(match?.homeTeamAvgConcedeWhenLost) +
            parseFloat(match?.awayTeamAvgConcedeWhenLost)) /
          2
        ).toFixed(2),
      ],
    },
  };

  return (
    <Modal visible={state} animationType="slide">
      <BackgroundImage img={img.bg} blurRadius={2}>
        <InfoContainer
          state={infoState}
          stateHandler={() => setInfoState(false)}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Entypo name="chevron-down" size={wp('8%')} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setInfoState(true)}>
            <Entypo name="info" size={wp('4%')} color="#fff" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          {['home', 'average', 'away'].map((sectionType, index) => (
            <View key={index} style={[styles.section, styles[sectionType]]}>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>{sectionType.toUpperCase()}</Text>
                {sectionType !== 'average' && (
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        sectionType === 'home'
                          ? match?.homeTeamImg
                          : sectionType === 'away'
                          ? match?.awayTeamImg
                          : '',
                    }}
                  />
                )}
                <View style={styles.scoreContainer}>
                  <Image style={styles.ballImage} source={{ uri: img.ball }} />
                  <Text style={styles.scoreText}>
                    {sectionType === 'home'
                      ? match?.predictedScores?.homePredictedScore
                      : sectionType === 'away'
                      ? match?.predictedScores?.awayPredictedScore
                      : sectionType === 'average'
                      ? match?.predictedScores?.avgPredictedScore
                      : ''}
                  </Text>
                </View>
              </View>
              {renderProbabilities(
                sectionType === 'home'
                  ? probabilitiesHome
                  : sectionType === 'average'
                  ? probabilities
                  : probabilitiesAway,
                sectionType
              )}
              <BarChart
                data={stats[sectionType]}
                style={styles[sectionType]}
                color={styles[sectionType].backgroundColor}
              />
            </View>
          ))}
        </ScrollView>
      </BackgroundImage>
    </Modal>
  );
};

const renderProbabilities = (data, sectionType) => {
  return Object.keys(data).map((item, index) => (
    <View key={index} style={[styles.row, styles[sectionType]]}>
      <Text style={styles.label}>{item}</Text>
      <Text style={styles.value}>{(data[item] * 100).toFixed(2)}%</Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: wp('5%'), // Slightly increased padding for aesthetics
  },
  section: {
    minWidth: wp('90%'),
    marginBottom: hp('2%'),
    borderRadius: wp('4%'), // Add subtle rounded corners
    borderWidth: 1, // Use a solid, visible border
    borderColor: '#fff', // Use a neutral border color
    padding: wp('2%'), // Add padding for better spacing
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: wp('3%'),
    borderRadius: wp('12%'),
    justifyContent: 'center',
    marginVertical: hp('2%'),
    borderWidth: 1,
    borderColor: '#fff',
  },
  infoButton: {
    position: 'absolute',
    top: 0,
    right: wp('5%'),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: wp('3%'),
    borderRadius: wp('12%'),
    justifyContent: 'center',
    marginVertical: hp('2%'),
    borderWidth: 1,
    borderColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    textAlign: 'center',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    textAlign: 'center',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginLeft: wp('1%'),
    color: '#fff',
  },
  ballImage: {
    width: wp('4%'),
    height: hp('4%'),
    resizeMode: 'contain',
  },
  image: {
    width: wp('10%'),
    height: hp('10%'),
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  label: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#fff',
  },
  value: {
    fontSize: wp('4%'),
    color: '#fff',
  },
  home: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)', // Example background color change for 'home' section
  },
  average: {
    backgroundColor: 'rgba(0, 255, 0, 0.2)', // Example background color change for 'average' section
  },
  away: {
    backgroundColor: 'rgba(0, 0, 255, 0.2)', // Example background color change for 'away' section
  },
});

export default ProbTable;
