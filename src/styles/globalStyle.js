import { createGlobalStyle } from 'styled-components';
import backgroundImported from '../assets/images/backgroundImage.png';

const GlobalStyle = createGlobalStyle`
body {
  background: url(${backgroundImported}) no-repeat;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

#editForm {
  display: flex;
  flex-direction: column;

  
      label {
          padding: 0 10px;
      }

      .labelInputBox {
          padding: 20px 0;
          background: #ffffff59;
      }

      #editControlButtons {
          display: flex;
          margin-top: 10px;
          * {
              background: white;
              border: none;
              box-shadow: 0.1rem 0.3rem 3.5rem rgb(0 0 0 / 7%);
              padding: 20px;
              margin: 2px;
              border-radius: 5px;
          }
      }
  
}

`;

export default GlobalStyle;
