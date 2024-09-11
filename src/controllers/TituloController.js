const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const HealfModal = require('../services/HealfModal');
const ProntuarioModel = require('../services/ProntuarioModel');
const TituloModal = require('../services/TituloModal');
const TransferenciaModel = require('../services/TransferenciaModel');
const SECRET = 'emesantana'
let cript = false
const neo4j = require('neo4j-driver');
const neo4jDriver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));
const RollBack = require('../services/RollBack');


module.exports = {

    async listar(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await TituloModal.listar(req.body.idUsuario);
        json.result = futebol
        return res.json(json.result)
    },
    async adicionar(req, res) {
        let futebol
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
      let nomeToneio = req.body.nomeTorneio
      await RollBack.transaction();
for (let i = 0; i < req.body.nome.length; i++) {

    let id = await TransferenciaModel.buscarNomeJogador(req.body.nome[i]);
    try {
        
        // console.log("id.length", id.length)
        // console.log("id", id)
        if(id.length > 0){
            console.log("nomeToneio", nomeToneio)
            console.log("id[0].id_jogador", id[0].id_jogador)
            let soma = await TituloModal.buscarNomeJogador(nomeToneio, id[0].id_jogador);

    console.log("soma", soma)
            if(soma.length > 0){
                let soma1 = 0
                if(nomeToneio == 'liga'){
                    soma1 = 1 + soma[0].liga
                }
                else if(nomeToneio == 'subLiga'){
                 soma1 = 1 + soma[0].subLiga
                }
                else if(nomeToneio == 'mundial'){
                    soma1 = 1 + soma[0].mundial
                }
                else if(nomeToneio == 'recopa'){
                    soma1 = 1 + soma[0].recopa
                }
                else if(nomeToneio == 'copa'){
                    soma1 = 1 + soma[0].copa
                }
                else if(nomeToneio == 'superCopa'){
                    soma1 = 1 + soma[0].superCopa
                }
                futebol = await TituloModal.update(nomeToneio, id[0].id_jogador, soma1);
            }else{
                console.log("hhhh")
                    futebol = await TituloModal.adicionar(nomeToneio, id[0].id_jogador, 1);
            }
    
        }else{ 
           
            await RollBack.rollBack();
            console.log("Erro na execução, Roll Back realizado para jogador inserido");
            return res.status(500).send('Algum jogador digitado não existe na tabela de jogadores, rolback foi realizado') 
        }
    }catch (erro) {
        await RollBack.rollBack();
        console.log("Erro na execução, Roll Back realizado",erro);
        return res.status(500).send('Erro na execução, Roll Back realizado') 
    }

}
await RollBack.commit();
        json.result = futebol
        return res.json(json.result)
    },
}