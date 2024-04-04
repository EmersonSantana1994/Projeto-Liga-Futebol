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

    alterarNome: (id, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE jogadores SET nome = ? WHERE (id_jogador = ?)', [nome, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },


    deletarNome: (id, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM jogadores WHERE id_jogador = ?', [id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);    
            });
        });
    },

    alterarNomeTime: (id, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE times_tb SET nome = ? WHERE (id_time = ?)', [nome, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },


    deletarNomeTime: (id, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM times_tb WHERE id_time = ?', [id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);    
            });
        });
    },

    alterarNomeLiga: (id, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE ligas SET nome = ? WHERE (id = ?)', [nome, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },


    deletarNomeLiga: (id, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM ligas WHERE id = ?', [id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);    
            });
        });
    },

    pesquisarTime: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select * from times_tb WHERE nome = ?', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },
    pesquisarJogadores: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select * from jogadores WHERE id_time = ?', [id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },
    };