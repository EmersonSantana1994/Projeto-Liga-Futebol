const { async } = require('parse/lib/browser/Storage');
const CadastrarModel = require('../services/CadastrarModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const SECRET = 'emesantana'
const ArtilheiroModel = require('../services/ArtilheiroModel');
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
        if (seExisteLiga[0] == undefined || seExisteLiga[0] == "undefined") {
            cadastrarLiga = await CadastrarModel.cadastrarLiga(req.body.liga);
            let arrayTime = []
            arrayTime.push(req.body.time1, req.body.time2, req.body.time3, req.body.time4)
            let seExisteTimes = await CadastrarModel.seExisteTime(arrayTime);
            if (seExisteTimes[0] == undefined || seExisteTimes[0] == "undefined") {
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

    async alterarNome(req, res, next) {
        let json = { error: '', result: [] };

        await CadastrarModel.alterarNome(req.body.id, req.body.nome);
        return res.json(json)
    },

    async deletarNome(req, res, next) {
        let json = { error: '', result: [] };

        await CadastrarModel.deletarNome(req.body.id);
        return res.json(json)
    },

    async alterarNomeTime(req, res, next) {
        let json = { error: '', result: [] };

        await CadastrarModel.alterarNomeTime(req.body.id, req.body.nome);
        return res.json(json)
    },

    async deletarNomeTime(req, res, next) {
        let json = { error: '', result: [] };

        await CadastrarModel.deletarNomeTime(req.body.id);
        return res.json(json)
    },

    async alterarNomeLiga(req, res, next) {
        let json = { error: '', result: [] };

        await CadastrarModel.alterarNomeLiga(req.body.id, req.body.nome);
        return res.json(json)
    },

    async deletarNomeLiga(req, res, next) {
        let json = { error: '', result: [] };

        await CadastrarModel.deletarNomeLiga(req.body.id);
        return res.json(json)
    },

    async pesquisarTime(req, res, next) {
        let json = { error: '', result: [] };
      let inserir =  await CadastrarModel.pesquisarTime(req.body.time);

        if (inserir.length != 0) {
            let inserir2 =  await CadastrarModel.pesquisarJogadores(inserir[0].id_time);
            json.result = inserir2; //se tiver nota ele joga no json
        } 
        return res.json(json)
    },
    async inserirImagem(req, res, next) {
        let json = { error: '', result: [] };
        let buscarIdJogador =  await ArtilheiroModel.buscarJogadorTabela(req.body.nome);
        if(buscarIdJogador.length == 0){
            return res.status(500).send('Jogador não cadastrado na tabela de jogadores')
        }else{
            inserir = await CadastrarModel.inserirImagem(req.body.imagem, buscarIdJogador[0].id_jogador);
            if (inserir) {
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
        }
    },

    async buscarImagem(req, res, next) {
        let json = { error: '', result: [] };
        let buscarIdJogador =  await ArtilheiroModel.buscarJogadorTabela(req.body.nome);
        if(buscarIdJogador.length == 0){
            return res.status(500).send('Jogador não cadastrado na tabela de jogadores')
        }else{
            inserir = await CadastrarModel.buscarImagem(req.body.nome);
            if (inserir) {
                json.result = inserir[0].foto; //se tiver nota ele joga no json
            }
            return res.json(json)
        }
    }
}