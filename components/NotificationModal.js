import { View, Text, Image, StyleSheet } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const NotificationModal = ({ state, onHide, match }) => {
  return (
    <ReactNativeModal
      isVisible={state}
      onBackdropPress={onHide}
      style={styles.notificationModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}>
      <View style={styles.notificationContainer}>
        <View style={styles.imagesContainer}>
          <Image style={styles.image} source={{ uri: match.homeTeamImg }} />
          <Text style={styles.vsText}>VS</Text>
          <Image style={styles.image} source={{ uri: match.awayTeamImg }} />
        </View>
        <Text style={styles.notificationText}>Match added to your coupon!</Text>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  notificationModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContainer: {
    backgroundColor: '#fff',
    padding: wp('4%'), // Responsive padding
    borderRadius: wp('2%'), // Responsive borderRadius
    alignItems: 'center',
  },
  notificationText: {
    fontSize: RFValue(18),
    color: '#333',
    fontWeight: 'bold',
    marginTop: hp('1%'), // Responsive margin
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'), // Responsive margin
  },
  image: {
    width: wp('10%'), // Responsive width
    height: wp('10%'), // Responsive height
    resizeMode: 'contain',
    marginHorizontal: wp('2%'), // Responsive margin
  },
  vsText: {
    fontSize: RFValue(20),
    color: '#333',
    fontWeight: 'bold',
    marginHorizontal: wp('2%'), // Responsive margin
  },
});

export default NotificationModal;
