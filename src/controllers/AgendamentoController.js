const { async } = require('parse/lib/browser/Storage');
const AgendamenroModel = require('../services/AgendamentoModal');
const jwt = require('jsonwebtoken')
const SECRET = 'emesantana'
const axios = require('axios');
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

        async reservarAgendaMedica(req, res) {
            let inserir 
            let json = { error: '', result: {} };
    
            let dados = { title: req.body.title, start: req.body.start, 
                end: req.body.end, desc: req.body.desc, color: req.body.color, tipo: req.body.tipo, 
                id_consultorio: req.body.id_consultorio, id_medico: req.body.id_medico }
            
           let verificarAgendamento = await AgendamenroModel.verificar(dados);
           if (verificarAgendamento.length > 0) {
            return res.status(500).send('Data informada já agendada nesta sala')
           }
            inserir =   await AgendamenroModel.reservarAgendaMedica(dados);
           
                if (inserir) {
                    json.result = inserir; //se tiver nota ele joga no json
                }
                return res.json(json)
            
        },
        async buscartudo(req, res) {
            let inserir 
            let json = { error: '', result: {} };
    

            inserir =   await AgendamenroModel.buscartudo(req.body.id_consultorio, req.body.id_medico);
            
               
                    json.result = inserir; //se tiver nota ele joga no json
                
                return res.json(json.result)
            
        },
        async getConsultorio(req, res) {
            let inserir 
            let json = { error: '', result: {} };
    
          
            inserir =   await AgendamenroModel.getConsultorio();
         
               
                    json.result = inserir; //se tiver nota ele joga no json
                
                return res.json(json.result)
            
        },

    }