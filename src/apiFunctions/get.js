export const makeFetchRequest =  ()=>{
   const fetchRequest = fetch('https://react.massivepixel.io/api/rudnik.marcin/', {
       
     })
     .then(response => response.json())
     .then(json => {
         return json
     })
     .catch(error => console.log('Error:: ' + error.message))
     return fetchRequest;
}

