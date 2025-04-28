const db = require('../db');

module.exports = {
    buscarJogadorTabela: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM jogadores Where (nome = ?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarJogadorTabelaArtilheiro: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM artilheiro Where (nome = ?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarJogadorTabelaAssistencia: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM assistencia Where (nome = ?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarJogadorTabelaArtilheiroTorneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM artilheiro_torneio Where (nome = ?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarJogadorTabelaAssistenciaTorneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM assistencia_torneio Where (nome = ?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    excluirGolArtilheiro: (gols, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE artilheiro SET gols = ? WHERE (nome = ?);', [gols, nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    excluirGolAssistencia: (gols, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE assistencia SET assistencias = ? WHERE (nome = ?);', [gols, nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    excluirGolArtilheiroTorneio: (gols, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE artilheiro_torneio SET gols = ? WHERE (nome = ?);', [gols, nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    excluirGolAssistenciaTorneio: (gols, nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE assistencia_torneio SET assistencias = ? WHERE (nome = ?);', [gols, nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    excluirJogadorArtilheiro: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM artilheiro WHERE (nome = ?);', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    excluirJogadorAssistencia: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM assistencia WHERE (nome = ?);', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    excluirJogadorArtilheiroTorneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM artilheiro_torneio WHERE (nome = ?);', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    excluirJogadorAssistenciaTorneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM assistencia_torneio WHERE (nome = ?);', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    deletarTimePlacar: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM placar_jogo WHERE (nome = ?);', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarTimeJogador: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select t.nome from jogadores j \
            left join times_tb t on t.id_time = j.id_time \
            where j.nome = ?;', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    verificarTime: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM placar_jogo Where (nome = ?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarTodos: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM placar_jogo', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },


    inserir: (nome, placar) => {
        console.log("")
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO placar_jogo (nome, placar) VALUES (?, ?)', [nome, placar ], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    atualiza: (id, placar,) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE placar_jogo SET placar = ? WHERE (nome = ?);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    limpar: (placar, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM placar_jogo WHERE (id <> 0);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    limpar: (placar, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM placar_jogo WHERE (id <> 0);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },
}