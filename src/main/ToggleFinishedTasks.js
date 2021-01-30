const ToggleFinishedTasks = ({todos, todoInspectModeState, setShowCompletedMode, showCompletedMode}) => {
    if (
        (todos.find((item) => item.is_completed === 1) !== undefined) &
        (todoInspectModeState === false)
    ) {
        return (
            <button onClick={() => setShowCompletedMode(!showCompletedMode)}>
                Toggle finished tasks
            </button>
        );
    }
    return null;
};

export default ToggleFinishedTasks;