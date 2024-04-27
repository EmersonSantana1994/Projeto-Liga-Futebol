const db = require('../db');

module.exports = {
    buscarJogadorTabela: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM jogadores Where (nome = ?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarTimeJogador: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select t.nome from jogadores j \
            left join times_tb t on t.id_time = j.id_time \
            where j.nome = ?;', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    verificarTime: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM placar_jogo Where (nome = ?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarTodos: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM placar_jogo', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },


    inserir: (nome, placar) => {
        console.log("")
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO placar_jogo (nome, placar) VALUES (?, ?)', [nome, placar ], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    atualiza: (id, placar,) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE placar_jogo SET placar = ? WHERE (nome = ?);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    limpar: (placar, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM placar_jogo WHERE (id <> 0);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },
}