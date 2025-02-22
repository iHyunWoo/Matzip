import {UseMutationCustomOptions} from '../../types/common.ts';
import {useMutation} from '@tanstack/react-query';
import {createPost} from '../../api';
import {queryClient} from '../../api/queryClient.ts';
import {queryKeys} from '../../constants';
import {Marker} from "../../types/domain.ts";

function useMutateCreatePost(mutateOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      // 방법1: 쿼리를 무효화해서 새롭게 서버에서 데이터 가져오기
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      // });

      // 방법2: response 온 데이터를 추가
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
        },
      );
    },
    ...mutateOptions,
  });
}

export default useMutateCreatePost;
