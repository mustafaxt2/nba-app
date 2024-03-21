import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Dimensions, Image, StyleSheet, StatusBar } from 'react-native'; // Import StatusBar
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BG_IMAGES } from './components/BackgroundImage';
import Basketball from './screens/Basketball';
import Football from './screens/Football';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const { width, height } = Dimensions.get('window');
  const tabBarHeight = height * 0.08; // Adjusted tab bar height
  const tabBarPaddingTop = tabBarHeight * 0.05; // Adjusted top padding

  return (
    <View style={{ flex: 1 }}>
      {/* Hide the status bar */}
      <StatusBar hidden />

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if (route.name === 'Basketball') {
                return (
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{ uri: BG_IMAGES.nba }}
                    />
                  </View>
                );
              } else if (route.name === 'Football') {
                return (
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{ uri: BG_IMAGES.pre }}
                    />
                  </View>
                );
              }
            },
            tabBarShowLabel: false,
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            labelShown: false,
            labelStyle: styles.labelStyle,
            style: {
              ...styles.tabBarStyle,
              height: tabBarHeight,
              paddingTop: tabBarPaddingTop,
            },
            indicatorStyle: styles.indicatorStyle,
          }}>
          <Tab.Screen name="Basketball" component={Basketball} />
          <Tab.Screen name="Football" component={Football} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#f0f0f0',
    borderTopWidth: 0,
  },
  labelStyle: {
    fontSize: Dimensions.get('window').width * 0.03, // Responsive font size
    fontWeight: 'bold',
  },
  indicatorStyle: {
    backgroundColor: 'tomato', // Change the background color
    height: 3, // Adjust the height of the indicator
    borderRadius: 2, // Add some border radius for a softer look
    marginBottom: -1, // Move the indicator slightly upward to overlap with the tab bar
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp('15%'), // Responsive font size
    height: hp('5%'), // Responsive font size
    resizeMode: 'contain',
  },
});
