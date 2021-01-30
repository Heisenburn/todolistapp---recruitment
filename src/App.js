import { useState, useEffect } from 'react';
import AddTodo from './forms/AddTodo';
import EditTodo from './forms/EditTodo';
import {StyledContainer, StyledTodoElement} from './styles/styled';
import {CheckedSVG} from './icons/svgIcons';
// import './styles/globalStyles.css';
import {makeFetchRequest} from './apiFunctions/get';
import {deleteOnServer} from './apiFunctions/send';

function App() {
    // useEffect( () => {
    //     deleteOnServer()
        
    // }, [])

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

    const ToggleFinishedTask = () => {
        if (
            (todos.find((item) => item.isCompleted === 1) !== undefined) &
            (todoInspectModeState === false)
        ) {
            return (
                <button onClick={() => setShowCompletedMode(!showCompletedMode)}>
                    Toggle finished tasks
                </button>
            );
        }
        return null;
    };
    const ShowTodoList = ({ isCompletedVisible }) => {
        if (isCompletedVisible === false) {
            return (
                <ul>
                    {todos.map(
                        (item, index) =>
                            item.isCompleted === 0 && (
                                <StyledTodoElement
                                    key={index}
                                    onClick={() => handleTodoElementClick(index)}
                                >
                                    <p key={index + 1}>{item.value}</p>
                                </StyledTodoElement>
                            ),
                    )}
                </ul>
            );
        }
        return (
            <ul>
                {todos.map((item, index) => (
                    <StyledTodoElement key={index} onClick={() => handleTodoElementClick(index)}>
                        <p key={index + 1}>{item.value}</p>
                        <CheckedSVG key={index + 2} isCompleted={item.isCompleted} />
                    </StyledTodoElement>
                ))}
            </ul>
        );
    };

    return (
        <StyledContainer>
            <AddTodo
                todoInspectModeState={todoInspectModeState}
                controlledInputValues={controlledInputValues}
                setControlledInputValues={setControlledInputValues}
                setTodos={setTodos}
                todos={todos}
            />
            <ToggleFinishedTask />
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
        </StyledContainer>
    );
}

export default App;
