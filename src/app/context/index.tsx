"use client"
import { createContext, useContext, ReactNode } from 'react';
import { useWords } from '@/app/hooks/useWords';
import { WordFormData } from '@/app/interface';

interface MyContextType {
  words: WordFormData[];
}

const MyContext = createContext<MyContextType>({ words: [] });


export const MyContextProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
  const { words } = useWords()

  return (
    <MyContext.Provider value={{ words }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};