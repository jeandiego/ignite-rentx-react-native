import { useState, useCallback, DependencyList } from 'react';

type AsyncReturnType<T> = {
  loading: boolean;
  call: T;
};

const useAsync = <T extends (...args: any[]) => Promise<unknown> | unknown>(
  callback: T,
  deps: DependencyList,
): AsyncReturnType<T> => {
  const [loading, setLoading] = useState<boolean>(false);

  const call = useCallback(async (...args: any[]) => {
    try {
      setLoading(true);
      const response = await callback(...args);
      return response;
    } finally {
      setTimeout(() => {
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps) as T;

  return {
    loading,
    call,
  };
};

export default useAsync;
