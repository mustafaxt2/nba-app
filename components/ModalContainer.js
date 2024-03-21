import React, { useState, useCallback } from 'react';
import { View, Modal, FlatList, Alert, StyleSheet } from 'react-native';
import {
  PanGestureHandler,
  LongPressGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackgroundImage from './BackgroundImage';
import Match from './MatchContainer';
import SocialMediaContainer from './SocialMediaContainer';
import ProbTable from './ProbTable';

const ModalContainer = (props) => {
  const [selectedMatch, setSelectedMatch] = useState({});
  const [modalState, setModalState] = useState(false);

  const handleSwipeComplete = useCallback(
    (event) => {
      if (event.nativeEvent.state === State.END) {
        props.onPress();
      }
    },
    [props]
  );

  const onLongPress = useCallback(
    (id) => {
      Alert.alert(
        'Remove Match?',
        'Are you sure you want to remove this match?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => props.onLongPress(id) },
        ],
        { cancelable: false }
      );
    },
    [props]
  );

  const renderMatchItem = useCallback(
    ({ item }) => (
      <LongPressGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            onLongPress(item.id);
          }
        }}>
        <Match
          key={item.id}
          teamA={item.homeTeamID}
          teamB={item.awayTeamID}
          scores={item.predictedScores}
          data={props.teams}
          ball={props.img.ball}
          onPress={() => {
            setSelectedMatch(item);
            setModalState(true);
          }}
          onLongPress={() => onLongPress(item.id)}
        />
      </LongPressGestureHandler>
    ),
    [onLongPress, props]
  );

  return (
    <Modal visible={props.state} animationType="slide">
      <BackgroundImage img={props.img.bg} style={styles.modalBackground}>
        <PanGestureHandler onHandlerStateChange={handleSwipeComplete}>
          <View style={styles.modalContainer}>
            <FlatList
              data={props.data}
              style={styles.flatListContainer}
              renderItem={renderMatchItem}
              windowSize={5}
              initialNumToRender={5}
              contentContainerStyle={styles.flatListContainer}
            />
            <SocialMediaContainer
              username={props.username}
              icon={props.icon}
              usernameHandler={props.usernameHandler}
              iconHandler={props.iconHandler}
            />
          </View>
        </PanGestureHandler>
      </BackgroundImage>
      <ProbTable
        state={modalState}
        type={props.type}
        match={selectedMatch}
        img={props.img}
        onClose={() => setModalState(false)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatListContainer: {
    paddingVertical: hp('2%'),
    minHeight: '90%',
  },
});

export default ModalContainer;
