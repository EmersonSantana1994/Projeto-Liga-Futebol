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