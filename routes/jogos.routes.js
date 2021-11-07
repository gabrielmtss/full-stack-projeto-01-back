const express = require('express');
const router = express.Router();

let listaJogos = [
  {
    id: Date.now(),
    titulo: "The Witcher 3: Wild Hunt",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png",
    genero: "RPG",
    nota: 10,
    jogado: true
  },
  { 
    id: Date.now(),
    titulo: "Fortnite",
    imagem: "https://image.api.playstation.com/vulcan/img/rnd/202109/1303/kaXldqXxbIyvX9Kn8eeFckQJ.png",
    genero: "Battle royale",
    nota: 8,
    jogado: true
  },
  { 
    id: Date.now(),
    titulo: "Red Dead Redemption 2",
    imagem: "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png",
    genero: "Ação",
    nota: 9,
    jogado: false
  }
];

router.get("/", (req, res) => {
  res.send(listaJogos);
});

router.get("/:id", (req, res) => {
  const idParam = req.params.id;
  const jogo = listaJogos.find(jogo => jogo.id == idParam);
  res.send(jogo);
});

router.post("/add", (req, res) => {
  const jogo = req.body;
  jogo.id = Date.now();
  listaJogos.push(jogo);
  res.status(201).send({
    message: `Jogo ${jogo.titulo} cadastrado com sucesso!`,
    data: jogo
  });
});

router.put("/edit/:id", (req, res) => {
  const jogoEdit = req.body;
  const idParam = req.params.id;
  
  let index = listaJogos.findIndex(jogo => jogo.id == idParam);

  listaJogos[index] = {
    ...listaJogos[index],
    ...jogoEdit
  }

  res.send({
    message: `O jogo ${listaJogos[index].titulo} foi atualizado com sucesso!`,
    data: listaJogos[id]
  });
});

router.delete("/delete/:id", (req, res) => {
  const idParam = req.params.id;

  const index = listaJogos.findIndex(jogo => jogo.id == idParam);

  const nome = listaJogos[index];

  listaJogos.splice(index, 1);
  res.send({
    message: `O jogo ${nome.titulo} foi excluido com sucesso! `
  });
});

module.exports = router;