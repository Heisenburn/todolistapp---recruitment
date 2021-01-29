import { useState } from 'react';
import styled from 'styled-components';
import AddTodo from './forms/AddTodo';
import EditTodo from './forms/EditTodo';

const StyledTodoElement = styled.li`
    display: flex;
    border: 1px solid black;
    p {
        margin: 0;
    }
`;

const CheckedSVG = ({ isCompleted }) => {
    if (isCompleted) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-circle-check"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <path d="M9 12l2 2l4 -4" />
            </svg>
        );
    }
    return null;
};

function App() {
    const [controlledInputValues, setControlledInputValues] = useState({
        addNewTodoInputValue: '',
        editTodoInputValue: '',
    });

    const [todos, setTodos] = useState([]);
    
    const [showCompletedMode, setShowCompletedMode] = useState(false);
    const [todoInspectModeState, setTodoInspectModeState] = useState(false);

    const [elementCurrentlyBeingEdited, setElementCurrentlyBeingEdited] = useState(null);

    const handleTodoElementClick = (index) => {
        setTodoInspectModeState(true);

        setControlledInputValues({
            ...controlledInputValues,
            editTodoInputValue: todos[index].value,
        });

        setElementCurrentlyBeingEdited(index);
    };

    const ShowTodoList = ({isCompletedVisible}) => {

        if(isCompletedVisible===false){

            return (
                <ul>
                    {todos.map((item, index) => (
                        item.isCompleted===false &&
                        <StyledTodoElement key={index} onClick={() => handleTodoElementClick(index)}>
                            <p key={index + 1}>{item.value}</p>
                            <CheckedSVG key={index+2} isCompleted={item.isCompleted} />
                        </StyledTodoElement>
                    ))}
                </ul>
            );
        }
        return (
            <ul>
            {todos.map((item, index) => (
                 
                <StyledTodoElement key={index} onClick={() => handleTodoElementClick(index)}>
                    <p key={index + 1}>{item.value}</p>
                    <CheckedSVG key={index+2} isCompleted={item.isCompleted} />
                </StyledTodoElement>
            ))}
        </ul>
        )
      
    };

    return (
        <>
      
            <AddTodo
                todoInspectModeState={todoInspectModeState}
                controlledInputValues={controlledInputValues}
                setControlledInputValues={setControlledInputValues}
                setTodos={setTodos}
                todos={todos}
            />
              <button onClick={()=> setShowCompletedMode(!showCompletedMode)}>See finished tasks</button>
            <EditTodo
                todos={todos}
                setTodos={setTodos}
                elementCurrentlyBeingEdited={elementCurrentlyBeingEdited}
                controlledInputValues={controlledInputValues}
                setControlledInputValues={setControlledInputValues}
                setTodoInspectModeState={setTodoInspectModeState}
                todoInspectModeState={todoInspectModeState}
            />
            <ShowTodoList isCompletedVisible={showCompletedMode} />
            
        </>
    );
}

export default App;
