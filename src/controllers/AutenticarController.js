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
    console.log("ddddddddd", req.headers['x-access-token']  )
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

    async autenticar(req, res) {
        await  verifyJWT(req, res)
        if(cript){
          return res.status(500).send('não autenticado')
        }
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        return res.json(json.result)
    },


}