import { StyledTodoElement } from '../../styles/styled';
import { CheckedSVG } from '../../assets/icons/svgIcons';

const ShowTodoList = ({
    showCompletedMode,
    editMode,
    setEditMode,
    setControlledInputValues,
    setElementCurrentlyBeingEdited,
    todos,
    controlledInputValues,
    isCommunicatingWithServer
}) => {
    const handleTodoElementClick = (index) => {
        setEditMode(true);
 

        setControlledInputValues({
            ...controlledInputValues,
            editTodoInputValue: todos[index].task,
        });

         
        setElementCurrentlyBeingEdited(index);
    };

    if (editMode === false) {
        if (todos.length >= 1) {
            if (showCompletedMode === false) {
                //TODO: DRY
                return (
                    <ul>
                        {todos.map(
                            (item, index) =>
                                item.is_completed === 0 && (
                                    <StyledTodoElement
                                        key={index}
                                        onClick={() => handleTodoElementClick(index)}
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
                            onClick={() => handleTodoElementClick(index)}
                        >
                            <p key={index + 1}>{item.task}</p>
                            <CheckedSVG key={index + 2} is_completed={item.is_completed} />
                        </StyledTodoElement>
                    ))}
                </ul>
            );
        } else {
            if(isCommunicatingWithServer===false){
                return <p>Add first element...</p>;
            }else{
                return <p>Loading...</p>
            }
            
        }
    }
    return null;
};

export default ShowTodoList;
