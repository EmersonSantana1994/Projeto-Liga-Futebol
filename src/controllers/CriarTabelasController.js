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
        await CriarTabelasModal.artilheiro();
        await CriarTabelasModal.artilheiroTorneio();
        await CriarTabelasModal.placares_copa();
        await CriarTabelasModal.times_copa();
        await CriarTabelasModal.placar_jogo();
        await CriarTabelasModal.ranking_titulos();
        await CriarTabelasModal.assistencia();
        await CriarTabelasModal.assistenciaTorneio();
     let verifica =   await CriarTabelasModal.verificarResultados();
     if(verifica.length == 0 ){
        await CriarTabelasModal.salvarIdResultados();
     }
     let verificaCopa =   await CriarTabelasModal.verificarResultadosCopa();
     if(verificaCopa.length == 0 ){
        await CriarTabelasModal.salvarIdResultadosCopa();
     }
       
        // let verificarSeTemSemLiga = await CriarTabelasModal.verificarSeTemSemLiga();
        // console.log("rrrrrrr", verificarSeTemSemLiga.length)
        // if(verificarSeTemSemLiga.length == 0 ){
        //     await CriarTabelasModal.semLiga();    
        //     let buscarId = await CriarTabelasModal.buscarIdsemLiga();
        //     await CriarTabelasModal.semTime(buscarId[0]);
        // }
        return res.json(json.result)
    },
}