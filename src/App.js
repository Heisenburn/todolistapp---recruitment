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
    const [addNewTodoInputValue, setAddNewTodoInputValue] = useState(''); //TODO: Controlled input zrobić jako jeden obiekt

    const [editTodoInputValue, setEditTodoInputValue] = useState('');

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
                value: addNewTodoInputValue,
                isCompleted: false,
            },
        ]);

        setAddNewTodoInputValue('');
    };

  

    const handleTodoElementClick = (index) => {
        setTodoInspectModeState(true);

        setEditTodoInputValue(todos[index].value);
        setElementCurrentlyBeingEdited(index);
    };

    const TodoList = () => {
        return (
            <ul>
                {todos.map((item, index) => (
                    <StyledTodoElement key={index} onClick={() => handleTodoElementClick(index)}>
                        <p key={index+1}>{item.value}</p>
                        
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
                addNewTodoInputValue={addNewTodoInputValue}
                setAddNewTodoInputValue={setAddNewTodoInputValue}
                
            />
            <EditTodo //TODO: tutaj zdecydowanie za dużo elementów przekazuje
                todos={todos}
                setTodos={setTodos}
                elementCurrentlyBeingEdited={elementCurrentlyBeingEdited}
                editTodoInputValue={editTodoInputValue}
                setEditTodoInputValue={setEditTodoInputValue}
                setTodoInspectModeState={setTodoInspectModeState}
                todoInspectModeState={todoInspectModeState}
            />
            <TodoList />
        </>
    );
}

export default App;
