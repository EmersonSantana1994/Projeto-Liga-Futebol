const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const ListarTimesJogadoresModal = require('../services/ListarTimesJogadoresModal');
const SECRET = 'emesantana'

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err){return res.status(500).send('sem autenticacao');} 
        req.userId = decoded.userId;
        // next();
    })
    
    }

module.exports = {

    async buscarTime(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.buscarTime(req.body.nome);
            json.result = futebol
        return res.json(json.result)
    },

    async buscarTodos(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.buscarTodos();
            json.result = futebol
        return res.json(json.result)
    },

    async buscarTodosTimes(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let dados = { pontos: req.body.pontos, nome: req.body.nome  }
            let futebol = await ListarTimesJogadoresModal.buscarTime(req.body.time);
          let jogadores =  await ListarTimesJogadoresModal.buscarJogadores(futebol[0].id_time);
            json.result = jogadores
        return res.json(json.result)
    },
}