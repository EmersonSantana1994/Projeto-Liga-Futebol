const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const ListarLigasTimesModal = require('../services/ListarLigasTimesModal');
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
    async buscarTodos(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarLigasTimesModal.buscarTodos();
            json.result = futebol
        return res.json(json.result)
    },

    async buscarTodosTimes(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let dados = { pontos: req.body.pontos, nome: req.body.nome  }
            let futebol = await ListarLigasTimesModal.buscarLiga(req.body.liga);
          let times =  await ListarLigasTimesModal.buscarTimes(futebol[0].id);
            json.result = times
        return res.json(json.result)
    },
}