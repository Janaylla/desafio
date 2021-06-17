import express, { Request, Response, Express } from 'express'
import cors from 'cors'
import { AddressInfo } from "net";
import { user } from './types'

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

app.put(("/user"), (req: Request, res: Response) => {
    const {userName, password} = req.body;
    if(!userName && password){
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
    updateArrayUsers(users)
    res.status(200).send(`Create user: ${users[users.length-1].userName}`)

})
app.get("/existsPokedex/:userName/:pokemon", (req: Request, res: Response) => {
    const userName = req.params.userName;
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

app.get("/pokedex/:userName", (req: Request, res: Response) => {
    const userName = req.params.userName;
    if(!userName){
        res.status(400).send("Error")
    }
    const index = users.findIndex((user:user) => {
        return user.userName === userName;
    })
    if(index === -1){
        res.status(400).send("Error")
    }
   
    res.status(200).send({pokemons: users[index].pokedex})
})


app.put("/pokedex/:userName/:pokemon", (req: Request, res: Response) => {
    const userName = req.params.userName;
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
        updateArrayUsers(users)
        users[index].pokedex.splice(indexPokemon, 1)
        res.status(200).send("Pokemon removido")
    }
    else{ users[index].pokedex.push(pokemon)
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

