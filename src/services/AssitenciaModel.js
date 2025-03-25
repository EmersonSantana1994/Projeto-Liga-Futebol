const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM assistencia ORDER BY assistencias Desc', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarTodosTorneio: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM assistencia_torneio ORDER BY assistencias Desc', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarJogadorTorneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM assistencia_torneio Where (nome = ?) ', [nome], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarJogador: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM assistencia Where (nome = ?) ', [nome], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },



    inserirPontos: (dados, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO assistencia (assistencia, nome, id_jogador) VALUES (?,?,?)', [dados.assistencia, dados.nome, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    inserirPontosTorneio: (dados, assistencia) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO assistencia_torneio (assistencia, nome) VALUES (?,?)', [assistencia, dados.nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    atualizaPontos: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE assistencia SET assistencias = ? WHERE (id = ?)', [dados.assistencia, dados.id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    atualizaPontosToneio: (dados, assistencia) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE assistencia_torneio SET assistencias = ? WHERE (nome = ?)', [assistencia, dados.nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    atualizaPontos: (dados, atualiza) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE assistencia SET assistencias = ? WHERE (id = ?)', [atualiza, dados.id], (error, results) => {
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

    deleteJogadorTorneio: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM artilheiro_torneio WHERE (id <> 0)', [], (error, results) => {
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