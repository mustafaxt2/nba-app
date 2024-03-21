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

const IconDropDownMenu = ({ data, onSelect, state,stateHandler,placeholder }) => {
  const [searchText, setSearchText] = useState('');

  const toggleModal = () => {
    stateHandler(!state);
  };

  const handleOptionPress = (option) => {
    onSelect(option);
    toggleModal();
  };

  const filteredData = data.filter((option) =>
    option.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
      <Modal isVisible={state} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor="gray"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <ScrollView>
            {filteredData.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.option}
                onPress={() => handleOptionPress(option)}>
                <Image style={styles.image} source={{ uri: option.img }} />
                <Text style={styles.optionText}>{option.title}</Text>
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
  searchInput: {
    marginBottom: hp('1%'), // Responsive margin
    paddingVertical: hp('1%'), // Responsive padding
    paddingHorizontal: wp('2%'), // Responsive padding
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: wp('2%'), // Responsive borderRadius
    fontSize: RFValue(14),
    color: '#2c3e50',
    placeholderTextColor: '#95a5a6',
  },
  option: {
    paddingVertical: hp('1.5%'), // Responsive padding
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    marginLeft: wp('2%'), // Responsive margin
    fontSize: RFValue(14),
    color: '#34495e',
  },
  image: {
    width: wp('7.5%'), // Responsive width
    height: wp('7.5%'), // Responsive height
    resizeMode: 'contain',
  },
});

export default IconDropDownMenu;
