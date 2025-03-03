import {UseMutationCustomOptions} from '../../types/common.ts';
import {useMutation} from '@tanstack/react-query';
import {uploadImages} from '../../api';

function useMutateImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
}

export default useMutateImages;
