import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  body {
    background-color: #161616;
    background-image: repeating-linear-gradient(to bottom, transparent 7px, rgba(17, 17, 17, .2) 9px, #111 13px, transparent 13px);
    font-family: "Inknut Antiqua", serif;
    font-style: normal;
    font-weight: 700;
    height: 100vh;
    line-height: 1.4;
    text-transform: uppercase;
    min-width: 800px;
    @media screen and (max-width: 768px) {
      line-height: 1.6;
      height: 100svh;
      min-width: auto;
    }
  }
`;

export default GlobalStyles;