const { async } = require('parse/lib/browser/Storage');
const AgendarConsultaModal = require('../services/AgendarConsultaModal');
const jwt = require('jsonwebtoken')
const SECRET = 'emesantana'
const axios = require('axios');
let cript = false;
const RollBack = require('../services/RollBack');
const { atualiza } = require('../services/PlacarModel');

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
    async buscarEspecialidade(req, res) {
        let inserir
        let json = { error: '', result: {} };


        inserir = await AgendarConsultaModal.buscarEspecialidade(req.body.especialidade);


        json.result = inserir; //se tiver nota ele joga no json

        return res.json(json.result)

    },
    async buscarDia(req, res) {
        let inserir
        let json = { error: '', result: {} };


        inserir = await AgendarConsultaModal.buscarDia(req.body.idEspecialidade);


        json.result = inserir; //se tiver nota ele joga no json

        return res.json(json.result)

    },

    async buscarMedico(req, res) {
        let inserir
        let json = { error: '', result: {} };


        inserir = await AgendarConsultaModal.buscarMedico(req.body.idEvento);


        json.result = inserir; //se tiver nota ele joga no json

        return res.json(json.result)

    },

}