console.log('Comecei ----- ');

let promise = fetch ('https://api.asdfasdfgithub.com/users/rommelcarneiro')
    
promise.then ((response) =>  response.json())
    .then ((dataJSON) => {
        console.log(dataJSON.name, '\n', dataJSON.bio);
    })
    .catch (err=> console.log (err.message))

console.log ('Terminei -------- ')

setTimeout (() => {
    console.log (promise)
}, 10000)
