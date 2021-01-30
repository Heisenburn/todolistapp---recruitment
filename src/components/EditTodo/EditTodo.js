import { updateTodoOnServer } from '../../apiFunctions/send';
import { deleteOnServer } from '../../apiFunctions/send';

const EditTodo = ({
    todos,
    setTodos,
    elementCurrentlyBeingEdited,
    controlledInputValues,
    setControlledInputValues,
    setEditMode,
}) => {
    const handleEditTodo = (newValue) => {
        if (newValue !== todos[elementCurrentlyBeingEdited].task) {
            let tempArray = [...todos];

            tempArray[elementCurrentlyBeingEdited].task = newValue;

            updateTodoOnServer(newValue, todos[elementCurrentlyBeingEdited].id); //first send to server then refresh todos
            setTodos(tempArray);
        }
    };

    const handleClickCheckbox = () => {
        let tempArray = [...todos];

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

        setTodos(tempArray);
        setEditMode(false);
    };

    const handleDeleteTodo = (event) => {
        event.preventDefault();
        deleteOnServer(todos[elementCurrentlyBeingEdited].id);

        let filteredArray = todos.filter((item, index) => index !== elementCurrentlyBeingEdited); //removing first the element

        //then returning new array of objects

        filteredArray = filteredArray.map((item, index) => {
            return {
                id: todos[index].id,
                task: item.task,
                is_completed: item.is_completed,
            };
        });

        setTodos(filteredArray);
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
            <form onSubmit={handleEditSubmitForm}>
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
                <input
                    type="checkbox"
                    onClick={() => handleClickCheckbox(elementCurrentlyBeingEdited)}
                    defaultChecked={todos[elementCurrentlyBeingEdited].is_completed === 1}
                ></input>

                <input type="submit" value="submit edit"></input>
                <button onClick={handleDeleteTodo}>delete</button>
            </form>
            <button onClick={() => setEditMode(false)}>QUIT</button>
        </>
    );
};

export default EditTodo;
