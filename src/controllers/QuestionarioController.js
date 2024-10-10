const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const ListarLigasTimesModal = require('../services/ListarLigasTimesModal');
const QuestionarioModel = require('../services/QuestionarioModel');
const SECRET = 'emesantana'
let cript = false

async function verifyJWT(req, res, next) {
    cript = false
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            cript = true
            return 'não autenticado'
        }
        req.userId = decoded.userId;
        // next();
    })

}


module.exports = {
    async salvar(req, res) {
        let json = { error: '', result: [] };
        let result
        let questionarios = req.body.questionario
        let idUsuario = req.body.id_usuario
        let questionarioNome = req.body.questionarioNome

        console.log("rrrrrrrr", questionarioNome)

        let salvarQuest = await QuestionarioModel.salvarQuestionario(questionarioNome,
            idUsuario);



        for (let i = 0; i < questionarios.length; i++) {
            let salvou = await QuestionarioModel.salvar(questionarios[i].title,
                questionarios[i].text, questionarios[i].type, salvarQuest.insertId);
            const options = questionarios[i].options;
            for (let y = 0; y < options.length; y++) {
                result = await QuestionarioModel.salvarPergunta(options[y], salvou.insertId);
            }

        }
        json.result = result
        return res.json(json.result)

    },

    async buscarQuestionario(req, res) {
        let json = { error: '', result: [] };

        let questionarios = await QuestionarioModel.buscarQuestionario();
        
        json.result = questionarios
        return res.json(json.result)
    },

    async buscaPacliente(req, res) {
        let json = { error: '', result: [] };

        let cpf = req.body.cpf
        let rg = req.body.rg
        let nome = req.body.nome

        let busque

        if(cpf && rg && nome){
             busque = await QuestionarioModel.buscarCpfRgNome(cpf, rg, nome);
        }else if(cpf && !rg && !nome){
             busque = await QuestionarioModel.buscarCpf(cpf);
        }else if(!cpf && rg && !nome){
             busque = await QuestionarioModel.buscarRg(rg);
        }else if(!cpf && !rg && nome){
             busque = await QuestionarioModel.buscarNome(nome);
        }
        else if(!cpf && rg && nome){
             busque = await QuestionarioModel.buscarRgNome(rg, nome);
        }else if(cpf && rg && !nome){
             busque = await QuestionarioModel.buscarCpfRg(cpf, rg);
        }else if(cpf && !rg && nome){
             busque = await QuestionarioModel.buscarCpfNome(cpf, nome);
        }else{
            
        }
        
        json.result = busque
        return res.json(json.result)
    },

    async buscarPerguntas(req, res) {
        let json = { error: '', result: [] };
        let idQuestionario = req.body.idQuestionario

        let questoes = await QuestionarioModel.buscarQuestoes(idQuestionario);
        const idsQuestao = questoes.map(item => item.id_questao);
        let perguntas = await QuestionarioModel.buscarPergun(idsQuestao);

        const questionariosComOptions = questoes.map(questionario => {
            // Filtra as perguntas que pertencem ao questionário atual
            const options = perguntas.filter(pergunta => pergunta.id_questao === questionario.id_questao)
                                       .map(pergunta => pergunta.options); // Mapeia para pegar só as opções

            // Retorna um novo objeto com as opções adicionadas
            return { ...questionario, options };
          });
    
console.log("questionariosComOptions", questionariosComOptions)

            json.result = questionariosComOptions
        return res.json(json.result)

    },
}