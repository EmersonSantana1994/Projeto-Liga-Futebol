const db = require('../db');

module.exports = {
    buscarTodos: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM times_tb Where id_time <> 36 ', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    buscarTime: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM times_tb WHERE nome IN(?) ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    buscarJogadores: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM jogadores WHERE id_time IN(?) ', [id], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
}