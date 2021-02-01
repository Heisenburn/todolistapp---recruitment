export const makeFetchRequest = (setGettingTodos = () => {}) => {
    const fetchRequest = fetch('https://react.massivepixel.io/api/rudnik.marcin/')
        .then((response) => response.json())
        .then((json) => {
            console.log('koniec pobierania');
            setGettingTodos(false);
            return json;
        })
        .catch((error) => console.log('Error:: ' + error.message));
    return fetchRequest;
};
