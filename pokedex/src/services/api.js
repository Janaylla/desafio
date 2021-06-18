import axios from 'axios'

export const apiPokedeks= axios.create({
    baseURL: 'http://localhost:3003',
    headers: {
        authorization: window.localStorage.getItem('token')
    }
})

export const apiPokemons = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
})
