import {
  UseQueryOptions,
  useQuery,
  QueryFunctionContext,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {client} from './client';

/*
 *
 * axios
 *
 */
export const api = {
  get: <T>(url: string, params?: object) => {
    console.log('parmas', params);
    console.log('url', url);

    return client.get<T>(`${url}`, {
      headers: {},
      ...params,
    });
  },
  post: <T>(url: string, data: any) =>
    client.post<T>(`${url}`, data, {
      headers: {},
    }),
  put: <T>(url: string, data: any) =>
    client.put<T>(`${url}`, data, {
      headers: {},
    }),
  delete: <T>(url: string) =>
    client.delete<T>(`${url}`, {
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
      onError: err => {
        //TODO: handle error
        console.log(err);
      },
      enabled: !!url,
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
    onError: (err, _, context) => {
      queryClient.setQueryData([url, params], context);
      //NOTE: unable to fully utillize setQueryData with current structure
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url, params]);
    },
  });
};

export const useDelete = <T, S>(url: string, params?: object) => {
  return useGenericMutation<T, S>(
    id => api.delete(`${url}/${id}`),
    url,
    params,
  );
};

export const usePost = <T, S>(url: string, params?: object) => {
  return useGenericMutation<T, S>(data => api.post<S>(url, data), url, params);
};

export const useUpdate = <T, S>(url: string, params?: object) => {
  return useGenericMutation<T, S>(data => api.put<S>(url, data), url, params);
};
