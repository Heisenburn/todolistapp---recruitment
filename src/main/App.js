import { useState, useEffect } from 'react';
import AddTodo from '../components/AddTodo/AddTodo';
import EditTodo from '../components/EditTodo/EditTodo';
import ShowTodoList from '../components/ShowTodoList/ShowTodoList';
import { StyledContainer } from '../styles/styled';


import ReactLoading from 'react-loading';
import Header from '../components/Header/Header';

import ApiCommunication from '../apiFunctions/ApiCommunication';
const db = new ApiCommunication()

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
    const [gettingTodos, setGettingTodos] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (!updating) {
            setGettingTodos(true)
            console.log('pobieram z serwera')
            const response = db.getTodos(setGettingTodos); //get todos at a startup
            response
                .then((result) => {
                    !result.message && setTodos(result.data) 
                })
                .catch((err) => console.log(err));
        }
    }, [updating])

    const Loading = () => {
        return <ReactLoading type={'spin'} color={'black'} height={'100%'} width={'100%'} />;
    };

    if (!updating && !gettingTodos) {
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
                        setUpdating={setUpdating}
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
                        setUpdating={setUpdating}
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
                        updating={updating}
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
