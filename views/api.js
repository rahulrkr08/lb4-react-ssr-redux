import fetch from "isomorphic-fetch";

export function fetchCircuits() {
    return fetch( "http://localhost:7000/circuits" )
        .then( res => res.json())
        .then( res => res.MRData.CircuitTable.Circuits)
        .catch((err) => {
            console.log(err)
        });
}


export function fetchGreetings() {
    return fetch( "http://localhost:7000/ping" )
        .then( res => res.json())
        .then( res => res.greeting)
        .catch((err) => {
            console.log(err)
        });
}