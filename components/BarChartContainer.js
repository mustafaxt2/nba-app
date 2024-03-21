import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const BarChart = ({ data = { labels: [], values: [] } ,style,color}) => {
  const { labels, values} = data;
  const maxValue = Math.max(...values);

  return (
    <View style={{...styles.container,...style}}> 
      {values.map((value, index) => (
        <View key={index} style={styles.barContainer}>
          <Text style={styles.label} numberOfLines={2} ellipsizeMode="tail">
            {labels[index]}
          </Text>
          <View style={[styles.bar, { backgroundColor:color,height: (value / maxValue) * (height * 0.3) }]} />
          <Text style={styles.value}>{value}</Text>
        </View>
      ))} 
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    maxHeight:height*0.4, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: wp('5%'), // Responsive padding
    paddingVertical: hp('2%'), // Responsive padding
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: wp('1.5%'), // Responsive borderRadius
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: wp('1%'), // Responsive shadowRadius
      },
      android: {
        elevation: wp('1.5%'), // Responsive elevation
      },
    }),
  },
  barContainer: {
    alignItems: 'center',
  },
  bar: {
    width: wp('4%'), // Responsive width
    backgroundColor: 'limegreen', 
    borderRadius: wp('1%'), // Responsive borderRadius
    marginBottom: hp('1%'), // Responsive margin
    borderWidth: 1,
    borderColor: '#fff',
  },
  label: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginBottom: hp('1%'), // Responsive margin
    textAlign: 'center',
    marginHorizontal: wp('1%'), // Responsive margin
    color: '#fff',
  },
  value: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal:wp('1%')
  },
});

export default BarChart;
