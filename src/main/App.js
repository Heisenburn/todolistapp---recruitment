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
            return <ReactLoading type={'spin'} color={'black'} height={'100%'} width={'100%'} />;
        }
        return null;
    };

    return (
        <StyledContainer>
            <Loading />
            <Header />
            <AddTodo
                editMode={editMode}
                controlledInputValues={controlledInputValues}
                setControlledInputValues={setControlledInputValues}
                setTodos={setTodos}
                todos={todos}
                isCommunicatingWithServer={isCommunicatingWithServer}
            />
            <EditTodo
                todos={todos}
                setTodos={setTodos}
                elementCurrentlyBeingEdited={elementCurrentlyBeingEdited}
                controlledInputValues={controlledInputValues}
                setControlledInputValues={setControlledInputValues}
                setEditMode={setEditMode}
                editMode={editMode}
            />
            <ShowTodoList
                showCompletedMode={showCompletedMode}
                editMode={editMode}
                setEditMode={setEditMode}
                setControlledInputValues={setControlledInputValues}
                setElementCurrentlyBeingEdited={setElementCurrentlyBeingEdited}
                todos={todos}
                controlledInputValues={controlledInputValues}
                setShowCompletedMode={setShowCompletedMode}
            />
        </StyledContainer>
    );
}

export default App;
