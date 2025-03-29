const db = require('../db');

module.exports = {
    listarTudo: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT j.id_jogador as id, j.nome as Jogador, t.nome as Time, l.nome As Liga, a.gols, ass.assistencias, j.pais, j.posicao FROM jogadores j \
            left join times_tb t on j.id_time = t.id_time left join ligas l on t.id_liga = l.id \
            left join artilheiro a on a.id_jogador = j.id_jogador \
            left join assistencia ass on ass.id_jogador = j.id_jogador order by a.gols, ass.assistencias desc',
             (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    golsPais: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select SUM(a.gols) As Gols , j.pais As Pais from jogadores j \
            left join artilheiro a on j.id_jogador = a.id_jogador \
            GROUP BY j.pais ORDER BY SUM(a.gols) DESC;', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    golsLiga: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select SUM(a.gols) As Gols, l.nome from jogadores j \
            left join times_tb t on t.id_time = j.id_time \
            left join ligas l on l.id = t.id_liga \
            left join artilheiro a on j.id_jogador = a.id_jogador \
            GROUP BY l.nome ORDER BY SUM(a.gols) DESC;', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    golsTime: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select SUM(a.gols) As Gols, t.nome from jogadores j \
            left join times_tb t on t.id_time = j.id_time \
            left join ligas l on l.id = t.id_liga \
            left join artilheiro a on j.id_jogador = a.id_jogador \
            GROUP BY t.nome ORDER BY SUM(a.gols) DESC;', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    golsPosicao: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select SUM(a.gols) As Gols, j.posicao from jogadores j \
            left join times_tb t on t.id_time = j.id_time \
            left join ligas l on l.id = t.id_liga \
            left join artilheiro a on j.id_jogador = a.id_jogador \
            GROUP BY j.posicao ORDER BY SUM(a.gols) DESC;', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    listarDono: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select j.nome As dono, t.nome As time, l.nome As liga from  jogadores j \
            left join times_tb t on j.id_time = t.id_time \
            left join ligas l on l.id = t.id_liga \
            where j.dono = 1 \
            order by l.nome asc', (error, results) => {
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
            left join artilheiro a on a.id_jogador = j.id_jogador  where j.nome = ? order by a.gols desc', [nome], (error, results) => {
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
            left join artilheiro a on a.id_jogador = j.id_jogador where l.nome = ? order by a.gols desc', [nome], (error, results) => {
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
            left join artilheiro a on a.id_jogador = j.id_jogador where j.pais = ? order by a.gols desc', [nome], (error, results) => {
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
            left join artilheiro a on a.id_jogador = j.id_jogador where j.posicao = ? order by a.gols desc', [nome], (error, results) => {
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
            left join artilheiro a on a.id_jogador = j.id_jogador where t.nome = ? order by a.gols desc', [nome], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
}