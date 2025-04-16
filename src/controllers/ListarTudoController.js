const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const ListarTimesJogadoresModal = require('../services/ListarTudoModal');
const SECRET = 'emesantana'
const neo4j = require('neo4j-driver');
// const uri = 'bolt://localhost:7687'; // URI padrão do Neo4j

const neo4jDriver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));

// const neo4jDriver = neo4j.driver('bolt://10.6.12.51:7687', neo4j.auth.basic('neo4j', '123mudar'));


function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err){return res.status(500).send('sem autenticacao');} 
        req.userId = decoded.userId;
        // next();
    })
    
    }

module.exports = {
    async listarTudo(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.listarTudo();
// console.log("futebol", futebol[0].id)

        // const neo4jQuery = `CREATE (n:TesteEmerson {id: ${futebol[0].id}, nome: '${futebol[0].Jogador}', time: '${futebol[0].Time}' })`;
    //     const neo4jQuery = `CREATE (n:TesteEmerson {id: 1, nome: 'Emerson', empresa: 'Matarazzo' })`;
    //     const neo4jSession = neo4jDriver.session();
    //     neo4jSession
    // .run(neo4jQuery)
    // .then(result => {
    //   console.log('Dados importados para Neo4j com sucesso');
    //   // Execução de queries adicionais ou visualização de dados
    // })
    // .catch(error => {
    //   console.error('Erro ao importar dados para Neo4j', error);
    // })
    // .finally(() => {
    //   neo4jSession.close();
    //   neo4jDriver.close();
    // });
            json.result = futebol
        return res.json(json.result)
    },

    async golsPais(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.golsPais();
            json.result = futebol
        return res.json(json.result)
    },

    async golsLiga(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.golsLiga();
            json.result = futebol
        return res.json(json.result)
    },

    async golsTime(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.golsTime();
            json.result = futebol
        return res.json(json.result)
    },
    async golsPosicao(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.golsPosicao();
            json.result = futebol
        return res.json(json.result)
    },


    async assistenciasPais(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.assistenciasPais();
            json.result = futebol
        return res.json(json.result)
    },

    async assistenciasLiga(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.assistenciasLiga();
            json.result = futebol
        return res.json(json.result)
    },

    async assistenciasTime(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.assistenciasTime();
            json.result = futebol
        return res.json(json.result)
    },
    async assistenciasPosicao(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.assistenciasPosicao();
            json.result = futebol
        return res.json(json.result)
    },


    async listarDono(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.listarDono();
            json.result = futebol
        return res.json(json.result)
    },

    async pesquisar(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol
        if(req.body.tipo == "jogador"){
            futebol = await ListarTimesJogadoresModal.jogador(req.body.pesquisa);
        }else if(req.body.tipo == "gols"){
            futebol = await ListarTimesJogadoresModal.gols(req.body.pesquisa);
        }
        else if(req.body.tipo == "liga"){
            futebol = await ListarTimesJogadoresModal.liga(req.body.pesquisa);
        }
        else if(req.body.tipo == "nacionalidade"){
            futebol = await ListarTimesJogadoresModal.nacionalidade(req.body.pesquisa);
        }
        else if(req.body.tipo == "posicao"){
            futebol = await ListarTimesJogadoresModal.posicao(req.body.pesquisa);
        }
        else if(req.body.tipo == "time"){
            futebol = await ListarTimesJogadoresModal.time(req.body.pesquisa);
        }
        
       
            json.result = futebol
        return res.json(json.result)
    },
}