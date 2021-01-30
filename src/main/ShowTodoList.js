import { StyledTodoElement } from '../styles/styled';
import { CheckedSVG } from '../icons/svgIcons';

const ShowTodoList = ({
    isCompletedVisible,
    todoInspectModeState,
    setTodoInspectModeState,
    setControlledInputValues,
    setElementCurrentlyBeingEdited,
    todos,
    controlledInputValues,
}) => {
    const handleTodoElementClick = (itemID) => {
        setTodoInspectModeState(true);

        let index = todos.map((item) => item.id).indexOf(itemID);

        setControlledInputValues({
            ...controlledInputValues,
            editTodoInputValue: todos[index].task,
        });

        setElementCurrentlyBeingEdited(index);
    };

    if (todoInspectModeState === false) {
        if (todos.length >= 1) {
            if (isCompletedVisible === false) {
                //TODO: DRY
                return (
                    <ul>
                        {todos.map(
                            (item, index) =>
                                item.is_completed === 0 && (
                                    <StyledTodoElement
                                        key={index}
                                        onClick={() => handleTodoElementClick(item.id)}
                                    >
                                        <p key={index + 1}>{item.task}</p>
                                    </StyledTodoElement>
                                ),
                        )}
                    </ul>
                );
            }
            return (
                <ul>
                    {todos.map((item, index) => (
                        <StyledTodoElement
                            key={index}
                            onClick={() => handleTodoElementClick(item.id)}
                        >
                            <p key={index + 1}>{item.task}</p>
                            <CheckedSVG key={index + 2} is_completed={item.is_completed} />
                        </StyledTodoElement>
                    ))}
                </ul>
            );
        } else {
            return <p>Add first element</p>;
        }
    }
    return null;
};

export default ShowTodoList;
