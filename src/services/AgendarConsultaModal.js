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
    buscarMedico: (idEvento) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select e.start, e.end, m.nomeMedico, m.crm, m.rqe, es.especialidade  from eventos e \
                left join medico m on m.id_medico = e.id_medico \
                left join especialidade es on es.id_especialidade = e.id_especialidade \
                where e.id = ?', [idEvento], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
}