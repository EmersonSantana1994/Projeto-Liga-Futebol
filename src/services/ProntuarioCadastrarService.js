const db = require('../db');

module.exports = {

    buscar: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(' select * from usuario Where nome LIKE ?', [nome + '%'], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    buscarUsuario: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(' select * from usuario Where id = ?', [id], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

};