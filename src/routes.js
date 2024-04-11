const express = require('express');
const router = express.Router();
const app = express()

module.exports = router;

const LoginController = require('./controllers/LoginControllers');
const ArtilheiroControler = require('./controllers/ArtilheiroControler');
const TorneioController = require('./controllers/TorneioController');
const RanckingJogadoresController = require('./controllers/RanckingJogadoresController');
const RankingMundialClubesController = require('./controllers/RankingMundialClubesController');
const TransferenciaController = require('./controllers/TransferenciaController');
const CadastrarController = require('./controllers/CadastrarController');
const ListarLigasTimesController = require('./controllers/ListarLigasTimesController');
const CriarTabelasController = require('./controllers/CriarTabelasController');
const ListarTimesJogadoresController = require('./controllers/ListarTimesJogadoresController');
const PontosTorneioController = require('./controllers/PontosTorneioController');
const AutenticarController = require('./controllers/AutenticarController');
const ListarTudoController = require('./controllers/ListarTudoController');

router.use(
    express.urlencoded({
        extended:true,
    })
)

router.use(express.json())

//Login
router.post('/buscarTodos', LoginController.buscarTodos);
router.post('/loginBuscarUm', LoginController.buscarUm); 
router.post('/usuarios/cadastrar', LoginController.cadastrar); 
router.post('/usuarios/logar', LoginController.login);
router.post('/usuarios/logar', LoginController.login);

//Artilheiro
router.post('/artilheiro/nome', ArtilheiroControler.buscarJogador);
router.post('/artilheiro/buscar', ArtilheiroControler.buscarTodos);
router.post('/artilheiro/inserir', ArtilheiroControler.inserirPontos);
router.put('/artilheiro/atualiza', ArtilheiroControler.atualizaPontos);
router.post('/artilheiro/delete', ArtilheiroControler.deleteJogador);

//Torneio
router.post('/torneio/buscar', TorneioController.buscarTodos);
router.post('/torneio/deletarTimeSorteado', TorneioController.deleteTimeSorteado);
router.post('/torneio/cadastrarTime', TorneioController.cadastrarTime);
router.post('/torneio/bucarNome', TorneioController.bucarNome);
router.post('/torneio/buscarTimeSorteado', TorneioController.bucarTimeSorteados);
router.post('/torneio/bucarTimeSorteados', TorneioController.timeSorteado);
router.put('/torneio/atualizaTime', TorneioController.atualizaTime);
router.put('/torneio/atualizaTimeSorteado', TorneioController.atualizaTimeSorteado);
router.post('/torneio/cadastrarTimeSorteado', TorneioController.cadastrarTimeSorteado);
router.post('/torneio/salvarPlacar', TorneioController.salvarPlacar);
router.post('/torneio/buscarPlacar', TorneioController.buscarPlacar);
router.post('/torneio/buscarPlacares', TorneioController.buscarPlacares);
router.post('/torneio/deletarPlacar', TorneioController.deletarPlacar);
router.post('/torneio/deletar', TorneioController.deletar);

//RankingJogadores
router.post('/rankingJogadores/encontrar/nome', RanckingJogadoresController.buscarNome);
router.post('/rankingJogadores/buscar', RanckingJogadoresController.buscarTodos);
router.post('/rankingJogadores/inserir', RanckingJogadoresController.inserirPontos);
router.put('/rankingJogadores/atualiza', RanckingJogadoresController.atualizaPontos);
router.post('/rankingJogadores/deletar', RanckingJogadoresController.deletar);

//RankingMundialClubes
router.post('/ranking/encontrar/nome', RankingMundialClubesController.buscarNome);
router.post('/ranking/buscar', RankingMundialClubesController.buscarTodos);
router.post('/ranking/inserir', RankingMundialClubesController.inserirPontos);
router.put('/ranking/atualiza', RankingMundialClubesController.atualizaPontos);
router.post('/ranking/deletar', RankingMundialClubesController.deletar);

//Transferencia
router.post('/transferencia/jogador', TransferenciaController.tranferirJogador );
router.post('/transferencia/jogadorComprado', TransferenciaController.tranferirJogadorComprado );
router.post('/transferencia/bucarTimeAtualizado', TransferenciaController.bucarTimeAtualizado );

//Cadastrar
router.post('/cadastrar/time', CadastrarController.cadastrarTime );
router.post('/cadastrar/jogador', CadastrarController.cadastrarJogador );
router.post('/cadastrar/alterarNome', CadastrarController.alterarNome );
router.post('/cadastrar/deletarNome', CadastrarController.deletarNome );
router.post('/cadastrar/alterarNomeTime', CadastrarController.alterarNomeTime );
router.post('/cadastrar/deletarNomeTime', CadastrarController.deletarNomeTime );
router.post('/cadastrar/alterarNomeLiga', CadastrarController.alterarNomeLiga );
router.post('/cadastrar/deletarNomeLiga', CadastrarController.deletarNomeLiga );
router.post('/cadastrar/pesquisar', CadastrarController.pesquisarTime );

//Listar Times e Ligas
router.post('/listar/ligas', ListarLigasTimesController.buscarTodos );
router.post('/listar/times', ListarLigasTimesController.buscarTodosTimes );

//Listar Times e jogadores
router.post('/listar/time', ListarTimesJogadoresController.buscarTodos );
router.post('/listar/jogadores', ListarTimesJogadoresController.buscarTodosTimes );

//Criar tabelas
router.post('/criar/tabelas', CriarTabelasController.criarTabelas );

//Listar tudo
router.post('/listar/todos', ListarTudoController.listarTudo );

//Pontos de torneio
router.post('/pontos_torneio/listar_torneio', PontosTorneioController.listar_torneio );
router.post('/pontos_torneio/criar_torneio', PontosTorneioController.criar_torneio );
router.post('/pontos_torneio/alterar_nome_pontos', PontosTorneioController.alterar_nome_pontos );
router.post('/pontos_torneio/alterar_nome', PontosTorneioController.alterar_nome );
router.post('/pontos_torneio/alterar_pontos', PontosTorneioController.alterar_pontos );
router.post('/pontos_torneio/deletar', PontosTorneioController.deletar );

//Autenticar
router.post('/autenticacao/autenticar', AutenticarController.autenticar );
module.exports = router;