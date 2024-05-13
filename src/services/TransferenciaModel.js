const db = require('../db');

module.exports = {

    buscarTime: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT id_time FROM times_tb WHERE nome IN(?) ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    buscarNomeJogador: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT id_jogador FROM jogadores WHERE nome IN(?) ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            })
        });
    },
    
    buscarIdSemTime: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT id_time FROM times_tb WHERE nome IN("Sem time") ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            })
        });
    },

    cadastrarJogador: (novoJogador, time) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO jogadores (id_time, nome) VALUES (?,?)', [time, novoJogador], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            });
        });
    },

    jogadorSaindo: (id_jogador, id_time) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE jogadores SET id_time = ? WHERE (id_jogador = ?)', [id_time, id_jogador ], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },


    transferirJogador: (id_time, id_jogador) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE jogadores SET id_time = ? WHERE (id_jogador = ?)', [id_time, id_jogador ], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarJogadoresTime: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT nome FROM jogadores WHERE id_time IN(?) ', [id], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            })
        });
    },

    alterarNovoDono: (id_jogador) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE jogadores SET dono = 1 WHERE (id_jogador = ?)', [id_jogador ], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    alterarAntigoDono: (id_jogador) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE jogadores SET dono = null WHERE (id_jogador = ?)', [id_jogador ], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    };