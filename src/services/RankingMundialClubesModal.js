const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM ranking_clubes ORDER BY pontos Desc', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    inserirPontos: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO ranking_clubes (pontos, nome) VALUES (?,?)', [dados.pontos, dados.nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    atualizaPontos: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE ranking_clubes SET pontos = ? WHERE (id = ?)', [dados.pontos, dados.id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },


    deleteJogador: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM artilheiro WHERE (id IN (?))', [dados.id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);    
            });
        });
    },

    buscarUm: (id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM torneio WHERE id IN(?) ', [id], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            })
        });
    },

    verificarUsuario: (usuario) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select usuario from tb_usuario where usuario = ?', [usuario], (error, results) => {
                if(error) { rejeitado(error); return; }
               if(results.length > 1){
                aceito(false);
               }else{
                aceito(results);
               } 
            });
        });
    },

    cadastrar: (user) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO tb_usuario (senha, usuario) VALUES (?,?)', [user.senha, user.usuario], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            });
        });
    },

    buscarNome: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM ranking_clubes WHERE nome IN(?) ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            })
        });
    },

    deletar: (id, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM ranking_clubes WHERE id <> 0', [], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);    
            });
        });
    },

    buscarUsuario: (user) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select * from tb_usuario where usuario = ?', [user], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    if(results.length == 1){
                        aceito(results);
                    }else if(results.length > 1){
                        aceito('atencao');
                    }
                    else{
                        aceito(false);
                    }
                    
            });
        });
    },
    };