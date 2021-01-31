import { useState, useEffect } from 'react';
import AddTodo from '../components/AddTodo/AddTodo';
import EditTodo from '../components/EditTodo/EditTodo';
import ShowTodoList from '../components/ShowTodoList/ShowTodoList';
import { StyledContainer } from '../styles/styled';
import { makeFetchRequest } from '../apiFunctions/get';
import ReactLoading from 'react-loading';
import Header from '../components/Header/Header';

function App() {
    const [todos, setTodos] = useState([]);
    const [showCompletedMode, setShowCompletedMode] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [elementCurrentlyBeingEdited, setElementCurrentlyBeingEdited] = useState(null);
    const [controlledInputValues, setControlledInputValues] = useState({
        addNewTodoInputValue: '',
        editTodoInputValue: '',
    });
    const [addMode, setAddMode] = useState(false);
    const [isCommunicatingWithServer, setCommunicatingWithServer] = useState(true);

    useEffect(() => {
        const response = makeFetchRequest(); //get todos at a startup

        response
            .then((result) => {
                if (!result.message) {
                    setTodos(result.data);
                    setCommunicatingWithServer(false);
                } else {
                    //zero todos in dB
                    setCommunicatingWithServer(false);
                    setTodos([]);
                }
            })
            .catch((err) => console.log(err));
    }, [isCommunicatingWithServer]);

    const Loading = () => {
        return <ReactLoading type={'spin'} color={'black'} height={'100%'} width={'100%'} />;
    };

    if (!isCommunicatingWithServer) {
        return (
            <StyledContainer>
                {!editMode && <h4>Click on element to edit it</h4>}
                <Header
                    setShowCompletedMode={setShowCompletedMode}
                    showCompletedMode={showCompletedMode}
                    setAddMode={setAddMode}
                    addMode={addMode}
                />
                {!editMode && addMode && (
                    <AddTodo
                        setCommunicatingWithServer={setCommunicatingWithServer}
                        controlledInputValues={controlledInputValues}
                        setControlledInputValues={setControlledInputValues}
                        setAddMode={setAddMode}
                    />
                )}

                {editMode && (
                    <EditTodo
                        todos={todos}
                        setTodos={setTodos}
                        elementCurrentlyBeingEdited={elementCurrentlyBeingEdited}
                        controlledInputValues={controlledInputValues}
                        setControlledInputValues={setControlledInputValues}
                        setEditMode={setEditMode}
                        setCommunicatingWithServer={setCommunicatingWithServer}
                    />
                )}

                {!editMode && (
                    <ShowTodoList
                        showCompletedMode={showCompletedMode}
                        setEditMode={setEditMode}
                        setControlledInputValues={setControlledInputValues}
                        setElementCurrentlyBeingEdited={setElementCurrentlyBeingEdited}
                        todos={todos}
                        controlledInputValues={controlledInputValues}
                        setShowCompletedMode={setShowCompletedMode}
                        isCommunicatingWithServer={isCommunicatingWithServer}
                    />
                )}
            </StyledContainer>
        );
    }
    return (
        <>
            <h1>Loading...</h1>
            <Loading />
        </>
    );
}

export default App;
