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
        const response = makeFetchRequest(); //get values at a startup

        response
            .then((result) => {
                if (!result.message) {
                    //only if records exists

                    let filteredResults = result.data.map((item) => {
                        const { candidate: removedKey, ...rest } = item;
                        return rest;
                    });

                    setTimeout(() => {
                        //effect of downloading
                        setCommunicatingWithServer(false);
                        setTodos(filteredResults);
                    });
                } else {
                    setCommunicatingWithServer(false);
                }
            })
            .catch((err) => console.log(err));
    }, [todos]);

    const Loading = () => {
        if (isCommunicatingWithServer) {
            return <ReactLoading type={'spin'} color={'black'} height={'100%'} width={'100%'} />;
        }
        return null;
    };

    return (
        <StyledContainer>
            <Loading />
           
            <Header
                setShowCompletedMode={setShowCompletedMode}
                showCompletedMode={showCompletedMode}
                setAddMode={setAddMode}
                addMode={addMode}
            />
            {!editMode && addMode && (
                <AddTodo
                    controlledInputValues={controlledInputValues}
                    setControlledInputValues={setControlledInputValues}
                    setAddMode={setAddMode}
                />
            )}

            {editMode &&
            <EditTodo
                todos={todos}
                setTodos={setTodos}
                elementCurrentlyBeingEdited={elementCurrentlyBeingEdited}
                controlledInputValues={controlledInputValues}
                setControlledInputValues={setControlledInputValues}
                setEditMode={setEditMode}
                setCommunicatingWithServer={setCommunicatingWithServer}
            />
}

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

export default App;
 