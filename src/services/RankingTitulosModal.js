const db = require('../db');


module.exports = {

    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM ranking_titulos order by total Desc', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarJogadorTorneioTabela: (nome, torneio) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM ranking_titulos where nomeJogador = ?', [nome], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    // buscarJogadorTabela: (nome) => {
    //     return new Promise((aceito, rejeitado)=>{
    //         db.query('SELECT * FROM ranking_titulos where nome = ?', [nome], (error, results)=>{
    //             if(error) { rejeitado(error); return; }
    //             aceito(results);
    //         });
    //     });
    // },

    atulizar: (id, torneio, pontos, total ) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(`UPDATE ranking_titulos SET ${torneio} = ?, total = ? WHERE id = ?`, [pontos, total, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    adicionarNovoJogador: (nome, torneio, pontos) => {
        return new Promise((aceito, rejeitado) => {
            const query = `INSERT INTO ranking_titulos (${torneio}, nomeJogador, total) VALUES (?, ?, ?)`;
            db.query(query, [pontos, nome, pontos], (error, results) => {
                if (error) { 
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },
};