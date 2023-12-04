const express = require('express');
const router = express.Router();
const app = express()

module.exports = router;

const LoginController = require('./controllers/LoginControllers');
const ArtilheiroControler = require('./controllers/ArtilheiroControler');
const TorneioController = require('./controllers/TorneioController');
const RanckingJogadoresController = require('./controllers/RanckingJogadoresController');
const RankingMundialClubesController = require('./controllers/RankingMundialClubesController');


router.use(
    express.urlencoded({
        extended:true,
    })
)

router.use(express.json())

//Login
router.post('/buscarTodos', LoginController.buscarTodos);
router.post('/loginBuscarUm', LoginController.buscarUm); 
router.post('usuarios/cadastrar', LoginController.cadastrar); 
router.post('/usuarios/logar', LoginController.login);
router.post('/usuarios/logar', LoginController.login);

//Artilheiro
router.post('/artilheiro/nome', ArtilheiroControler.buscarTodos);
router.post('/artilheiro/inserir', ArtilheiroControler.inserirPontos);
router.put('/artilheiro/atualiza', ArtilheiroControler.atualizaPontos);
router.post('/artilheiro/delete', ArtilheiroControler.deleteJogador);

//Torneio
router.post('/torneio/buscar', TorneioController.buscarTodos);
router.post('/torneio/deletarTimeSorteado', TorneioController.deleteTimeSorteado);
router.post('/torneio/cadastrarTime', TorneioController.cadastrarTime);
router.post('/torneio/bucarNome', TorneioController.bucarNome);
router.post('/torneio/buscarTimeSorteado', TorneioController.bucarTimeSorteados);
router.put('/torneio/atualizaTime', TorneioController.atualizaTime);
router.put('/torneio/atualizaTimeSorteado', TorneioController.atualizaTimeSorteado);
router.post('/torneio/cadastrarTimeSorteado', TorneioController.cadastrarTimeSorteado);
router.post('/torneio/salvarPlacar', TorneioController.salvarPlacar);
router.post('/torneio/buscarPlacar', TorneioController.buscarPlacar);
router.post('/torneio/buscarPlacares', TorneioController.buscarPlacares);

//RankingJogadores
router.post('/rankingJogadores/encontrar/nome', RanckingJogadoresController.buscarNome);
router.post('/rankingJogadores/buscar', RanckingJogadoresController.buscarTodos);
router.post('/rankingJogadores/inserir', RanckingJogadoresController.inserirPontos);
router.put('/rankingJogadores/atualiza', RanckingJogadoresController.atualizaPontos);

//RankingMundialClubes
router.post('/ranking/encontrar/nome', RankingMundialClubesController.buscarNome);
router.post('/ranking/buscar', RankingMundialClubesController.buscarTodos);
router.post('/ranking/inserir', RankingMundialClubesController.inserirPontos);
router.put('/ranking/atualiza', RankingMundialClubesController.atualizaPontos);

//FileFire



module.exports = router;