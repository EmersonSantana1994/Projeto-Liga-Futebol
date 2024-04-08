const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const ListarLigasTimesModal = require('../services/ListarLigasTimesModal');
const CriarTabelasModal = require('../services/CriarTabelasModal');
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
    async criarTabelas(req, res) {
        let json = { error: '', result: [] };
        await CriarTabelasModal.artilheiro();
        await CriarTabelasModal.ranking_clubes();
        await CriarTabelasModal.ranking_jogadores();
        await CriarTabelasModal.resultados();
        await CriarTabelasModal.tb_usuario();
        await CriarTabelasModal.times_sorteados();
        await CriarTabelasModal.torneio();
        await CriarTabelasModal.users();
        await CriarTabelasModal.ligas();
        await CriarTabelasModal.times_tb();
        await CriarTabelasModal.jogadores();
        await CriarTabelasModal.pontos_troneio();
        return res.json(json.result)
    },
}