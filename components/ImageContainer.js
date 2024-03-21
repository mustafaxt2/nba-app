import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const ImageContainer = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.url }} />
      {/*<Text style={styles.title}>{props.title}</Text>*/} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:hp('1%')
  },
  image: {
    width: wp('25%'), // Set image width to 30% of the screen width
    height: hp('12.5%'), // Set image height to 15% of the screen height
    resizeMode: 'contain',
  },
  title: {
    maxWidth:wp('40%'), 
    fontSize: RFValue(18), // Set font size to 5% of the screen width
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
});

export default React.memo(ImageContainer);
