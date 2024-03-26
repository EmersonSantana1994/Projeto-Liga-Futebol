const { async } = require('parse/lib/browser/Storage');
const TransferenciaModel = require('../services/TransferenciaModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const SECRET = 'emesantana'


module.exports = {

    async tranferirJogador(req, res, next) {
        let inserir
        //   let autenticar = verifyJWT(req, res)
        //   if(autenticar){
        //   return  res.status(500).send("sem autenticar")
        //   }

            let json = { error: '', result: [] };
            let idTime = await TransferenciaModel.buscarTime(req.body.nomeTime);
            let idJogadorSaindo = await TransferenciaModel.buscarNomeJogador(req.body.jogadorSaindo);
            let idJogadorEntrando = await TransferenciaModel.buscarNomeJogador(req.body.novoJogador);
            await TransferenciaModel.jogadorSaindo(idJogadorSaindo[0].id_jogador);
            if(idJogadorEntrando[0] == undefined || idJogadorEntrando[0] == "undefined"){
               inserir =  await TransferenciaModel.cadastrarJogador(req.body.novoJogador, idTime[0].id_time);
            }else{
                inserir =  await TransferenciaModel.transferirJogador(idTime[0].id_time, idJogadorEntrando[0].id_jogador);
            }
            if (inserir) {
                json.result = inserir; //se tiver nota ele joga no json
            } 
            return res.json(json)
        },

        async tranferirJogadorComprado(req, res, next) {   
            let enviar = []
            let json = { error: '', result: [] };
            let idTimeComprador = await TransferenciaModel.buscarTime(req.body.nomeTimeComprador);
            let idTimeVendedor = await TransferenciaModel.buscarTime(req.body.nomeTimeVendedor);
if(idTimeComprador.length > 0 && idTimeVendedor.length > 0){

    let jogadoComprado = await TransferenciaModel.buscarNomeJogador(req.body.jogadoComprado);
    let jogadoTrocado = await TransferenciaModel.buscarNomeJogador(req.body.jogadoTrocado);

    if(jogadoComprado.length > 0 && jogadoTrocado.length > 0){
       let inserir =  await TransferenciaModel.transferirJogador(idTimeComprador[0].id_time, jogadoComprado[0].id_jogador);
     let  inserir2 =  await TransferenciaModel.transferirJogador(idTimeVendedor[0].id_time, jogadoTrocado[0].id_jogador);
enviar.push(idTimeComprador[0].id_time)
enviar.push(idTimeVendedor[0].id_time)
    }else{ return res.status(500).send('Jogador comprado ou jogador trocado não existem')}

}else {
    return res.status(500).send('Time comprador ou time vendedor não existem')
}
if (enviar.length > 0) {
    json.result = enviar; //se tiver nota ele joga no json
} 
            return res.json(json)

        },

        async bucarTimeAtualizado(req, res, next) {  
            let json = { error: '', result: [] };

            let idTime = await TransferenciaModel.buscarJogadoresTime(req.body.idTime);
            
                json.result = idTime; //se tiver nota ele joga no json
                return res.json(json)
         }

}