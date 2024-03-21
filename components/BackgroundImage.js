import { ImageBackground, StyleSheet, View } from 'react-native';

export const BG_IMAGES = {
  basketball:
    'https://img.freepik.com/free-photo/basketball-game-concept_23-2150910812.jpg',
  football:
    'https://img.freepik.com/free-photo/soccer-game-concept_23-2151043790.jpg',
  nba: 'https://seeklogo.com/images/N/nba-logo-59F0731E03-seeklogo.com.png',
  pre: 'https://seeklogo.com/images/N/new-premier-league-2016-17-logo-DC3F7B1BB9-seeklogo.com.png',
  basketball_ball: 'https://cdn-icons-png.freepik.com/512/1041/1041168.png',
  football_ball: 'https://cdn-icons-png.freepik.com/512/11882/11882946.png',
};

const BackgroundImage = (props) => {
  const blurRadius = props.blurRadius !== undefined ? props.blurRadius : 1.5;

  return (
    <ImageBackground
      blurRadius={blurRadius}
      style={styles.image}
      source={{
        uri: props.img,
      }}>
      <View style={styles.overlay} />
      {props.children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default BackgroundImage;
