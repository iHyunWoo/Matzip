import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '../../navigations/stack/MapStackNavigator.tsx';
import {colors, mapNavigations} from '../../constants';
import InputField from '../../components/InputField.tsx';
import Octicons from '@react-native-vector-icons/octicons';
import CustomButton from '../../components/CustomButton.tsx';
import useForm from '../../hooks/useForm.ts';
import {validateAddPost} from '../../utils';
import HeaderButton from '../../components/HeaderButton.tsx';
import AddPostHeaderRight from '../../components/AddPostHeaderRight.tsx';
import useMutateCreatePost from '../../hooks/queries/useMutateCreatePost.ts';
import {MarkerColor} from '../../types/domain.ts';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    const body = {
      date: new Date(),
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: [],
    };

    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => navigation.goBack(),
        onError: (error) => {
          console.log(error);}
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value=""
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
        </View>
        <CustomButton variant="outlined" size="large" label="날짜 선택" />
        <InputField
          placeholder="제목을 입력하세요."
          error={addPost.errors.title}
          touched={addPost.touched.title}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current?.focus()}
          {...addPost.getTextInputProps('title')}
        />
        <InputField
          ref={descriptionRef}
          placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
          error={addPost.errors.description}
          touched={addPost.touched.description}
          multiline
          returnKeyType="next"
          {...addPost.getTextInputProps('description')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});

export default AddPostScreen;
