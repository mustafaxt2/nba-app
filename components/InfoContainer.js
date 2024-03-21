import { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';

const InfoContainer = ({ state, stateHandler }) => {
  const toggleModal = () => {
    stateHandler();
  };

  const INFOS = [
    { title: 'AS', desc: 'Average Score' },
    { title: 'ASW', desc: 'Average Score When Won' },
    { title: 'ASL', desc: 'Average Score When Lost' },
    { title: 'AC', desc: 'Average Concede' },
    { title: 'ACW', desc: 'Average Concede When Won' },
    { title: 'ACL', desc: 'Average Concede When Lost' },
  ];

  return (
    <Modal isVisible={state} onBackdropPress={toggleModal}>
      <View style={styles.modalContainer}>
        <ScrollView>
          {INFOS.map((info) => (
            <TouchableOpacity style={styles.option}>
              <Text style={styles.title}>{info.title}</Text>
              <Text style={styles.desc}>{info.desc}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: wp('2%'), // Responsive padding
    borderRadius: wp('3%'), // Responsive borderRadius
    maxHeight: hp('80%'), // Responsive maxHeight
    borderColor: '#3E3E3E',
    borderWidth: 1,
  },
  option: {
    paddingVertical: hp('1.5%'), // Responsive padding
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: wp('2%'), // Responsive margin
    fontSize: RFValue(14),
    color: 'tomato',
    fontWeight:'bold'
  },
  desc: {
    marginLeft: wp('2%'), // Responsive margin
    fontSize: RFValue(14),
    color: '#34495e',
  },
});

export default InfoContainer;
