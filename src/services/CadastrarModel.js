const db = require('../db');

module.exports = {

    seExisteLiga: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM ligas WHERE nome IN(?) ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    cadastrarLiga: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO ligas (nome) VALUES (?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            });
        });
    },

    seExisteTime: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM times_tb WHERE nome IN(?) ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    
    seExisteJogador: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM jogadores WHERE nome IN(?) ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    cadastrarTime: (nome, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO times_tb (nome, id) VALUES (?,?)', [nome, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            });
        });
    },

    cadastrarJogador: (nome, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO jogadores (nome, id_time) VALUES (?,?)', [nome, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            });
        });
    },

    };