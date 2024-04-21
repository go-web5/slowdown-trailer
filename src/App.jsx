import { createContext, useState } from 'react';
export const PromoContext = createContext();
import { mediaQuery, useMediaQuery } from './useMediaQuery';
import GlobalStyles from "./GlobalStyles";
import './App.css';

import ReleasePc from "./ReleasePc";
import ReleaseSp from "./ReleaseSp";

export const Responsive = () => {
  const isSp = useMediaQuery(mediaQuery.sp)
  
  if (isSp) {
    return <ReleaseSp />
  }
  return <ReleasePc />
}

const App = () =>  {
  const [isAnimatedA, setIsAnimatedA] = useState(false);
  const [isAnimatedB, setIsAnimatedB] = useState(false);
  const [isAnimatedC, setIsAnimatedC] = useState(false);
  const [isAnimatedD, setIsAnimatedD] = useState(false);
  const [isAnimatedE, setIsAnimatedE] = useState(false);
  const [isAnimatedF, setIsAnimatedF] = useState(false);
  const [isAnimatedG, setIsAnimatedG] = useState(false);

  return (
    <PromoContext.Provider
      value={{
        isAnimatedA,
        setIsAnimatedA,
        isAnimatedB,
        setIsAnimatedB,
        isAnimatedC,
        setIsAnimatedC,
        isAnimatedD,
        setIsAnimatedD,
        isAnimatedE,
        setIsAnimatedE,
        isAnimatedF,
        setIsAnimatedF,
        isAnimatedG,
        setIsAnimatedG
      }}>
      <GlobalStyles />
      <Responsive/>
    </PromoContext.Provider>
  );
}

export default App;
