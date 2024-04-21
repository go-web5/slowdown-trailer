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
  return (
    <>
      <GlobalStyles />
      <Responsive/>
    </>
  );
}

export default App;
