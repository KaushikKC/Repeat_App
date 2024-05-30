import React, {createContext, useContext, useState} from 'react';

const HabitudeContext = createContext();

export const HabitudeProvider = ({children}) => {
  const [habitudeId, setHabitudeId] = useState('');

  return (
    <HabitudeContext.Provider value={{habitudeId, setHabitudeId}}>
      {children}
    </HabitudeContext.Provider>
  );
};

export const useHabitude = () => useContext(HabitudeContext);
