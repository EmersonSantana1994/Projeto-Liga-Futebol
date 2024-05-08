const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const CopaModal = require('../services/CopaModel');
const SECRET = 'emesantana'
let cript = false


module.exports = {

    async buscarTodos(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await CopaModal.buscarTodos();
            json.result = futebol
        return res.json(json.result)
    },

    async buscarTodosPlacares(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await CopaModal.buscarTodosPlacares();
            json.result = futebol
        return res.json(json.result)
    },

    async cadastrarTime(req, res) {
        let json = { error: '', result: {} };

        for (let j = 0; j < req.body.tamanho; j++) {
            let inserir = await CopaModal.cadastrarTime(req.body.nome[j] );
            if (inserir) {
                json.result = inserir; //se tiver nota ele joga no json
            }
            
        }
        return res.json(json)
       
           
    },

    async cadastrar_placar(req, res) {
        let json = { error: '', result: {} };
        console.log("placar 1111", req.body.placar1 )
        console.log("placar 222", req.body.placar2 )
            let inserir1 = await CopaModal.cadastrar_placar(req.body.placar1, req.body.id1 );
            if(inserir1){
                let inserir2 = await CopaModal.cadastrar_placar(req.body.placar2, req.body.id2);
                if (inserir2) {
                    json.result = inserir2; //se tiver nota ele joga no json
                }
            }
           
            return res.json(json)
    },

    async limpar(req, res) {
        let json = { error: '', result: {} };
            let inserir1 = await CopaModal.limpar(req.body.placar1, req.body.id1 );
            if(inserir1){
                    json.result = inserir1; //se tiver nota ele joga no json     
            }
           
            return res.json(json)
    },

}