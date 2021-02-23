class ApiCommunication {
    apiURL = 'https://react.massivepixel.io/api/rudnik.marcin/';

    //getters:

    getTodos = (setGettingTodos = () => {}) => {
        const fetchRequest = fetch(`${this.apiURL}`)
            .then((response) => response.json())
            .then((json) => {
                console.log('koniec pobierania');
                setGettingTodos(false);
                return json;
            })
            .catch((error) => console.log('Error:: ' + error.message));
        return fetchRequest;
    };

    //setters:

    sendToServer = (task, is_completed = 0, setUpdating = () => {}) => {
        const customFormData = new FormData();
        customFormData.append('task', task);
        customFormData.append('is_completed', is_completed);

        fetch(`${this.apiURL}`, {
            method: 'POST',
            body: customFormData,
        })
            .then((response) => response.json())
            .then((json) => {
                setUpdating(false);
                console.log(json);
            })
            .catch((error) => console.log('Error:: ' + error.message));
    };

    updateTodoOnServer = (task, id, is_completed = 0, setUpdating = () => {}) => {
        const customFormData = new FormData();
        customFormData.append('task', `${task}`);
        customFormData.append('is_completed', is_completed);
        

        fetch(`${this.apiURL}/${id}`, {
            method: 'POST',
            body: customFormData,
        })
            .then((response) => response.json())
            .then((json) => {
                setUpdating(false);
                console.log(json);
            })
            .catch((error) => console.log('Error:: ' + error.message));
    };

    deleteOnServer = (id, setUpdating = () => {}, setEditMode = () => {}) => {
        fetch(`${this.apiURL}/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((json) => {
                setUpdating(false);
                setEditMode(false);
                console.log('kasowanie skonczone');
                console.log(json);
            })
            .catch((error) => console.log('Error:: ' + error.message));
    };
}

export default ApiCommunication;
