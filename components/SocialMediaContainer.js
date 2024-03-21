import { useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import UsernameInputContainer from './UsernameInputContainer';
import { SOCIAL_MEDIA_ICONS } from '../assets/Icons';

const SocialMediaContainer = (props) => {
  const [state, setState] = useState(false);
  const [usernameState, setUsernameState] = useState(false);

  const formatted_data = useMemo(() => {
    return Object.values(SOCIAL_MEDIA_ICONS).map((item) => ({
      id: item.id,
      title: item.title,
      img: item.img,
    }));
  }, [SOCIAL_MEDIA_ICONS]);

  const handleSelect = (item) => {
    props.iconHandler(item.img);
  };

  const stateHandler = (state) => {
    setState(state);
  };

  const usernameHandler = (text) => {
    props.usernameHandler(text);
  };

  return (
    <TouchableOpacity
      onPress={() => setUsernameState(true)}
      style={styles.container}>
      <UsernameInputContainer
        data={formatted_data}
        state={usernameState}
        stateHandler={() => setUsernameState(false)}
        iconState={state}
        iconStateHandler={stateHandler}
        onSelect={handleSelect}
        usernameHandler={usernameHandler}
        icon={props.icon}
        placeholder={props.username}
      />
      <Image style={styles.logo} source={{ uri: props.icon }} />
      <Text style={styles.text}>{props.username}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: hp('2%'),
  },
  logo: {
    width: wp('5%'),
    height: hp('5%'),
    marginRight: 5,
    resizeMode: 'contain',
  },
  text: {
    fontSize: wp('3%'),
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SocialMediaContainer;
