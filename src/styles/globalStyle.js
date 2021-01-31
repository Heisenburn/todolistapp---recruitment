import { createGlobalStyle } from 'styled-components';
 

const GlobalStyle = createGlobalStyle`
body {
    background: #80808080;
 
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.finishedTask{
    text-decoration: line-through;
}

#addTodoForm{
    background: #0000007a;
    color: white;
    padding: 20px;
}
label {
    padding: 0 10px;
}

ul{
    background: #ffffffad;
    padding: 20px;
    margin: 0;

    
   
}

#editForm {
  display: flex;
  flex-direction: column;

  


      .labelInputBox {
          padding: 20px 0;
          background: #ffffff59;
      }

      #editControlButtons {
          display: flex;
          margin-top: 10px;
          flex-direction: column;
         
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
