const db = require('../db');

module.exports = {

    select: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM maisteste', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM torneio', (error, results)=>{
                if(error) { rejeitado(error); return; }
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

    deleteTimeSorteado: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM times_sorteados WHERE id <> 0', [], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);    
            });
        });
    },

    deletar: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM torneio WHERE id <> 0', [], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);    
            });
        });
    },

    atualizaTime: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE torneio SET pontos = ?, saldo = ? WHERE (id = ?)', [dados.pontos, dados.saldo, dados.id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    atualizaTimeSorteado: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE times_sorteados SET nome = ? WHERE (id = ?)', [dados.nome, dados.id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    salvarPlacar: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE resultados SET resultado = ? WHERE (id = ?)', [dados.resultado, dados.id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarPlacar: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('Select resultado, data from resultados WHERE (id = ?)', [dados.id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarPlacares: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('Select * from resultados', [dados.id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    deletarPlacar:(dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE resultados SET resultado = NULL, data = NULL WHERE id IN (?)', [dados.id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    cadastrarTimeSorteado: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO times_sorteados (nome) VALUES (?)', [dados.nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    cadastrarTime: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO torneio (pontos, nome, saldo) VALUES (?,?,?)', [dados.pontos, dados.nome, dados.saldo], (error, results) => {
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

    bucarNome: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM torneio WHERE nome IN(?) ', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            });
        });
    },

    verificar: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM resultados', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);
            });
        });
    },

    bucarTimeSorteados: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM times_sorteados', [], (error, results) => {
                if(error) { rejeitado(error); return; }
                    aceito(results);
            })
        });
    },

    timeSorteado: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM times_sorteados where nome IN (?)', [dados.nome], (error, results) => {
                if(error) { rejeitado(error); return; }
                    aceito(results);
            })
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