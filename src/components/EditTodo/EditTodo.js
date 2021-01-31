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
            let tempArray = [...todos]; //m.in. kopia referencji - zmienia też na oryginalnej
            tempArray[elementCurrentlyBeingEdited].task = newValue;
            updateTodoOnServer(
                newValue,
                todos[elementCurrentlyBeingEdited].id,
                todos[elementCurrentlyBeingEdited].is_completed,
                setCommunicatingWithServer,
            );
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
                setCommunicatingWithServer,
            );
        } else {
            tempArray[elementCurrentlyBeingEdited].is_completed = 0;
            updateTodoOnServer(
                todos[elementCurrentlyBeingEdited].task,
                todos[elementCurrentlyBeingEdited].id,
                0,
                setCommunicatingWithServer,
            );
        }
        setEditMode(false);
    };

    const handleDeleteTodo = (event) => {
        event.preventDefault();
        setCommunicatingWithServer(true);
        deleteOnServer(
            todos[elementCurrentlyBeingEdited].id,
            setCommunicatingWithServer,
            setEditMode,
        );
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
                    <input type="submit" value="SUBMIT EDIT"></input>
                    <button onClick={handleDeleteTodo}>DELETE TODO</button>
                    <button onClick={() => setEditMode(false)}>QUIT</button>
                </div>
            </form>
        </>
    );
};

export default EditTodo;
