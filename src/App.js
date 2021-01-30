import { useState, useEffect } from 'react';
import AddTodo from './forms/AddTodo';
import EditTodo from './forms/EditTodo';
import { StyledContainer, StyledTodoElement } from './styles/styled';
import { CheckedSVG } from './icons/svgIcons';
// import './styles/globalStyles.css';
import { makeFetchRequest } from './apiFunctions/get';
import { deleteOnServer } from './apiFunctions/send';

function App() {
    const [todos, setTodos] = useState([]);

    const [showCompletedMode, setShowCompletedMode] = useState(false);
    const [todoInspectModeState, setTodoInspectModeState] = useState(false);

    const [elementCurrentlyBeingEdited, setElementCurrentlyBeingEdited] = useState(null);

    useEffect(() => {
        const response = makeFetchRequest();

        response
            .then((result) => {

                
              
                let filteredResults = result.data.map((item) => {
                    const { 'candidate': removedKey, ...rest } = item;
                    return rest
                    
                 
                });
                setTodos(filteredResults)
                // console.log(filteredResults)
                
            })
            .catch((err) => console.log(err));
    }, []);

    const [controlledInputValues, setControlledInputValues] = useState({
        addNewTodoInputValue: '',
        editTodoInputValue: '',
    });

    const handleTodoElementClick = (itemID) => {
        setTodoInspectModeState(true);

        let index = todos.map(item => item.id).indexOf(itemID);
    
        setControlledInputValues({
            ...controlledInputValues,
            editTodoInputValue: todos[index].task,
        });

        setElementCurrentlyBeingEdited(index);
    };

    const ToggleFinishedTask = () => {
        if (
            (todos.find((item) => item.is_completed === 1) !== undefined) &
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
                            item.is_completed === 0 && (
                                <StyledTodoElement
                                    key={index}
                                    onClick={() => handleTodoElementClick(item.id)}
                                >
                                    <p key={index + 1}>{item.task}</p>
                                </StyledTodoElement>
                            ),
                    )}
                </ul>
            );
        }
        return (
            <ul>
                {todos.map((item, index) => (
                    <StyledTodoElement key={index} onClick={() => handleTodoElementClick(item.id)}>
                        <p key={index + 1}>{item.task}</p>
                        <CheckedSVG key={index + 2} is_completed={item.is_completed} />
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
