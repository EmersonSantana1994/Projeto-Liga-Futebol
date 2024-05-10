const db = require('../db');

module.exports = {
    listarTudo: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT j.id_jogador as id, j.nome as Jogador, t.nome as Time, l.nome As Liga, a.gols, j.pais, j.posicao FROM jogadores j \
            left join times_tb t on j.id_time = t.id_time left join ligas l on t.id_liga = l.id \
            left join artilheiro a on a.id_jogador = j.id_jogador', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    jogador: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT j.id_jogador as id, j.nome as Jogador, t.nome as Time, l.nome As Liga, a.gols, j.pais, j.posicao FROM jogadores j \
            left join times_tb t on j.id_time = t.id_time left join ligas l on t.id_liga = l.id \
            left join artilheiro a on a.id_jogador = j.id_jogador  where j.nome = ?', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    gols: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT j.id_jogador as id, j.nome as Jogador, t.nome as Time, l.nome As Liga, a.gols, j.pais, j.posicao FROM jogadores j \
            left join times_tb t on j.id_time = t.id_time left join ligas l on t.id_liga = l.id \
            left join artilheiro a on a.id_jogador = j.id_jogador where a.gols = ?', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    liga: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT j.id_jogador as id, j.nome as Jogador, t.nome as Time, l.nome As Liga, a.gols, j.pais, j.posicao FROM jogadores j \
            left join times_tb t on j.id_time = t.id_time left join ligas l on t.id_liga = l.id \
            left join artilheiro a on a.id_jogador = j.id_jogador where l.nome = ?', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    nacionalidade: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT j.id_jogador as id, j.nome as Jogador, t.nome as Time, l.nome As Liga, a.gols, j.pais, j.posicao FROM jogadores j \
            left join times_tb t on j.id_time = t.id_time left join ligas l on t.id_liga = l.id \
            left join artilheiro a on a.id_jogador = j.id_jogador where j.pais = ?', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    posicao: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT j.id_jogador as id, j.nome as Jogador, t.nome as Time, l.nome As Liga, a.gols, j.pais, j.posicao FROM jogadores j \
            left join times_tb t on j.id_time = t.id_time left join ligas l on t.id_liga = l.id \
            left join artilheiro a on a.id_jogador = j.id_jogador where j.posicao = ?', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    time: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT j.id_jogador as id, j.nome as Jogador, t.nome as Time, l.nome As Liga, a.gols, j.pais, j.posicao FROM jogadores j \
            left join times_tb t on j.id_time = t.id_time left join ligas l on t.id_liga = l.id \
            left join artilheiro a on a.id_jogador = j.id_jogador where t.nome = ?', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
}