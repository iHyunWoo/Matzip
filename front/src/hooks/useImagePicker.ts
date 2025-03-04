import ImageCropPicker from 'react-native-image-crop-picker';
import {getFormDataImages} from '../utils';
import useMutateImages from './queries/useMutateImages.ts';
import {useState} from 'react';
import {ImageUri} from '../types/domain.ts';
import {Alert} from 'react-native';

interface UseImagePickerProps {
  initialImages: ImageUri[];
}

function useImagePicker({initialImages = []}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImages);
  const uploadImages = useMutateImages();
  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 5개 입니다.');
      return;
    }

    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, removedImage);
    setImageUris(copyImageUris);
  }

  const handleChange = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);
        uploadImages.mutate(formData, {
          onSuccess: data => addImageUris(data),
          onError: error => console.log(error),
        });
      })
      .catch(error => {
        // 사용자 취소 경우가 아닌 경우에만
        if (error.code !== 'E_PICKER_CANCELLED') {
        }
      });
  };

  return {
    imageUris,
    handleChange,
    deleteImageUri,
    changeOrder: changeImageUrisOrder,
  };
}

export default useImagePicker;
