const db = require('../db');

module.exports = {

    buscarConsultaAberta: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT p.nome, c.dataAbertura, p.id_pacliente, c.id_consulta FROM consulta c \
                left join pacliente p on p.id_pacliente = c.id_pacliente \
                where ativo = 1', [], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarConsultaFechada: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT p.nome, c.dataAbertura, p.id_pacliente, c.id_consulta, c.dataEncerrada, pr.dataRetorno, p.cpf FROM consulta c \
                left join pacliente p on p.id_pacliente = c.id_pacliente \
                left join prontuario pr on pr.id_pacliente = p.id_pacliente \
                where ativo = 0', [], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarRespostas: (idPacliente) => {
        return new Promise((aceito, rejeitado) => {
            db.query('select q.text, r.resposta, p.nome, q.type  from respostas r \
                left join questoes q on q.id_questao = r.id_questao \
                left join pacliente p on p.id_pacliente = r.id_pacliente \
                where r.id_pacliente = ?', [idPacliente], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    encerrarConsulta: (idConsulta) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE consulta SET ativo = 0 WHERE id_consulta = ?', [idConsulta], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    inserirConsulta: (idPacliente, idMedico, anotacao, dataProcedimento, dataRetorno) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO prontuario (id_pacliente, id_medico, anotacao, dataProcedimento, dataRetorno) VALUES (?,?,?,?,?)', 
                [idPacliente, idMedico, anotacao, dataProcedimento, dataRetorno], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            });
        });
    },
    buscarAnotacao: (idPacliente) => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from prontuario where id_pacliente = ?', [idPacliente], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
}