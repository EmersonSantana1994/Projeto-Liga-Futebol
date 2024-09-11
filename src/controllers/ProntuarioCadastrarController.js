const { async } = require('parse/lib/browser/Storage');
const CadastrarModel = require('../services/CadastrarModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const PontosTorneioModal = require('../services/PontosTorneioModal');
const ProntuarioCadastrarService = require('../services/ProntuarioCadastrarService');
const SECRET = 'emesantana'
let cript = false


async function verifyJWT(req, res, next){
    cript = false
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err){
            cript = true
            return 'não autenticado'
        } 
        req.userId = decoded.userId;
        // next();
    })
}

module.exports = {

    async buscar(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        
        let todos = await ProntuarioCadastrarService.buscar(req.body.nome);
            json.result = todos
        return res.json(json.result)
    },

    async buscarUsuario(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        
        let todos = await ProntuarioCadastrarService.buscarUsuario(req.body.id);
            json.result = todos
        return res.json(json.result)
    },
}