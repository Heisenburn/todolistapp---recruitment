import ApiCommunication from '../../apiFunctions/ApiCommunication';
const db = new ApiCommunication()

const EditTodo = ({
    todos,
    elementCurrentlyBeingEdited,
    controlledInputValues,
    setControlledInputValues,
    setEditMode,
    setUpdating,
}) => {
    const handleEditTodo = (newValue) => {
        if (newValue !== todos[elementCurrentlyBeingEdited].task) {
            setUpdating(true);
            let tempArray = [...todos]; //m.in. kopia referencji - zmienia też na oryginalnej
            tempArray[elementCurrentlyBeingEdited].task = newValue;
            db.updateTodoOnServer(
                newValue,
                todos[elementCurrentlyBeingEdited].id,
                todos[elementCurrentlyBeingEdited].is_completed,
                setUpdating,
            );
        }
    };

    const handleClickCheckbox = () => {
        let tempArray = [...todos];
        setUpdating(true);

        db.updateTodoOnServer(
           todos[elementCurrentlyBeingEdited].task,
           todos[elementCurrentlyBeingEdited].id,
           !tempArray[elementCurrentlyBeingEdited].is_completed,
           setUpdating,
        );
        setEditMode(false);
    };

    const handleDeleteTodo = (event) => {
        event.preventDefault();
        setUpdating(true);
        console.log('zaczynam kasowac')
        db.deleteOnServer(
            todos[elementCurrentlyBeingEdited].id,
            setUpdating,
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
