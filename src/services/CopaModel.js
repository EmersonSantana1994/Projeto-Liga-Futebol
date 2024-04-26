const db = require('../db');

module.exports = {
    buscarTodos: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM times_copa', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    buscarTodosPlacares: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM resultados_copa', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    cadastrarTime: (nome) => {
        console.log("")
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO times_copa (nome) VALUES (?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    cadastrar_placar: (placar, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE resultados_copa SET placar = ? WHERE (id = ?);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    limpar: (placar, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE resultados_copa SET placar = null, data = null WHERE (id <> 0);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
            db.query('DELETE FROM times_copa WHERE (id <> 0);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },
}