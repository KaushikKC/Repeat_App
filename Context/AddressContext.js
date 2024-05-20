import React, {createContext, useContext, useState} from 'react';

const AddressContext = createContext();

export const AddressProvider = ({children}) => {
  const [address, setAddress] = useState('');
  const [keypair, setKeypair] = useState('');

  return (
    <AddressContext.Provider value={{address, setAddress, keypair, setKeypair}}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
