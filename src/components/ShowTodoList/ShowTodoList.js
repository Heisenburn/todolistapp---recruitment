import { StyledTodoElement } from '../../styles/styled';
import { CheckedSVG } from '../../assets/icons/svgIcons';

const ShowTodoList = ({
    showCompletedMode,
    setEditMode,
    setControlledInputValues,
    setElementCurrentlyBeingEdited,
    todos,
    controlledInputValues,
    isCommunicatingWithServer,
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
       
            <ul>
                {todos.map((item, index) => {
                    if (showCompletedMode) {
                        return (
                            <StyledTodoElement
                                key={index}
                                onClick={() => handleTodoElementClick(index)}
                            >
                                <p key={index + 1}>{item.task}</p>

                                <CheckedSVG key={index + 2} is_completed={item.is_completed} />
                            </StyledTodoElement>
                        );
                    } else if(!showCompletedMode && !item.is_completed){
                        return(
                        <StyledTodoElement
                            key={index}
                            onClick={() => handleTodoElementClick(index)}
                        >
                            <p key={index + 1}>{item.task}</p>
                        </StyledTodoElement>
                        )
                    }
                  
                })}
            </ul>
        );
    } else {
        return !isCommunicatingWithServer ? <p>Add first element...</p> : <p>Loading...</p>;
    }
};

export default ShowTodoList;
