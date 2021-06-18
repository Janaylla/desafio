import express, { Request, Response, Express } from 'express'
import cors from 'cors'
import { AddressInfo } from "net";
import { user } from './types'
import { generateToken, getData } from './generateToken';
const app: Express = express();
let users:user[] = [];

function updateUsers(){
    let fs = require('fs');
    fs.readFile('./src/users.json', function readFileCallback(err:any, data:any) {
        if (err) {
            console.log(err);
        } else {
            users = JSON.parse(data);
        }
    });
}
updateUsers()
function updateArrayUsers(users: user[]): void {
    // // criando uma requisição para o módulo filesystem
    let fs = require('fs');

    fs.writeFile ("./src/users.json", JSON.stringify(users), function(err:any) {
        if (err) throw err;
        console.log('complete');
        }
    );
}

app.use(express.json());
app.use(cors());

app.post(("/singup"), (req: Request, res: Response) => {
    updateUsers()
    const {userName, password} = req.body;
    if(!userName || !password){
        res.status(400).send("Error")
    }
    const index = users.findIndex((user:user) => {
        return user.userName === userName;
    })
    if(index != -1){
        res.status(400).send("Error")
    }
    users.push({
        userName, password, pokedex:[]
    })
    const token = generateToken({userName})
    updateArrayUsers(users)
    res.status(200).send({token})
})

app.post(("/login"), (req: Request, res: Response) => {
    updateUsers()
    const {userName, password} = req.body;
    if(!userName || !password){
        res.status(400).send("Error")
    }
    const index = users.findIndex((user:user) => {
        return user.userName === userName;
    })
    if(index === -1){
        res.status(400).send("Error")
    }
    users.push({
        userName, password, pokedex:[]
    })
    const token = generateToken({userName: users[index].userName})
    res.status(200).send({token})
})
app.get("/existsPokedex/:pokemon", (req: Request, res: Response) => {
    updateUsers()
    const token  = req.headers.authorization;
    if(typeof(token) !== "string"){
        res.status(400).send("Error")
    }
    const {userName} = getData(token as string);

    const pokemon = req.params.pokemon;
   if(!userName || !pokemon){
       res.status(400).send("Error")
   }
   const index = users.findIndex((user:user) => {
       return user.userName === userName;
   })
   if(index === -1){
       res.status(400).send("Error")
   }
   const indexPokemon = users[index].pokedex.findIndex((poke) => {
       return poke === pokemon;
   })
   res.status(200).send({exist: indexPokemon !== -1})
})

app.get("/pokedex", (req: Request, res: Response) => {
    updateUsers()
    const token  = req.headers.authorization;
    if(typeof(token) !== "string"){
        res.status(400).send("Error")
    }
    console.log("oii")
    const {userName} = getData(token as string);
    if(!userName){
        res.status(400).send("Error")
    }
    const index = users.findIndex((user:user) => {
        return user.userName === userName;
    })
    console.log("oii")
    if(index === -1){
        res.status(400).send("Error")
    }
    console.log("oii")
    res.status(200).send({pokemons: users[index].pokedex})
})


app.put("/pokedex/:pokemon", (req: Request, res: Response) => {
    updateUsers()
    const token  = req.headers.authorization;
    if(typeof(token) !== "string"){
        res.status(400).send("Error")
    }
    const {userName} = getData(token as string);

     const pokemon = req.params.pokemon;
    if(!userName || !pokemon){
        res.status(400).send("Error")
    }
    const index = users.findIndex((user:user) => {
        return user.userName === userName;
    })
    if(index === -1){
        res.status(400).send("Error")
    }
    const indexPokemon = users[index].pokedex.findIndex((poke) => {
        return poke === pokemon;
    })
    if(indexPokemon != -1){
        users[index].pokedex.splice(indexPokemon, 1)
        updateArrayUsers(users)
        res.status(200).send("Pokemon removido")
    }
    else{ 
        users[index].pokedex.push(pokemon)
        updateArrayUsers(users)
        res.status(200).send("Pokemon adicionado")
    }    
   
})


// Para testar se o servidor está tratando os endpoints corretamente
app.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("pong!")
})

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});

