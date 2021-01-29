import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';
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

function App() {
    const [controlledInputValues, setControlledInputValues] = useState({
        addNewTodoInputValue: '',
        editTodoInputValue: '',
    });

    const [todos, setTodos] = useState([]);
    const [todoInspectModeState, setTodoInspectModeState] = useState(false);

    const [elementCurrentlyBeingEdited, setElementCurrentlyBeingEdited] = useState(null);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        //TODO: walidacja
        setTodos([
            ...todos,
            {
                id: todos.length,
                value: controlledInputValues.addNewTodoInputValue,
                isCompleted: false,
            },
        ]);

        setControlledInputValues({ ...controlledInputValues, addNewTodoInputValue: '' });
    };

    const handleTodoElementClick = (index) => {
        setTodoInspectModeState(true);

        setControlledInputValues({
            ...controlledInputValues,
            editTodoInputValue: todos[index].value,
        });

        setElementCurrentlyBeingEdited(index);
    };

    const TodoList = () => {
        return (
            <ul>
                {todos.map((item, index) => (
                    <StyledTodoElement key={index} onClick={() => handleTodoElementClick(index)}>
                        <p key={index + 1}>{item.value}</p>
                    </StyledTodoElement>
                ))}
            </ul>
        );
    };

    return (
        <>
            <AddTodo
                todoInspectModeState={todoInspectModeState}
                onHandleFormSubmit={handleFormSubmit}
                controlledInputValues={controlledInputValues}
                setControlledInputValues={setControlledInputValues}
            />
            <EditTodo //TODO: tutaj zdecydowanie za dużo elementów przekazuje
                todos={todos}
                setTodos={setTodos}
                elementCurrentlyBeingEdited={elementCurrentlyBeingEdited}
                controlledInputValues={controlledInputValues}
                setControlledInputValues={setControlledInputValues}
                setTodoInspectModeState={setTodoInspectModeState}
                todoInspectModeState={todoInspectModeState}
            />
            <TodoList />
        </>
    );
}

export default App;
