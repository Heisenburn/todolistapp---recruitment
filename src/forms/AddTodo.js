import {sendToServer} from '../apiFunctions/send';
import { v4 as uuidv4 } from 'uuid';

const AddTodo = ({
    todoInspectModeState,
    setTodos,
    todos,
    controlledInputValues,
    setControlledInputValues,
    isFetchCompleted
}) => {
    const handleAddTodo = (event) => {
        event.preventDefault();

        if (controlledInputValues.addNewTodoInputValue.length >= 1) {
            //validating form
            
            let tempAddObject = {
                id: uuidv4(),  //TODO: co jeśli stworzy takie same id jak na serwerze?
                is_completed: 0,
                task: controlledInputValues.addNewTodoInputValue,
                
            }
            setTodos([
                ...todos,tempAddObject,
            ]);

            setControlledInputValues({ ...controlledInputValues, addNewTodoInputValue: '' });
            sendToServer(tempAddObject.task, 0, tempAddObject.id);
        }
    };

    if (todoInspectModeState === false && isFetchCompleted) {
        return (
            <form onSubmit={handleAddTodo}>
                <label htmlFor="addNewTodoInput">Add new element</label>
                <input
                    id="addNewTodoInput"
                    value={controlledInputValues.addNewTodoInputValue}
                    onChange={(event) =>
                        
                        setControlledInputValues({
                            ...controlledInputValues,
                            addNewTodoInputValue: event.target.value,
                        })
                    }
                ></input>
                <input type="submit" value="Add todo"></input>
            </form>
        );
    }
    return null;
};

export default AddTodo;
