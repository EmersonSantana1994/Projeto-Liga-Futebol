const db = require('../db');

module.exports = {

    listar_torneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM pontos_troneio', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    seExisteTorneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM pontos_troneio WHERE nome IN(?) ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    cadastrarTorneio: (nome, pontos) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO pontos_troneio (nome, pontos) VALUES (?, ?)', [nome, pontos], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            });
        });
    },


    alterar_nome_pontos: (id, nome, pontos) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE pontos_troneio SET nome = ?, pontos = ? WHERE (id = ?)', [nome, pontos, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    alterar_nome: (nome, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE pontos_troneio SET nome = ? WHERE (id = ?)', [nome, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    alterar_pontos: (id, pontos) => {
        console.log("pontossssssssssss", pontos)
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE pontos_troneio SET pontos = ? WHERE (id = ?)', [pontos, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    deletar: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM pontos_troneio WHERE id = ?', [id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);    
            });
        });
    },


    };