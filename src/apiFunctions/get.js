export const makeFetchRequest =  ()=>{
    fetch('https://react.massivepixel.io/api/rudnik.marcin/', {
       
     })
     .then(response => response.json())
     .then(json => console.log(json))
     .catch(error => console.log('Error:: ' + error.message))

}

