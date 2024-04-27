const { async } = require('parse/lib/browser/Storage');
const PlacarModel = require('../services/PlacarModel');
const jwt = require('jsonwebtoken')
const SECRET = 'emesantana'
const axios = require('axios');
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
    async inserir(req, res) {
        let inserir
        let json = { error: '', result: {} };

        let dados = { gols: req.body.gols, nome: req.body.nome }
        let buscarIdJogador = await PlacarModel.buscarJogadorTabela(req.body.nome);
        if (buscarIdJogador.length == 0) {
            return res.status(500).send('Jogador não cadastrado na tebla de jogadores')
        } else {
            let time = await PlacarModel.buscarTimeJogador(buscarIdJogador[0].nome);
            let verificarTime = await PlacarModel.verificarTime(time[0].nome);
            if (verificarTime.length > 0) {
                let maisumgol = verificarTime[0].placar + 1
                inserir = await PlacarModel.atualiza(time[0].nome, maisumgol);
            }else{
                 inserir = await PlacarModel.inserir(time[0].nome, 1);
            }

                json.result = inserir; //se tiver nota ele joga no json
            
            return res.json(json)
        }
    },

    async buscarTodos(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await PlacarModel.buscarTodos();
            json.result = futebol
        return res.json(json.result)
    },

    async limpar(req, res) {
        let json = { error: '', result: {} };
            let inserir1 = await PlacarModel.limpar( );
            if(inserir1){
                    json.result = inserir1; //se tiver nota ele joga no json     
            }
           
            return res.json(json)
    },
}