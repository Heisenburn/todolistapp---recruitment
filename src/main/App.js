import { useState, useEffect } from 'react';
import AddTodo from '../forms/AddTodo';
import EditTodo from '../forms/EditTodo';
import { StyledContainer } from '../styles/styled';
// import './styles/globalStyles.css';
import { makeFetchRequest } from '../apiFunctions/get';
import ReactLoading from 'react-loading';
import ToggleFinishedTasks from './ToggleFinishedTasks';
import ShowTodoList from './ShowTodoList';

function App() {
    const [todos, setTodos] = useState([]);
    const [showCompletedMode, setShowCompletedMode] = useState(false);
    const [todoInspectModeState, setTodoInspectModeState] = useState(false);
    const [elementCurrentlyBeingEdited, setElementCurrentlyBeingEdited] = useState(null);
    const [controlledInputValues, setControlledInputValues] = useState({
        addNewTodoInputValue: '',
        editTodoInputValue: '',
    });
    const [isCommunicatingWithServer, setCommunicatingWithServer] = useState(true);

    useEffect(() => {
        const response = makeFetchRequest(); //get values at a startup

        response
            .then((result) => {
                if (result.message === undefined) {
                    //only if records exists

                    let filteredResults = result.data.map((item) => {
                        const { candidate: removedKey, ...rest } = item;
                        return rest;
                    });
                    setTimeout(() => {
                        //effect of downloading

                        setTodos(filteredResults);

                        setCommunicatingWithServer(false);
                    }, 1000);
                } else {
                    setCommunicatingWithServer(false);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const Loading = () => {
        if (isCommunicatingWithServer === true) {
            return <ReactLoading type={'spin'} color={'black'} height={667} width={375} />;
        }
        return null;
    };

    return (
        <StyledContainer>
            <Loading />
            <AddTodo
                todoInspectModeState={todoInspectModeState}
                controlledInputValues={controlledInputValues}
                setControlledInputValues={setControlledInputValues}
                setTodos={setTodos}
                todos={todos}
                isCommunicatingWithServer={isCommunicatingWithServer}
            />
            <ToggleFinishedTasks
                todos={todos}
                todoInspectModeState={todoInspectModeState}
                setShowCompletedMode={setShowCompletedMode}
                showCompletedMode={showCompletedMode}
            />
            <EditTodo
                todos={todos}
                setTodos={setTodos}
                elementCurrentlyBeingEdited={elementCurrentlyBeingEdited}
                controlledInputValues={controlledInputValues}
                setControlledInputValues={setControlledInputValues}
                setTodoInspectModeState={setTodoInspectModeState}
                todoInspectModeState={todoInspectModeState}
            />
            <ShowTodoList
                isCompletedVisible={showCompletedMode}
                todoInspectModeState={todoInspectModeState}
                setTodoInspectModeState={setTodoInspectModeState}
                setControlledInputValues={setControlledInputValues}
                setElementCurrentlyBeingEdited={setElementCurrentlyBeingEdited}
                todos={todos}
                controlledInputValues={controlledInputValues}
            />
        </StyledContainer>
    );
}

export default App;
