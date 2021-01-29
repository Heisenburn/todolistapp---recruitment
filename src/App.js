import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';
import styled from 'styled-components';

const StyledLiElement = styled.li`
    display: flex;
    p {
        margin: 0;
    }
`;

function App() {
    const [newTodoInput, setNewTodoInput] = useState('');
    const [todos, setTodos] = useState([]);

    const inputRef = useRef();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        //TODO: walidacja
        setTodos([
            ...todos,
            {
                id: todos.length + 1,
                name: newTodoInput,
                isCompleted: false,
            },
        ]);

        setNewTodoInput('');
    };

    const handleNewTodoChange = (event) => {
        setNewTodoInput(event.target.value);
    };

    // const AddTodo = () => {
    //     return (

    //     );
    // };

    const handleEditTodo = (e, index) => {
        console.log('test');
    };

    const handleCheckBox = (index) => {
        let tempArray = [...todos];

        tempArray[index - 1].isCompleted = !tempArray[index - 1].isCompleted; //changing to opposite value

        setTodos(tempArray);
    };

    const handleDeleteTodo = (index) => {
        let filteredArray = todos.filter((item) => item.id !== index);
        filteredArray = filteredArray.map((item) => {
            return {
                id: item.id !== 1 ? item.id - 1 : 1, //decreasing id for each element when deleting
                name: item.name,
                isCompleted: item.isCompleted,
            };
        });

        setTodos(filteredArray);
    };
    const TodoList = () => {
        return (
            <ul>
                {todos.map((item, index) => (
                
                      
                        <StyledLiElement key={index}>
                            <p key={index+1}>{item.name}</p>
                            <input
                               key={index+2}
                                type="checkbox"
                                onClick={() => handleCheckBox(index + 1)}
                                defaultChecked={item.isCompleted}
                            ></input>
                            <button key={index+3}  onClick={() => handleDeleteTodo(index + 1)}>
                                X
                            </button>
                        </StyledLiElement>

                        
                  
                ))}
            </ul>
        );
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="addNewTodoInput">Add new element</label>
                <input
                    ref={inputRef}
                    id="addNewTodoInput"
                    value={newTodoInput}
                    onChange={handleNewTodoChange}
                ></input>
                <input type="submit" value="Add todo"></input>
            </form>

            <TodoList />
        </>
    );
}

export default App;
