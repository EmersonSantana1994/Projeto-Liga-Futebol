const { async } = require('parse/lib/browser/Storage');
const TransferenciaModel = require('../services/TransferenciaModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const RollBack = require('../services/RollBack');
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
        let buscarIdSemTime = await TransferenciaModel.buscarIdSemTime();
        try {
            await RollBack.transaction();
            await TransferenciaModel.jogadorSaindo(idJogadorSaindo[0].id_jogador, buscarIdSemTime[0].id_time);
            if (idJogadorEntrando[0] == undefined || idJogadorEntrando[0] == "undefined") {
                inserir = await TransferenciaModel.cadastrarJogador(req.body.novoJogador, idTime[0].id_time);
            } else {
                inserir = await TransferenciaModel.transferirJogador(idTime[0].id_time, idJogadorEntrando[0].id_jogador);
            }
            if (inserir) {
                json.result = inserir; //se tiver nota ele joga no json
            }
            await RollBack.commit();
            return res.json(json)
        } catch (erro) {
            await RollBack.rollBack();
            console.log("Erro na execução, Roll Back realizado",erro);
            return res.status(500).send('Erro na execução, Roll Back realizado')
        }
    },

    async tranferirJogadorComprado(req, res, next) {
        let enviar = []
        let json = { error: '', result: [] };
        let idTimeComprador = await TransferenciaModel.buscarTime(req.body.nomeTimeComprador);
        let idTimeVendedor = await TransferenciaModel.buscarTime(req.body.nomeTimeVendedor);
        try {
            await RollBack.transaction();
            if (idTimeComprador.length > 0 && idTimeVendedor.length > 0) {

                let jogadoComprado = await TransferenciaModel.buscarNomeJogador(req.body.jogadoComprado);
                let jogadoTrocado = await TransferenciaModel.buscarNomeJogador(req.body.jogadoTrocado);

                if (jogadoComprado.length > 0 && jogadoTrocado.length > 0) {
                    let inserir = await TransferenciaModel.transferirJogador(idTimeComprador[0].id_time, jogadoComprado[0].id_jogador);
                    let inserir2 = await TransferenciaModel.transferirJogador(idTimeVendedor[0].id_time, jogadoTrocado[0].id_jogador);
                    enviar.push(idTimeComprador[0].id_time)
                    enviar.push(idTimeVendedor[0].id_time)
                } else { return res.status(500).send('Jogador comprado ou jogador trocado não existem') }

            } else {
                return res.status(500).send('Time comprador ou time vendedor não existem')
            }
            if (enviar.length > 0) {
                json.result = enviar; //se tiver nota ele joga no json
            }
            await RollBack.commit();
            return res.json(json)
        } catch (erro) {
            await RollBack.rollBack();
            console.log(erro);
            return res.status(500).send('Erro na execução, Roll Back realizado')
        }


    },

    async bucarTimeAtualizado(req, res, next) {
        let json = { error: '', result: [] };

        let idTime = await TransferenciaModel.buscarJogadoresTime(req.body.idTime);

        json.result = idTime; //se tiver nota ele joga no json
        return res.json(json)
    },

    async alterarDono(req, res, next) {
        let json = { error: '', result: [] };
        let dono
        if (req.body.nomeNovoDono) {
            if (req.body.nomeAntigoDono) {
                let buscarIdNovoDodo = await TransferenciaModel.buscarNomeJogador(req.body.nomeNovoDono);

                if (buscarIdNovoDodo.length > 0) {
                    let buscarIdAntigoDodo = await TransferenciaModel.buscarNomeJogador(req.body.nomeAntigoDono);
                    if (buscarIdAntigoDodo.length > 0) {

                        try {
                            await RollBack.transaction();
                            await TransferenciaModel.alterarAntigoDono(buscarIdAntigoDodo[0].id_jogador);
                            dono = await TransferenciaModel.alterarNovoDono(buscarIdNovoDodo[0].id_jogador);
                            await RollBack.commit();
                        } catch (erro) {
                            await RollBack.rollBack();
                            console.log(erro);
                            return res.status(500).send('Erro na execução, Roll Back realizado')
                        }

                    } else {
                        return res.status(500).send('Nome do antigo dono não existe')
                    }
                } else {
                    return res.status(500).send('Nome do novo dono não existe')
                }


                json.result = dono; //se tiver nota ele joga no json
                return res.json(json)
            } else {
                return res.status(500).send('Nome do antigo dono não informado')
            }

        } else {
            return res.status(500).send('Nome do novo dono não informado')
        }

    }

}