import { updateTodoOnServer } from '../../apiFunctions/send';
import { deleteOnServer } from '../../apiFunctions/send';

const EditTodo = ({
    todos,
    elementCurrentlyBeingEdited,
    controlledInputValues,
    setControlledInputValues,
    setEditMode,
    setCommunicatingWithServer,
}) => {
    const handleEditTodo = (newValue) => {
        if (newValue !== todos[elementCurrentlyBeingEdited].task) {
            setCommunicatingWithServer(true);
            let tempArray = [...todos];
            tempArray[elementCurrentlyBeingEdited].task = newValue;
            updateTodoOnServer(newValue, todos[elementCurrentlyBeingEdited].id);
        }
    };

    const handleClickCheckbox = () => {
        let tempArray = [...todos];
        setCommunicatingWithServer(true);

        if (tempArray[elementCurrentlyBeingEdited].is_completed === 0) {
            tempArray[elementCurrentlyBeingEdited].is_completed = 1;
            updateTodoOnServer(
                todos[elementCurrentlyBeingEdited].task,
                todos[elementCurrentlyBeingEdited].id,
                1,
            );
        } else {
            tempArray[elementCurrentlyBeingEdited].is_completed = 0;
            updateTodoOnServer(
                todos[elementCurrentlyBeingEdited].task,
                todos[elementCurrentlyBeingEdited].id,
                0,
            );
        }
        setEditMode(false);
    };

    const handleDeleteTodo = (event) => {
        event.preventDefault();
        setCommunicatingWithServer(true);
        deleteOnServer(todos[elementCurrentlyBeingEdited].id);
        setEditMode(false);
    };

    const handleEditSubmitForm = (event) => {
        event.preventDefault();

        if (controlledInputValues.editTodoInputValue.length) {
            handleEditTodo(controlledInputValues.editTodoInputValue);
            setControlledInputValues({ ...controlledInputValues, editTodoInputValue: '' });
            setEditMode(false);
        }
    };

    return (
        <>
            <form id="editForm" onSubmit={handleEditSubmitForm}>
                <div className="labelInputBox">
                    <label htmlFor="editTodoInput">Edit element</label>
                    <input
                        id="editTodoInput"
                        value={controlledInputValues.editTodoInputValue}
                        onChange={(event) =>
                            setControlledInputValues({
                                ...controlledInputValues,
                                editTodoInputValue: event.target.value,
                            })
                        }
                    ></input>
                </div>
                <div className="labelInputBox">
                    <label htmlFor="checkBoxInput">Mark as done</label>

                    <input
                        id="checkBoxInput"
                        type="checkbox"
                        onClick={() => handleClickCheckbox(elementCurrentlyBeingEdited)}
                        defaultChecked={todos[elementCurrentlyBeingEdited].is_completed === 1}
                    ></input>
                </div>
                <div id="editControlButtons">
                    <input type="submit" value="submit edit"></input>
                    <button onClick={handleDeleteTodo}>delete</button>
                    <button onClick={() => setEditMode(false)}>QUIT</button>
                </div>
            </form>
        </>
    );
};

export default EditTodo;
