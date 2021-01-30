const ToggleFinishedTasks = ({ todos, editMode, setShowCompletedMode, showCompletedMode }) => {
    if ((todos.find((item) => item.is_completed === 1) !== undefined) & (editMode === false)) {
        return (
            <button onClick={() => setShowCompletedMode(!showCompletedMode)}>
                Toggle finished tasks
            </button>
        );
    }
    return null;
};

export default ToggleFinishedTasks;
