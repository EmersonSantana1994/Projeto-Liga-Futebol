const db = require('../db');


module.exports = {
    buscarEspecialidade: (especialidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM especialidade WHERE especialidade LIKE ? LIMIT 10', [`%${especialidade}%`], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarDia: (especialidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select * from eventos where id_especialidade = ?', [especialidade], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarMedico: (data, especialidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select e.start, e.end, m.nomeMedico, m.id_medico, m.crm, m.rqe, es.especialidade  from eventos e \
                left join medico m on m.id_medico = e.id_medico \
                left join especialidade es on es.id_especialidade = e.id_especialidade \
                where DATE(e.start) = ? and es.id_especialidade = ?', [data, especialidade], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    inserirAgendamentoPacliente: (horario, dataAgendada, id_pacliente, id_medico, especialidade, id_especialidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO consulta_agendada (horario, dataAgendada, id_pacliente, id_medico, especialidade, id_especialidade ) VALUES (?,?,?,?,?,?)', 
                [horario, dataAgendada, id_pacliente, id_medico, especialidade, id_especialidade], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },
    buscarConsultas: (id_medico) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select p.nome, p.cpf, m.nomeMedico,  ca.horario, ca.dataAgendada, ca.especialidade, \
                p.id_pacliente, m.id_medico, id_consultaAgendada \
                from consulta_agendada ca \
                left join pacliente p on p.id_pacliente = ca.id_pacliente \
                left join medico m on m.id_medico = ca.id_medico \
                where ca.id_medico = ?', [id_medico], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    validarConsultas: (data, especialidade) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select horario from consulta_agendada where DATE(dataAgendada) = ? and id_especialidade = ? ', [data, especialidade], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
}