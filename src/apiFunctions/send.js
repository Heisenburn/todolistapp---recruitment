export const sendToServer = (
    task,
    is_completed = 0,
    setUpdating = () => {},
) => {
    const customFormData = new FormData();
    customFormData.append('task', task);
    customFormData.append('is_completed', is_completed);

    fetch(`https://react.massivepixel.io/api/rudnik.marcin/`, {
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

//TODO: DRY

export const updateTodoOnServer = (
    task,
    id,
    is_completed = 0,
    setUpdating = () => {},
) => {
    const customFormData = new FormData();
    customFormData.append('task', `${task}`);
    customFormData.append('is_completed', is_completed);
    // customFormData.append('id', 'uuid()?');

    fetch(`https://react.massivepixel.io/api/rudnik.marcin/${id}`, {
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

export const deleteOnServer = (
    id,
    setUpdating = () => {},
    setEditMode = () => {},
) => {
    fetch(`https://react.massivepixel.io/api/rudnik.marcin/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((json) => {
            setUpdating(false);
            setEditMode(false);
             console.log('kasowanie skonczone')
            console.log(json);
        })
        .catch((error) => console.log('Error:: ' + error.message));
};
