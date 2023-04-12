import {ApplicationContext} from '../../context/ApplicationContext';

export interface ApplicationProviderProps {
  app: Micra.Application;
  children: React.ReactNode;
}

export function ApplicationProvider({app, children}: ApplicationProviderProps) {
  return (
    <ApplicationContext.Provider value={app}>
      {children}
    </ApplicationContext.Provider>
  );
}
