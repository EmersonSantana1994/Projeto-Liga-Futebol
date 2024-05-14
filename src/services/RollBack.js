const db = require('../db');

module.exports = {

    transaction: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('start transaction', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    rollBack: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('rollback', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    commit: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('commit', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

}
