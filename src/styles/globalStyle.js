import { createGlobalStyle } from 'styled-components';
import backgroundImported from '../assets/images/backgroundImage.png';

const GlobalStyle = createGlobalStyle`
  body {
    background: url(${backgroundImported}) no-repeat;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }
`;

export default GlobalStyle;
