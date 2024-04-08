const db = require('../db');

module.exports = {

    artilheiro: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS artilheiro(id bigint AUTO_INCREMENT, gols bigint, nome varchar(255), PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    ranking_clubes: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS ranking_clubes(id bigint AUTO_INCREMENT, nome varchar(255), pontos bigint, posicao varchar(100), PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    ranking_jogadores: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS ranking_jogadores(id bigint AUTO_INCREMENT, nome varchar(255), pontos bigint, PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    resultados: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS resultados(id bigint AUTO_INCREMENT, resultado varchar(100), data timestamp, PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    tb_usuario: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS tb_usuario(id bigint AUTO_INCREMENT, senha varchar(255), usuario varchar(255), PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    times_sorteados: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS times_sorteados(id bigint AUTO_INCREMENT, nome varchar(255), PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    torneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS torneio(id bigint AUTO_INCREMENT, nome varchar(255), pontos bigint, saldo bigint, PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    users: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS users(id bigint AUTO_INCREMENT, nome varchar(100), PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    ligas: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS ligas(id bigint unsigned not null AUTO_INCREMENT, nome varchar(255), PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    times_tb: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS times_tb(id_time bigint unsigned not null AUTO_INCREMENT, nome varchar(255), id int unsigned not null, index tm_lg_index(id), foreign key (id_time) references ligas(id) on delete cascade, PRIMARY KEY (id_time));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    jogadores: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS jogadores(id_jogador bigint unsigned not null AUTO_INCREMENT, nome varchar(255), id_time int unsigned not null, index jg_tm_index(id_time), foreign key (id_jogador) references times_tb(id_time) on delete cascade, PRIMARY KEY (id_jogador));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    pontos_troneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS pontos_troneio(id bigint AUTO_INCREMENT, nome varchar(255), pontos bigint, PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
   
    };