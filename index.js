const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

const port = 3000;

let listaJogos = [
  {
    nome: "The Witcher 3: Wild Hunt",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png",
    genero: "RPG",
    nota: 10,
    jogado: true
  },
  {
    nome: "Fortnite",
    imagem: "https://image.api.playstation.com/vulcan/img/rnd/202109/1303/kaXldqXxbIyvX9Kn8eeFckQJ.png",
    genero: "Battle royale",
    nota: 8,
    jogado: true
  },
  {
    nome: "Red Dead Redemption 2",
    imagem: "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png",
    genero: "Ação",
    nota: 9,
    jogado: false
  }
];

app.get("/jogos", (req, res) => {
  res.send(listaJogos);
});

app.get("/jogos/:id", (req, res) => {
  const id = req.params.id -1 ;
  res.send(listaJogos[id]);
});

app.post("/jogos/add", (req, res) => {
  const jogo = req.body;
  listaJogos.push(jogo);
  res.status(201).send({
    message: `Jogo ${jogo.nome} cadastrado com sucesso!`,
    data: jogo
  });
});

app.put("/jogos/edit/:id", (req, res) => {
  const jogoEdit = req.body;
  const id = req.params.id -1 ;
  
  listaJogos[id] = {
    ...listaJogos[id],
    ...jogoEdit
  }

  res.send({
    message: `O jogo ${listaJogos[id].nome} foi atualizado com sucesso!`,
    data: listaJogos[id]
  });
});

app.delete("/jogos/delete/:id", (req, res) => {
  const id = req.params.id -1 ;
  const jogo = listaJogos[id];
  
  listaJogos.splice(id, 1);
  res.send({
    message: `O jogo ${jogo.nome} foi excluido com sucesso! `
  });
});

app.listen(port, () => {
  console.log(`O app está rodando em: http://localhost:${port}`);
});


