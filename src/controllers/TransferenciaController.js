const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const SECRET = 'emesantana'


module.exports = {

    async tranferirJogador(req, res, next) {
        //   let autenticar = verifyJWT(req, res)
        //   if(autenticar){
        //   return  res.status(500).send("sem autenticar")
        //   }

        let time = {time: req.body.id}
            let json = { error: '', result: [] };
            let idTime = await LoginModel.buscarTime(time);
            let idJogador = await LoginModel.buscarNomeJogador(req.body.jogadorSaindo);
            await LoginModel.jogadorSaindo(idTime, idJogador, req.body.jogadorEntrando );
            json.result = futebol
            return res.json(json.result)
        },
}