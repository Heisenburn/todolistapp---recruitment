 

const Header = ({ setShowCompletedMode, showCompletedMode }) => {
    return (
        <div id="header">
            <div className="iconContainer" id="addNew">
              
            </div>
            <h3 id="heading">To-Do List</h3>
            <div
                id="toggleCompleted"
                className="iconContainer"
                onClick={() => setShowCompletedMode(!showCompletedMode)}
            ></div>
        </div>
    );
};

export default Header;
