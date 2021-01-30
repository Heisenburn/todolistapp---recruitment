export const sendToServer = (elementToBeSend) => {

    const customFormData = new FormData();
    customFormData.append('task', elementToBeSend.value);
    customFormData.append('is_completed', 0);
    customFormData.append('id', '');
 
    fetch(`https://react.massivepixel.io/api/rudnik.marcin/`, {
        method: 'POST',
        body: customFormData,
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.log('Error:: ' + error.message));
};


 

export const updateTodoOnServer = () => {

    const customFormData = new FormData();
    customFormData.append('task', 'test test test');
    customFormData.append('is_completed', 0);
    // customFormData.append('id', '7dd3ba50-274a-4151-8eb5-0d137a2e81f1');
 
    fetch(`https://react.massivepixel.io/api/rudnik.marcin/7dd3ba50-274a-4151-8eb5-0d137a2e81f1`, {
        method: 'POST',
        body: customFormData,
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.log('Error:: ' + error.message));
};



export const deleteOnServer = (id) => {

 
    fetch(`https://react.massivepixel.io/api/rudnik.marcin/${id}`, {
        method: 'DELETE',
     
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.log('Error:: ' + error.message));
};