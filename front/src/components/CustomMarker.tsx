import {LatLng, Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import {colors} from '../constants';
import {MarkerColor} from '../types/domain.ts';

interface CustomMarkerProps {
  coordinate: LatLng;
  color: MarkerColor;
  score: number;
}

const colorHex = {
  RED: colors.PINK_400,
  BLUE: colors.BLUE_400,
  GREEN: colors.GREEN_400,
  YELLOW: colors.YELLOW_400,
  PURPLE: colors.PURPLE_400,
};

function CustomMarker({
  coordinate,
  color,
  score = 5,
  ...props
}: CustomMarkerProps) {
  return (
    <Marker coordinate={coordinate} {...props}>
      <View style={styles.container}>
        <View style={[styles.marker, {backgroundColor: colorHex[color]}]}>
          <View style={[styles.eye, styles.leftEye]}></View>
          <View style={[styles.eye, styles.rightEye]}></View>
          {score > 3 && <View style={[styles.mouth, styles.good]} />}
          {score === 3 && <View style={[styles.mouth, styles.soso]} />}
          {score < 3 && <View style={[styles.mouth, styles.bad]} />}
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 32,
    alignItems: 'center',
  },
  marker: {
    transform: [{rotate: '45deg'}],
    height: 27,
    width: 27,
    borderRadius: 27,
    borderBottomEndRadius: 1,
    borderWidth: 1,
    borderColor: colors.BLACK,
  },
  eye: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    left: 12,
  },
  mouth: {
    transform: [{rotate: '-45deg'}],
    width: 12,
    height: 12,
    borderWidth: 1,
  },
  good: {
    marginLeft: 5,
    marginTop: 5,
    borderTopColor: 'rgba(255, 255, 255 / 0.01)',
    borderLeftColor: 'rgba(255, 255, 255 / 0.01)',
    borderRightColor: 'rgba(255, 255, 255 / 0.01)',
    borderRadius: 12,
  },
  soso: {
    marginLeft: 13,
    marginTop: 13,
    width: 8,
    height: 8,

  },
  bad: {
    borderRadius: 12,
    marginLeft: 12,
    marginTop: 12,
    borderBottomColor: 'rgba(255, 255, 255 / 0.01)',
    borderLeftColor: 'rgba(255, 255, 255 / 0.01)',
    borderRightColor: 'rgba(255, 255, 255 / 0.01)',
  }
});

export default CustomMarker;
