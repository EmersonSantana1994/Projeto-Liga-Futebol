const { async } = require('parse/lib/browser/Storage');
const CadastrarModel = require('../services/CadastrarModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const PontosTorneioModal = require('../services/PontosTorneioModal');
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

    async listar_torneio(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let todosTorneios = await PontosTorneioModal.listar_torneio();
            json.result = todosTorneios
        return res.json(json.result)
    },

    async criar_torneio(req, res, next) {
        let cadastrarLiga
        //   let autenticar = verifyJWT(req, res)
        //   if(autenticar){
        //   return  res.status(500).send("sem autenticar")
        //   }

        let json = { error: '', result: [] };
        let seExisteLiga = await PontosTorneioModal.seExisteTorneio(req.body.nome);
        if (seExisteLiga[0] == undefined || seExisteLiga[0] == "undefined") {
            cadastrarLiga = await PontosTorneioModal.cadastrarTorneio(req.body.nome, req.body.pontos);
        } else { return res.status(500).send('Torneio já existe') }
        return res.json(json)
    },
    
    async alterar_nome_pontos(req, res, next) {
        let json = { error: '', result: [] };

        await PontosTorneioModal.alterar_nome_pontos(req.body.id, req.body.nome, req.body.pontos);
        return res.json(json)
    },
    async alterar_nome(req, res, next) {
        let json = { error: '', result: [] };

        await PontosTorneioModal.alterar_nome(req.body.id, req.body.nome);
        return res.json(json)
    },
    async alterar_pontos(req, res, next) {
        let json = { error: '', result: [] };

        await PontosTorneioModal.alterar_pontos(req.body.id, req.body.pontos);
        return res.json(json)
    },

    async deletar(req, res, next) {
        let json = { error: '', result: [] };

        await PontosTorneioModal.deletar(req.body.id);
        return res.json(json)
    },
}