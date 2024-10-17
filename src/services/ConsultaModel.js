const db = require('../db');

module.exports = {

    buscarConsultaAberta: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT p.nome, c.dataAbertura, p.id_pacliente FROM consulta c \
                left join pacliente p on p.id_pacliente = c.id_pacliente \
                where ativo = 1', [], (error, results) => {
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
}