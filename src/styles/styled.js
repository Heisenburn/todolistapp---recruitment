import styled from 'styled-components';
import addIcon from '../assets/icons/addIcon.svg';
import gearIcon from '../assets/icons/gearIcon.svg';

export const StyledContainer = styled.div`
    width: 30vw;
    @media only screen and (max-width: 920px){
        width: 80vw;
    }

    #header {
        background: #a96621;
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-top: 10px;
        .iconContainer {
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            &:hover{
                transform: scale(0.8);
            }
        }

        #addNew {
            background-image: url('${addIcon}');
        }

        #toggleCompleted {
            background-image: url('${gearIcon}');
        }

        #addNew,
        #toggleCompleted {
            background-repeat: no-repeat;
            background-size: cover;
        }
    }
`;

export const StyledTodoElement = styled.li`
    display: flex;
    border: 1px solid black;
    margin: 20px 0;
    svg {
        border-right: 1px solid black;
    }
    p {
        margin: 0;
        padding-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
