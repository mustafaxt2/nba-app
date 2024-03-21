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

const DropdownMenu = ({ data, onSelect, selectedValue,placeholder }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionPress = (option) => {
    onSelect(option);
    toggleModal();
  };

  const filteredData = data.filter((option) =>
    option.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.dropdownButton}>
        <Image
          style={styles.image}
          source={{ uri: selectedValue.img ? selectedValue.img : data[0].img }}
        />
        <Text style={styles.selectedText}>
          {selectedValue.title ? selectedValue.title : data[0].title}
        </Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButton: {
    padding: wp('3%'), // Responsive padding
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: wp('2%'), // Responsive borderRadius
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: wp('70%'), // Responsive width
    maxHeight: hp('90%'), // Responsive maxHeight
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  selectedText: {
    marginLeft: wp('2%'), // Responsive margin
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: '#eee',
  },
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

export default DropdownMenu;
