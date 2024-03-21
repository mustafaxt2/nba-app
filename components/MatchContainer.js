import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import ImageContainer from './ImageContainer';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const Match = React.memo((props) => {
  const teamAData = props.data[props.teamA];
  const teamBData = props.data[props.teamB];

  if (!teamAData || !teamBData) {
    return null; // or render some default content or error message
  }
  
  return (
    <TouchableOpacity onPress={props.onPress} onLongPress={props.onLongPress}>
      <View style={styles.matchContainer}>
        <ImageContainer url={teamAData.img} title={teamAData.id} />
        <View style={styles.middleContainer}>
          <Text style={styles.text}>VS</Text> 
          {/*<View style={styles.scoreContainer}>
            <Image style={styles.ballImage} source={{ uri: props.ball }} />
            <Text style={styles.score}>{props.scores?.avgPredictedScore}</Text>}
          </View>*/}
        </View>
        <ImageContainer url={teamBData.img} title={teamBData.id} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  matchContainer: {
    minWidth: widthPercentageToDP('80%'),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: widthPercentageToDP('1%'),
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: widthPercentageToDP('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: heightPercentageToDP('1%'),
    justifyContent: 'space-around',
  },
  middleContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: RFValue(28),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginLeft: widthPercentageToDP('1%'),
    color: '#fff',
  },
  ballImage: {
    width: widthPercentageToDP('4%'),
    height: heightPercentageToDP('4%'),
    resizeMode: 'contain',
  },
});

export default Match;
