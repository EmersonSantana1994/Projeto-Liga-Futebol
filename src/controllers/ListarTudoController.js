const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const ListarTimesJogadoresModal = require('../services/ListarTudoModal');
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
    async listarTudo(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ListarTimesJogadoresModal.listarTudo();
            json.result = futebol
        return res.json(json.result)
    },
}