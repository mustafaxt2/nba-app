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
import IconDropDownMenu from './IconDropDownMenu';

const UsernameInputContainer = ({
  icon,
  iconState,
  iconStateHandler,
  data,
  onSelect,
  usernameHandler,
  state,
  stateHandler,
  placeholder,
}) => {
  const toggleModal = () => {
    stateHandler();
  };

  return (
    <Modal isVisible={state} onBackdropPress={toggleModal}>
      <View style={styles.modalContainer}>
        <IconDropDownMenu
          data={data}
          onSelect={onSelect}
          state={iconState}
          stateHandler={iconStateHandler}
          placeholder="Search Icons"
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => {
              iconStateHandler(true);
            }}>
            <Image style={styles.image} source={{ uri: icon }} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={`/${placeholder}`}
            placeholderTextColor="gray"
            onChangeText={(text) => usernameHandler(text)}
          />
        </View>
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
    justifyContent:'center' 
  },
  inputContainer: {
    paddingVertical: hp('1.5%'), // Responsive padding
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginLeft: wp('1%'),
    paddingVertical: hp('1%'), // Responsive padding
    paddingHorizontal: wp('2%'), // Responsive padding
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: wp('2%'), // Responsive borderRadius
    fontSize: RFValue(14),
    color: '#2c3e50',
    placeholderTextColor: '#95a5a6',
    width:wp('80%')
  },
  image: {
    width: wp('7.5%'), // Responsive width
    height: wp('7.5%'), // Responsive height
    resizeMode: 'contain',
  },
});

export default UsernameInputContainer;
