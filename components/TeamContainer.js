import { useState, useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import DropdownMenu from './DropdownMenu';
import normalOlasiligi from '../functs/NormalDistribution';

const { width, height } = Dimensions.get('window');

const TeamContainer = (props) => {
  const formatted_data = useMemo(() => {
    return Object.values(props.data).map((item) => ({
      id: item.id,
      title: item.title,
      img: item.img,
    }));
  }, [props.data]);

  const [formData, setFormData] = useState({
    buttonText: 'Calculate',
    team: formatted_data[0] || {},
    icon: '',
    scores: [0, 0, 0, 0, 0],
    concedes: [0, 0, 0, 0, 0],
  });

  const calculateAverage = (numbers) =>
    numbers.reduce((total, num) => total + Number(num), 0) / numbers.length;

  const calculateWinRate = () => {
    const { scores, concedes } = formData;
    const winCount = scores.reduce(
      (acc, score, index) => (score > concedes[index] ? acc + 1 : acc),
      0
    );
    return (winCount / scores.length) * 100;
  };

  const handleScoreChange = (text, index) => {
    const updatedScores = [...formData.scores];
    updatedScores[index] = Number(text);
    setFormData({ ...formData, scores: updatedScores });
  };

  const handleConcedeChange = (text, index) => {
    const updatedConcedes = [...formData.concedes];
    updatedConcedes[index] = Number(text);
    setFormData({ ...formData, concedes: updatedConcedes });
  };

  // Helper function for calculating factorials
  const calculateAllAverages = () => {
    const { scores, concedes } = formData;
    const avgScore = calculateAverage(scores);
    const avgConcede = calculateAverage(concedes);
    const avgTotalPoints = Math.round(
      parseFloat(avgScore) + parseFloat(avgConcede)
    );
    const winRate = calculateWinRate();

    const wonMatches = scores.filter(
      (score, index) => score > concedes[index]
    ).length;
    const lostMatches = scores.filter(
      (score, index) => score < concedes[index]
    ).length;

    const totalWonScore = scores.reduce(
      (acc, score, index) => (score > concedes[index] ? acc + score : acc),
      0
    );
    const totalLostConcede = concedes.reduce(
      (acc, concede, index) => (scores[index] < concede ? acc + concede : acc),
      0
    );
    const totalLostScore = scores.reduce(
      (acc, score, index) => (score < concedes[index] ? acc + score : acc),
      0
    );
    const totalConcedeWhenWon = concedes.reduce(
      (acc, concede, index) => (scores[index] > concede ? acc + concede : acc),
      0
    );

    const avgScoreWhenWon =
      wonMatches > 0 ? totalWonScore / wonMatches : avgScore;
    const avgConcedeWhenLost =
      lostMatches > 0 ? totalLostConcede / lostMatches : avgConcede;
    const avgScoreWhenLost =
      lostMatches > 0 ? totalLostScore / lostMatches : avgScore;
    const avgConcedeWhenWon =
      wonMatches > 0 ? totalConcedeWhenWon / wonMatches : avgConcede;

    const probabilities = normalOlasiligi(avgTotalPoints);

    const result = {
      ...formData.team,
      score: avgScore.toFixed(2),
      concede: avgConcede.toFixed(2),
      totalPoints: avgTotalPoints,
      rate: winRate.toFixed(2),
      avgScoreWhenWon: avgScoreWhenWon.toFixed(2),
      avgConcedeWhenLost: avgConcedeWhenLost.toFixed(2),
      avgScoreWhenLost: avgScoreWhenLost.toFixed(2),
      avgConcedeWhenWon: avgConcedeWhenWon.toFixed(2),
      probabilities: probabilities,
      calculated: true,
    };

    setFormData({
      ...formData,
      team: result,
      buttonText: avgScore.toFixed(2),
      icon: 'checkmark',
    });
    props.onPress(result);
  };

  const clearFields = () => {
    setFormData({
      ...formData,
      buttonText: 'Calculate',
      icon: '',
      scores: [0, 0, 0, 0, 0],
      concedes: [0, 0, 0, 0, 0],
    });
  };

  const handleSelect = (item) => {
    setFormData({ ...formData, team: item });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <DropdownMenu
          onSelect={handleSelect}
          selectedValue={formData.team}
          data={formatted_data}
          placeholder='Search Teams' 
        />

        <View style={styles.inputsContainer}>
          <View style={styles.inputColumn}>
            {formData.scores.map((score, index) => (
              <TextInput
                key={`score-${index}`}
                style={styles.input}
                placeholder={`Score ${index + 1}`}
                placeholderTextColor="#fff"
                keyboardType="numeric"
                value={formData.scores[index].toString()} // Set the value prop
                onChangeText={(text) => handleScoreChange(text, index)}
                selectTextOnFocus={true}
                multiline={false}
                autoCapitalize="none"
                autoCorrect={false}
              />
            ))}
          </View>

          <View style={styles.inputColumn}>
            {formData.concedes.map((concede, index) => (
              <TextInput
                key={`concede-${index}`}
                style={styles.input}
                placeholder={`Concede ${index + 1}`}
                placeholderTextColor="#fff"
                keyboardType="numeric"
                value={formData.concedes[index].toString()} // Set the value prop
                onChangeText={(text) => handleConcedeChange(text, index)}
                selectTextOnFocus={true}
                multiline={false}
                autoCapitalize="none"
                autoCorrect={false}
              />
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={calculateAllAverages}>
            <Text style={styles.buttonText}>{formData.buttonText}</Text>
            <Ionicons name={formData.icon} size={25} color="limegreen" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: RFValue(12),
    width: width * 0.9,
    height: height * 0.375,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  inputColumn: {
    width: '45%',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: RFValue(5),
    marginVertical: RFValue(5),
    color: '#fff',
    fontSize: RFValue(16), // Adjust the font size as needed
    height: RFValue(20), // Adjust the height as needed
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: RFValue(5),
    marginVertical: RFValue(5),
    borderWidth: 1,
    borderRadius: RFValue(10),
    borderColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(40),
    width: '45%',
  },
  buttonText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    fontFamily: 'Ink Free',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  clearButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: RFValue(5),
    marginVertical: RFValue(5),
    borderWidth: 1,
    borderRadius: RFValue(10),
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(40),
    width: '45%',
  },
  clearButtonText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    fontFamily: 'Ink Free',
    color: '#fff',
  },
});

export default TeamContainer;
