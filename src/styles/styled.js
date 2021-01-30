import styled from 'styled-components';

import addIcon from '../assets/icons/addIcon.svg';
import gearIcon from '../assets/icons/gearIcon.svg';

export const StyledContainer = styled.div`
    padding-top: 100px;
    width: 30vw;

    #header {
        background: #a96621;
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between;


        #addNew {
            background: url(${addIcon});
        }

        #toggleCompleted {
            background: url(${gearIcon});
        }

        
        #addNew, #toggleCompleted {
            background-position: center;
            background-repeat: no-repeat;
            width: 50px;
        }
    }

    ul {
        padding: 0;
    }
`;

export const StyledTodoElement = styled.li`
    display: flex;
    border: 1px solid black;
    min-width: 200px;
    p {
        margin: 0;
    }
`;
