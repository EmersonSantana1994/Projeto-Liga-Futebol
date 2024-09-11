const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const HealfModal = require('../services/HealfModal');
const ProntuarioModel = require('../services/ProntuarioModel');
const SECRET = 'emesantana'
let cript = false
const neo4j = require('neo4j-driver');
const neo4jDriver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));
const RollBack = require('../services/RollBack');

module.exports = {

    async listar(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ProntuarioModel.listar(req.body.idUsuario);
        json.result = futebol
        return res.json(json.result)
    },
    async listar2(req, res) {

        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ProntuarioModel.listar2(req.body.id);
        json.result = futebol
        return res.json(json.result)
    },

    async listarUser(req, res) {
        const pagina = req.body.pagina; // Página a ser recuperada
        const itensPorPagina = req.body.itensPorPagina || 30; // Quantidade de itens por página
        const offset = (pagina - 1) * itensPorPagina;
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ProntuarioModel.listarUser(offset, itensPorPagina);
        json.result = futebol
        return res.json(json.result)
    },

    async listarUserContagem(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ProntuarioModel.listarUserContagem();
        json.result = futebol
        return res.json(json.result)
    },

    async adicionar(req, res) {

        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ProntuarioModel.adicionar(req.body.descricao, req.body.data, req.body.anotacao, req.body.id_usuario, req.body.tipo_arquivo,);
        json.result = futebol
        return res.json(json.result)
    },

    async editar(req, res) {

        let json = { error: '', result: [] };
        let futebol = await ProntuarioModel.editar(req.body.descricao, req.body.data, req.body.anotacao, req.body.tipo_arquivo, req.body.id_prontuario );
        json.result = futebol
        return res.json(json.result)
    },

    async pesquisar(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let pesquisa

        pesquisa = await ProntuarioModel.pesquisar(req.body.pesquisa);
        json.result = pesquisa
        return res.json(json.result)
    },

    async pesquisarProntuario(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let pesquisa

        pesquisa = await ProntuarioModel.pesquisarProntuario(req.body.pesquisa);
        json.result = pesquisa
        return res.json(json.result)
    },

    async adicionar2(req, res) {

        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await ProntuarioModel.adicionar2(req.body.nome, req.body.id);
        json.result = futebol
        return res.json(json.result)
    },

}
