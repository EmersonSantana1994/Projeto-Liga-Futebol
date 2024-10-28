const { async } = require('parse/lib/browser/Storage');
const AgendarConsultaModal = require('../services/AgendarConsultaModal');
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
    async buscarEspecialidade(req, res) {
        let inserir
        let json = { error: '', result: {} };


        inserir = await AgendarConsultaModal.buscarEspecialidade(req.body.especialidade);


        json.result = inserir; //se tiver nota ele joga no json

        return res.json(json.result)

    },
    async buscarDia(req, res) {
        let inserir
        let json = { error: '', result: {} };


        inserir = await AgendarConsultaModal.buscarDia(req.body.idEspecialidade);
        json.result = inserir; //se tiver nota ele joga no json
        const hoje = new Date();
        const eventosFuturos = json.result.filter(evento => new Date(evento.start) > hoje);
        const eventosUnicos = [];
        const datasVistas = new Set();
        eventosFuturos.forEach(evento => {
            const dataInicio = new Date(evento.start).toISOString().split('T')[0]; // Pega apenas a data
          
            if (!datasVistas.has(dataInicio)) {
              datasVistas.add(dataInicio);
              eventosUnicos.push(evento);
            }
          });



        return res.json(eventosUnicos)

    },

    async buscarMedico(req, res) {
        let inserir
        let json = { error: '', result: {} };
        let jsonValidar = { error: '', result: {} };
        let array
        let resposta


        let keyDataEvento = req.body.keyDataEvento.split('T')[0]
        buscar = await AgendarConsultaModal.buscarMedico(keyDataEvento, req.body.keyIdEspecialidade);

        // let data = req.body.keyDataEvento
        // let formatData = data.split(' ')[0]

        // inserir = await AgendarConsultaModal.buscarValidarAgendamento(formatData);

        validar = await AgendarConsultaModal.validarConsultas(keyDataEvento, req.body.keyIdEspecialidade);



        const generateTimeSlots = (inicio, fim) => {
            const start = new Date(inicio);
            const end = new Date(fim);
            const slots = [];

            while (start <= end) {
                slots.push(start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                start.setMinutes(start.getMinutes() + 30); // Incrementa 30 minutos
            }

            return slots;
        };


        json.result = buscar; //se tiver nota ele joga no json
        jsonValidar.result = validar; //se tiver nota ele joga no json

        // console.log("validar", validar)
        // jsonValidar = validar

        array = json.result



        const formatArray = array.flatMap(medico =>
            generateTimeSlots(medico.start, medico.end).map(slot => ({
                nomeMedico: medico.nomeMedico,
                crm: medico.crm,
                rqe: medico.rqe,
                especialidade: medico.especialidade,
                slot

            }))
        );

        const arrayOrdenados = formatArray.sort((a, b) => {
            return a.slot.localeCompare(b.slot);
        });


        if (jsonValidar.result.length > 0) {
            const horariosList = jsonValidar.result.map(h => h.horario.substring(0, 5));
            const arrayFiltrado = arrayOrdenados.filter(item =>
                !horariosList.includes(item.slot)
            );
            resposta = res.json(arrayFiltrado)
            return resposta
        } else {
            resposta = res.json(arrayOrdenados)
            return resposta
        }


    },



    async inserirAgendamentoPacliente(req, res) {
        let inserir
        let json = { error: '', result: {} };


        inserir = await AgendarConsultaModal.inserirAgendamentoPacliente(req.body.horario, req.body.dataAgendada,
            req.body.id_pacliente, req.body.id_medico, req.body.especialidade, req.body.keyIdEspecialidade);


        json.result = inserir; //se tiver nota ele joga no json

        return res.json(json.result)

    },

    async buscarValidarAgendamento(req, res) {
        let inserir
        let json = { error: '', result: {} };

        let data = req.body.keyDataEvento
        let formatData = data.split(' ')[0]

        inserir = await AgendarConsultaModal.buscarValidarAgendamento(formatData);


        json.result = inserir; //se tiver nota ele joga no json

        return res.json(json.result)

    },

    async buscarConsultas(req, res) {
        let inserir
        let json = { error: '', result: {} };


        inserir = await AgendarConsultaModal.buscarConsultas(req.body.id_medico);


        json.result = inserir; //se tiver nota ele joga no json

        return res.json(json.result)

    },

}