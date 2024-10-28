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
const CopaCotroller = require('./controllers/CopaController');
const PlacarController = require('./controllers/PlacarController');
const HealfControlle = require('./controllers/HealfController');
const ProntuarioController = require('./controllers/ProntuarioController');
const TituloController = require('./controllers/TituloController');
const ProntuarioCadastrarController = require('./controllers/ProntuarioCadastrarController');
const AgendamentoController = require('./controllers/AgendamentoController');
const QuestionarioController = require('./controllers/QuestionarioController');
const ConsultaController = require('./controllers/ConsultaController');
const AgendarConsultaControlle = require('./controllers/AgendarConsultaController');

router.use(
    express.urlencoded({
        extended:true,
    })
)

router.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }))

//Login
router.post('/buscarTodos', LoginController.buscarTodos);
router.post('/loginBuscarUm', LoginController.buscarUm); 
router.post('/usuarios/cadastrar', LoginController.cadastrar); 
router.post('/usuarios/logar', LoginController.login);
router.post('/usuarios/logar', LoginController.login);

//Artilheiro
router.post('/artilheiro/nome', ArtilheiroControler.buscarJogador);
router.post('/artilheiro/buscar', ArtilheiroControler.buscarTodos);
router.post('/artilheiro/buscar/torneio', ArtilheiroControler.buscarTodosTorneio);
router.post('/artilheiro/inserir', ArtilheiroControler.inserirPontos);
router.put('/artilheiro/atualiza', ArtilheiroControler.atualizaPontos);
router.post('/artilheiro/delete', ArtilheiroControler.deleteJogador);
router.post('/artilheiro/delete/torneio', ArtilheiroControler.deleteJogadorTorneio);

//Torneio
router.post('/torneio/buscar', TorneioController.buscarTodos);
router.post('/torneio/deletarTimeSorteado', TorneioController.deleteTimeSorteado);
router.post('/torneio/cadastrarTime', TorneioController.cadastrarTime);
router.post('/torneio/bucarNome', TorneioController.bucarNome);
router.post('/torneio/verificar', TorneioController.verificar);
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
router.post('/dono/alterar', TransferenciaController.alterarDono );

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
router.post('/inserir/imagem', CadastrarController.inserirImagem );   
router.post('/buscar/imagem', CadastrarController.buscarImagem );    

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
router.post('/tabela/pesquisar', ListarTudoController.pesquisar );
router.post('/listar/gols_pais', ListarTudoController.golsPais );
router.post('/listar/gols_liga', ListarTudoController.golsLiga );
router.post('/listar/gols_time', ListarTudoController.golsTime );
router.post('/listar/gols_posicao', ListarTudoController.golsPosicao );
router.post('/listar/listar_dono', ListarTudoController.listarDono );

//Pontos de torneio
router.post('/pontos_torneio/listar_torneio', PontosTorneioController.listar_torneio );
router.post('/pontos_torneio/criar_torneio', PontosTorneioController.criar_torneio );
router.post('/pontos_torneio/alterar_nome_pontos', PontosTorneioController.alterar_nome_pontos );
router.post('/pontos_torneio/alterar_nome', PontosTorneioController.alterar_nome );
router.post('/pontos_torneio/alterar_pontos', PontosTorneioController.alterar_pontos );
router.post('/pontos_torneio/deletar', PontosTorneioController.deletar );

//Copa
router.post('/copa/bucartodos', CopaCotroller.buscarTodos );
router.post('/copa/bucartodos_placar', CopaCotroller.buscarTodosPlacares );
router.post('/copa/cadastrarTime', CopaCotroller.cadastrarTime );
router.post('/copa/cadastrar_placar', CopaCotroller.cadastrar_placar );
router.post('/copa/limpar', CopaCotroller.limpar );

//Placar
router.post('/placar/inserir', PlacarController.inserir );
router.post('/placar/bucartodos', PlacarController.buscarTodos );
router.post('/placar/limpar', PlacarController.limpar );
router.post('/placar/email', PlacarController.email );

//TitulosJogadoresTorneio
router.post('/titulo/inserir', TituloController.adicionar );
router.post('/titulo/bucartodos', TituloController.listar );
// router.post('/titulo/limpar', TituloController.limpar );



//Autenticar
router.post('/autenticacao/autenticar', AutenticarController.autenticar );

//teste
router.post('/teste/select', AutenticarController.select );

//healf
router.post('/teste/healf', HealfControlle.questionario );

//Agendamento
router.post('/agenda/getConsultorio', AgendamentoController.getConsultorio );
router.post('/agenda/reservarAgendaMedica', AgendamentoController.reservarAgendaMedica );
router.post('/agenda/buscartudo', AgendamentoController.buscartudo );
router.post('/agenda/repetir', AgendamentoController.repetir );
router.post('/agenda/especialidade', AgendamentoController.especialidade );
router.post('/agenda/atualiza', AgendamentoController.atualiza );
router.post('/agenda/deletar', AgendamentoController.deletar );
router.post('/agenda/deletarAllEvento', AgendamentoController.deletarAllEvento );

//prontuario
router.post('/prontuario/listarUser', ProntuarioController.listarUser );
router.post('/prontuario/listarUserContagem', ProntuarioController.listarUserContagem );
router.post('/prontuario/listar', ProntuarioController.listar );
router.post('/prontuario/listar2', ProntuarioController.listar2 );
router.post('/prontuario/adicionar', ProntuarioController.adicionar );
router.post('/prontuario/editar', ProntuarioController.editar );
router.post('/tabela/busque', ProntuarioController.pesquisar );
router.post('/tabela/busqueProntuario', ProntuarioController.pesquisarProntuario );
module.exports = router;

//BusqueUsuario
router.post('/cadastro/busque', ProntuarioCadastrarController.buscar );
router.post('/cadastro/buscarUsuario', ProntuarioCadastrarController.buscarUsuario );

//Questionario
router.post('/quationario/salvar', QuestionarioController.salvar );
router.post('/quationario/buscarQuestionario', QuestionarioController.buscarQuestionario );
router.post('/quationario/buscarPerguntas', QuestionarioController.buscarPerguntas );
router.post('/quationario/pacliente', QuestionarioController.buscaPacliente );
router.post('/quationario/respostas', QuestionarioController.respostas );


//Consulta
router.post('/consulta/buscarConsultaAberta', ConsultaController.buscarConsultaAberta );
router.post('/consulta/buscarConsultaFechada', ConsultaController.buscarConsultaFechada );
router.post('/consulta/buscarRespostas', ConsultaController.buscarRespostas );
router.post('/consulta/inserirConsulta', ConsultaController.inserirConsulta );
router.post('/consulta/buscarAnotacao', ConsultaController.buscarAnotacao );

//Agendar Consulta
router.post('/consultarAgenda/especialidade', AgendarConsultaControlle.buscarEspecialidade );
router.post('/consultarAgenda/buscarDia', AgendarConsultaControlle.buscarDia );
router.post('/consultarAgenda/buscarMedico', AgendarConsultaControlle.buscarMedico );
router.post('/consultarAgenda/inserirAgendamentoPacliente', AgendarConsultaControlle.inserirAgendamentoPacliente );
// router.post('/consultarAgenda/buscarConsultas', AgendarConsultaControlle.buscarValidarAgendamento );
