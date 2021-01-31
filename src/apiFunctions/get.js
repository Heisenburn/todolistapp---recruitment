export const makeFetchRequest = (setCommunicatingWithServer = () => {}) => {
    const fetchRequest = fetch('https://react.massivepixel.io/api/rudnik.marcin/')
        .then((response) => response.json())
        .then((json) => {
            setCommunicatingWithServer(false);
            return json;
        })
        .catch((error) => console.log('Error:: ' + error.message));
    return fetchRequest;
};
