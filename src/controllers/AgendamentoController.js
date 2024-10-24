const { async } = require('parse/lib/browser/Storage');
const AgendamenroModel = require('../services/AgendamentoModal');
const jwt = require('jsonwebtoken')
const SECRET = 'emesantana'
const axios = require('axios');
let cript = false;
const RollBack = require('../services/RollBack');
const { atualiza } = require('../services/PlacarModel');

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

    async reservarAgendaMedica(req, res) {
        let inserir
        let json = { error: '', result: {} };

        let dados = {
            id_especialidade: req.body.title, start: req.body.start,
            end: req.body.end, desc: req.body.desc, color: req.body.color, tipo: req.body.tipo,
            id_consultorio: req.body.id_consultorio, id_medico: req.body.id_medico, repetir: req.body.repetir
        }

        let verificarAgendamento = await AgendamenroModel.verificar(dados);
        if (verificarAgendamento.length > 0) {
            return res.status(500).send('112')
        }
        inserir = await AgendamenroModel.reservarAgendaMedica(dados);

        if (inserir) {
            json.result = inserir; //se tiver nota ele joga no json
        }
        return res.json(json)

    },
    async buscartudo(req, res) {
        let inserir
        let json = { error: '', result: {} };


        inserir = await AgendamenroModel.buscartudo(req.body.id_consultorio, req.body.id_medico);


        json.result = inserir; //se tiver nota ele joga no json

        return res.json(json.result)

    },
    async repetir(req, res) {
        let inserir
        let json = { error: '', result: {} };

        try {
            await RollBack.transaction();
          let  inserirId = await AgendamenroModel.repetir(req.body.comeco, req.body.fim);
            for (let j = 0; j < req.body.tamanho; j++) {
                let verificarAgendamento = await AgendamenroModel.verificarRepetir(req.body.start[j], req.body.id_consultorio);
                if (verificarAgendamento.length > 0) {
                    return res.status(500).send('112')
                }

                inserir = await AgendamenroModel.reservarAgendaMedicaRepetir( req.body.start[j],
                    req.body.end[j], req.body.desc, req.body.color, req.body.tipo, req.body.title[j],
                    req.body.id_consultorio, req.body.id_medico, inserirId.insertId);
            }

            json.result = inserir; //se tiver nota ele joga no json
            await RollBack.commit();
            return res.json(json.result)
        } catch (erro) {
            await RollBack.rollBack();
            console.log(erro);
            return res.status(500).send('Erro na execução, Roll Back realizado')
        }


    },
    async getConsultorio(req, res) {
        let inserir
        let json = { error: '', result: {} };


        inserir = await AgendamenroModel.getConsultorio();


        json.result = inserir; //se tiver nota ele joga no json

        return res.json(json.result)

    },
    async especialidade(req, res) {
        let inserir
        let json = { error: '', result: {} };


        inserir = await AgendamenroModel.especialidade();


        json.result = inserir; //se tiver nota ele joga no json

        return res.json(json.result)

    },

    async atualiza(req, res) {
        let json = { error: '', result: [] };

        await AgendamenroModel.atualiza(req.body.especialidade, 
            req.body.descricao, req.body.startData, req.body.endtData, req.body.tipo, req.body.id);

        return res.json(json)

    },
  

    async deletar(req, res) {
        let json = { error: '', result: [] };

        await AgendamenroModel.deletar(req.body.id);

        return res.json(json)

    },

    async deletarAllEvento(req, res) {
        let json = { error: '', result: [] };

        await AgendamenroModel.deletarAllEvento(req.body.id_especialidade);

        return res.json(json)

    },

}