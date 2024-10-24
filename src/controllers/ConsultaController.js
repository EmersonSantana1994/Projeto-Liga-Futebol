const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const ListarLigasTimesModal = require('../services/ListarLigasTimesModal');
const ConsultaModel = require('../services/ConsultaModel');
const SECRET = 'emesantana'
let cript = false
const express = require('express');
const axios = require('axios');
require('dotenv').config();




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

    async buscarConsultaFechada(req, res) {
        let json = { error: '', result: [] };

        let consulta = await ConsultaModel.buscarConsultaFechada();

        json.result = consulta
        return res.json(json.result)
    },

    async buscarRespostas(req, res) {
        let json = { error: '', result: [] };
        
        let consulta = await ConsultaModel.buscarRespostas(req.body.idPacliente);

        json.result = consulta
        return res.json(json.result)
    },
    async inserirConsulta(req, res) {
        let json = { error: '', result: [] };
        
        let encerrar = await ConsultaModel.encerrarConsulta(req.body.idConsulta);

        let consulta = await ConsultaModel.inserirConsulta(req.body.idPacliente, req.body.idMedico, 
            req.body.anotacao, req.body.dataProcedimento, req.body.dataRetorno);

        json.result = consulta
        return res.json(json.result)
    },
    
    async buscarAnotacao(req, res) {
        let json = { error: '', result: [] };
        
        let consulta = await ConsultaModel.buscarAnotacao(req.body.idPacliente);

        json.result = consulta
        return res.json(json.result)
    },


}