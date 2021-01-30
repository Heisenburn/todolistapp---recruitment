import { StyledTodoElement } from '../../styles/styled';
import { CheckedSVG } from '../../icons/svgIcons';
import ToggleFinishedTasks from './ToggleFinishedTasks';

const ShowTodoList = ({
    showCompletedMode,
    editMode,
    setEditMode,
    setControlledInputValues,
    setElementCurrentlyBeingEdited,
    todos,
    controlledInputValues,
    setShowCompletedMode,
}) => {
    const RenderForms = () => {
        const handleTodoElementClick = (itemID) => {
            setEditMode(true);
            
            let index = todos.map((item) => item.id).indexOf(itemID);

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

    return (
        <>
            <ToggleFinishedTasks
                todos={todos}
                editMode={editMode}
                setShowCompletedMode={setShowCompletedMode}
                showCompletedMode={showCompletedMode}
            />
            <RenderForms />
        </>
    );
};

export default ShowTodoList;
