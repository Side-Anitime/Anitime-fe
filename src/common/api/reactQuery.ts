import {
  UseQueryOptions,
  useQuery,
  QueryFunctionContext,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import axios, {AxiosError, AxiosResponse} from 'axios';
import Config from 'react-native-config';

/*
 *
 * axios
 *
 */
export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(`${Config.API_HOST}/${url}`, {
      headers: {},
      ...params,
    }),
  post: <T>(url: string, data: any) =>
    axios.post<T>(url, data, {
      headers: {},
    }),
  put: <T>(url: string, data: any) =>
    axios.put<T>(url, data, {
      headers: {},
    }),
  delete: <T>(url: string) =>
    axios.delete<T>(url, {
      headers: {},
    }),
};

/*
 *
 * React Query
 *
 */
type QueryKeyT = [string, object | undefined];

export const fetcher = async <T>({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  return api
    .get<T>(url, {params: {...params, pageParam}})
    .then(res => res.data);
};

export const useFetch = <T>(
  url: string,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>,
) => {
  return useQuery<T, Error, T, QueryKeyT>(
    [url, params],
    ({queryKey}) => fetcher({queryKey, meta: undefined}),
    {
      onError: e => {
        //TODO: handle error
      },
      enabled: true,
      refetchOnWindowFocus: false,
      ...config,
    },
  );
};

export const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async data => {
      await queryClient.cancelQueries([url!, params]);

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], oldData => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url!, params]);
    },
  });
};

export const useDelete = <T>(
  url: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T,
) => {
  return useGenericMutation<T, string | number>(
    id => api.delete(`${url}/${id}`),
    url,
    params,
    updater,
  );
};

export const usePost = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>(
    data => api.post<S>(url, data),
    url,
    params,
    updater,
  );
};

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>(
    data => api.put<S>(url, data),
    url,
    params,
    updater,
  );
};
