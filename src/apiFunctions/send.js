export const sendToServer = (task,is_completed=0, id='') => {

    const customFormData = new FormData();
    customFormData.append('task', task);
    customFormData.append('is_completed', is_completed);
    customFormData.append('id', id);
 
    fetch(`https://react.massivepixel.io/api/rudnik.marcin/`, {
        method: 'POST',
        body: customFormData,
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.log('Error:: ' + error.message));
};

//TODO: DRY
 

export const updateTodoOnServer = (task,id, is_completed=0) => {

    const customFormData = new FormData();
    customFormData.append('task', `${task}`);
    customFormData.append('is_completed', is_completed);
    // customFormData.append('id', '7dd3ba50-274a-4151-8eb5-0d137a2e81f1');
 
    fetch(`https://react.massivepixel.io/api/rudnik.marcin/${id}`, {
        method: 'POST',
        body: customFormData,
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.log('Error:: ' + error.message));
};



export const deleteOnServer = (id) => {

     
   const fetchResponse = fetch(`https://react.massivepixel.io/api/rudnik.marcin/${id}`, {
        method: 'DELETE',
     
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
          
        })
        .catch((error) => console.log('Error:: ' + error.message));

        return fetchResponse;
};

 