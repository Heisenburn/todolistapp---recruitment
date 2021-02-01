import { StyledTodoElement } from '../../styles/styled';
import { CheckedSVG } from '../../assets/icons/svgIcons';

const ShowTodoList = ({
    showCompletedMode,
    setEditMode,
    setControlledInputValues,
    setElementCurrentlyBeingEdited,
    todos,
    controlledInputValues,
    updating,
}) => {
    const handleTodoElementClick = (index) => {
        setEditMode(true);

        setControlledInputValues({
            ...controlledInputValues,
            editTodoInputValue: todos[index].task,
        });

        setElementCurrentlyBeingEdited(index);
    };

    if (todos.length) {
        return (
            //TODO: DRY
            <ul>
                {todos.map((item, index) => {
                    if (showCompletedMode) {
                        return (
                            <StyledTodoElement
                                key={index}
                                onClick={() => handleTodoElementClick(index)}
                            >
                                <CheckedSVG key={index + 2} is_completed={item.is_completed} />
                                <p className={item.is_completed ? 'finishedTask' : ''} key={index + 1}>{item.task}</p>
                            </StyledTodoElement>
                        );
                    } else if (!showCompletedMode && !item.is_completed) {
                        return (
                            <StyledTodoElement
                                key={index}
                                onClick={() => handleTodoElementClick(index)}
                            >
                                <CheckedSVG key={index + 2} is_completed={item.is_completed} />
                                <p key={index + 1}>{item.task}</p>
                            </StyledTodoElement>
                        );
                    }
                    return null;
                })}
            </ul>
        );
    } else {
        return !updating ? <p>Add first element...</p> : <p>Loading...</p>;
    }
};

export default ShowTodoList;
