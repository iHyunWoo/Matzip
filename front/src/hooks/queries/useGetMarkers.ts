import {UseQueryCustomOptions} from '../../types/common.ts';
import {useQuery} from '@tanstack/react-query';
import {getMarkers} from '../../api';
import {queryKeys} from '../../constants';
import {Marker} from "../../types/domain.ts";

function useGetMarkers(queryOptions?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
}

export default useGetMarkers;
