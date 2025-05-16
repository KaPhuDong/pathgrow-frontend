import { createContext, useContext, useState } from 'react';

const Loading = createContext();

export const useLoading = () => useContext(Loading);

export const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = () => setLoadingCount((c) => c + 1);
  const stopLoading = () => setLoadingCount((c) => Math.max(0, c - 1));

  return (
    <Loading.Provider value={{ loadingCount, startLoading, stopLoading }}>
      {children}
    </Loading.Provider>
  );
};
