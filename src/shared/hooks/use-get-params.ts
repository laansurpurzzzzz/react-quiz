import { Key } from 'react';

import { type SetURLSearchParams, useSearchParams } from 'react-router-dom';

export type DefaultType<I, T = undefined> = T extends undefined ? I : T;
type UpdateParams = {
  key: string;
  value: string | number | string[] | number[] | Key[];
};

export type UpdateParamsProps = UpdateParams[] | UpdateParams;

export type ReturnParams<T> = {
  deleteSearchParams: (keys: string | string[]) => void;
  paramsEntries: DefaultType<T>;
  resetUrlSearchParams: () => void;
  searchParams: URLSearchParams;
  setUrlSearchParams: SetURLSearchParams;
  updateSearchParams: (params: UpdateParamsProps) => void;
};

export const useGetParams = <T = undefined>(): ReturnParams<T> => {
  const [searchParams, setUrlSearchParams] = useSearchParams();

  const updateSearchParams = (params: UpdateParamsProps) => {
    if (Array.isArray(params)) {
      for (const param of params) {
        searchParams.set(param.key, String(param.value));
      }
    } else {
      searchParams.set(params.key, String(params.value));
    }

    setUrlSearchParams(searchParams);
  };

  const deleteSearchParams = (key: string | string[]) => {
    if (Array.isArray(key)) {
      for (const k of key) {
        searchParams.delete(k);
      }
    } else {
      searchParams.delete(key);
    }

    setUrlSearchParams(searchParams);
  };

  const resetUrlSearchParams = () => {
    setUrlSearchParams(() => []);
  };

  return {
    deleteSearchParams,
    paramsEntries: <DefaultType<T>>Object.fromEntries(searchParams),
    resetUrlSearchParams,
    searchParams,
    setUrlSearchParams,
    updateSearchParams,
  };
};
