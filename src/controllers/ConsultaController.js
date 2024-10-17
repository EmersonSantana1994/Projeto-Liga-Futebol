const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const ListarLigasTimesModal = require('../services/ListarLigasTimesModal');
const ConsultaModel = require('../services/ConsultaModel');
const SECRET = 'emesantana'
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

    async buscarConsultaAberta(req, res) {
        let json = { error: '', result: [] };

        let consulta = await ConsultaModel.buscarConsultaAberta();

        json.result = consulta
        return res.json(json.result)
    },

    async buscarRespostas(req, res) {
        let json = { error: '', result: [] };
        
        let consulta = await ConsultaModel.buscarRespostas(req.body.idPacliente);

        json.result = consulta
        return res.json(json.result)
    },
}