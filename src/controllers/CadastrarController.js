const { async } = require('parse/lib/browser/Storage');
const CadastrarModel = require('../services/CadastrarModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const SECRET = 'emesantana'


module.exports = {

    async cadastrarTime(req, res, next) {
        let cadastrarLiga
        let cadastrarTime1
        let cadastrarTime2
        let cadastrarTime3
        let cadastrarTime4
        //   let autenticar = verifyJWT(req, res)
        //   if(autenticar){
        //   return  res.status(500).send("sem autenticar")
        //   }

        let json = { error: '', result: [] };
        let seExisteLiga = await CadastrarModel.seExisteLiga(req.body.liga);
        console.log("seExisteLiga", seExisteLiga)
        if (seExisteLiga[0] == undefined || seExisteLiga[0] == "undefined") {
            cadastrarLiga = await CadastrarModel.cadastrarLiga(req.body.liga);
            console.log("cadastrarLiga", cadastrarLiga.insertId)
            let arrayTime = []
            arrayTime.push(req.body.time1, req.body.time2, req.body.time3, req.body.time4)
            let seExisteTimes = await CadastrarModel.seExisteTime(arrayTime);
            console.log("testeeeee 1", seExisteTimes)
            if (seExisteTimes[0] == undefined || seExisteTimes[0] == "undefined") {
                console.log("testeeeee 2")
                cadastrarTime1 = await CadastrarModel.cadastrarTime(req.body.time1, cadastrarLiga.insertId);
                cadastrarTime2 = await CadastrarModel.cadastrarTime(req.body.time2, cadastrarLiga.insertId);
                cadastrarTime3 = await CadastrarModel.cadastrarTime(req.body.time3, cadastrarLiga.insertId);
                cadastrarTime4 = await CadastrarModel.cadastrarTime(req.body.time4, cadastrarLiga.insertId);
            }else{return res.status(500).send('Time já existe') 

            }
        } else { return res.status(500).send('Liga já existe') }
        return res.json(json)
    },

    async cadastrarJogador(req, res, next) {
        let arrayJogador = []
        //   let autenticar = verifyJWT(req, res)
        //   if(autenticar){
        //   return  res.status(500).send("sem autenticar")
        //   }

        let json = { error: '', result: [] };
        arrayJogador.push(req.body.jogador1, req.body.jogador2, req.body.jogador3, req.body.jogador4)
        let seExisteTime = await CadastrarModel.seExisteTime(req.body.time);
        if(seExisteTime.length > 0 || seExisteTime.length > 0){
            let seExisteJogador = await CadastrarModel.seExisteJogador(arrayJogador);
            console.log("seExisteJogador", seExisteJogador.length)
            console.log("seExisteTime 222", seExisteTime)
            console.log("seExisteTime", seExisteTime.length)
            if (seExisteJogador.length == 0) {
               await CadastrarModel.cadastrarJogador(req.body.jogador1, seExisteTime[0].id_time);
               await CadastrarModel.cadastrarJogador(req.body.jogador2, seExisteTime[0].id_time);
               await CadastrarModel.cadastrarJogador(req.body.jogador3, seExisteTime[0].id_time);
               await CadastrarModel.cadastrarJogador(req.body.jogador4, seExisteTime[0].id_time);
        }else {return res.status(500).send(seExisteJogador.length+ ' Jogadores já existem no banco de dados')
        }
        
        } else { return res.status(500).send('Time não existe no banco de dados') }
        return res.json(json)
    },


}