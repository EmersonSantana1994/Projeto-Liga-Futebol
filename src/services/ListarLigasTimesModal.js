const db = require('../db');

module.exports = {
    buscarTodos: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM ligas Where nome <> "Sem liga" ', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    buscarLiga: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM ligas WHERE nome IN(?) ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    buscarTimes: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM times_tb WHERE id_liga IN(?) ', [id], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
}