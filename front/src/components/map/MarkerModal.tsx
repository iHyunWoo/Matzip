import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions, Pressable, Platform,
} from 'react-native';
import useGetPost from '../../hooks/queries/useGetPost.ts';
import {colors} from '../../constants';
import CustomMarker from '../common/CustomMarker.tsx';
import Octicons from '@react-native-vector-icons/octicons';
import {getDateWithSeparator} from '../../utils';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}

function MarkerModal({markerId, isVisible, hide}: MarkerModalProps) {
  const {data: post, isPending, isError} = useGetPost(markerId);

  if (isPending || isError) {
    return <></>;
  }
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <SafeAreaView style={styles.optionBackground} onTouchEnd={hide}>
        <Pressable style={styles.cardContainer} onPress={() => {}}>
          <View style={styles.cardInner}>
            <View style={styles.cardAlign}>
              {post.images.length > 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: `${
                        Platform.OS === 'ios'
                          ? 'http://localhost:3030'
                          : 'http://10.0.2.2:3030'
                      }/${post.images[0].uri}`}}
                    resizeMode="cover"
                  />
                </View>
              )}
              {post?.images.length === 0 && (
                <View
                  style={[styles.imageContainer, styles.emptyImageContainer]}>
                  <CustomMarker color={post.color} score={post.score} />
                </View>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.addressContainer}>
                  <Octicons
                    name={'location'}
                    size={10}
                    color={colors.GRAY_500}
                  />
                  <Text
                    style={styles.addressText}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {post.address}
                  </Text>
                </View>
                <Text style={styles.titleText}>{post.title}</Text>
                <Text style={styles.dateText}>
                  {getDateWithSeparator(post.date, '.')}
                </Text>
              </View>
            </View>
            <MaterialDesignIcons name="chevron-right" size={30} color={colors.BLACK}/>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderRadius: 20,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 3, height: 3},
    elevation: 1,
    borderColor: colors.GRAY_500,
    borderWidth: 1.5,
  },
  cardInner: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 35,
    borderWidth: 1,
  },
  infoContainer: {
    width: Dimensions.get('screen').width / 2,
    marginLeft: 15,
    gap: 5,
  },
  addressContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 10,
  },
  titleText: {
    color: colors.BLACK,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
  nextButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default MarkerModal;
