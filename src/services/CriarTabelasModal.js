const db = require('../db');

module.exports = {
    
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
            db.query('CREATE TABLE IF NOT EXISTS resultados(id bigint AUTO_INCREMENT, resultado varchar(100), data DATETIME ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id));', [], (error, results) => {
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
            db.query('CREATE TABLE IF NOT EXISTS times_tb(id_time bigint unsigned not null AUTO_INCREMENT, nome varchar(255), id_liga bigint unsigned not null, index liga_time_index(id_liga), foreign key (id_liga) references ligas(id) on delete cascade, PRIMARY KEY(id_time));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    jogadores: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS jogadores(id_jogador bigint unsigned not null AUTO_INCREMENT, nome varchar(255), pais varchar(100), posicao varchar(100), foto longblob, id_time bigint unsigned not null, index jg_tm_index(id_time), foreign key (id_time) references times_tb(id_time) on delete cascade, PRIMARY KEY (id_jogador));', [], (error, results) => {
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

    verificarSeTemSemLiga: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('Select * from ligas where nome = "Sem liga";', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    verificarSeTemSemTime: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('Select * from times_tb where nome = "Sem time";', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    artilheiro: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS artilheiro(id bigint AUTO_INCREMENT, gols bigint, nome varchar(255), id_jogador bigint unsigned not null, index ar_jg_index(id_jogador), foreign key (id_jogador) references jogadores(id_jogador) on delete cascade, PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    artilheiroTorneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS artilheiro_torneio(id bigint AUTO_INCREMENT, gols bigint, nome varchar(255), PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    placares_copa: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS resultados_copa(id bigint AUTO_INCREMENT, nome varchar(200), placar bigint, fase varchar(200), data DATETIME ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    times_copa: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS times_copa(id bigint AUTO_INCREMENT, nome varchar(200), PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    verificarResultados: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('Select * from resultados where id > 0;', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    verificarResultadosCopa: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('Select * from resultados_copa where id > 0;', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },


    
    salvarIdResultados: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados` (resultado, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    salvarIdResultadosCopa: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
            db.query('INSERT INTO `bancodeteste`.`resultados_copa` (placar, data ) VALUES (null, null);', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })

        });
        
    },


    buscarIdsemLiga: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('Select id from ligas where nome = "Sem liga";', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
    
    // semTime: (id) => {
    //     return new Promise((aceito, rejeitado)=>{
    //         db.query('INSERT INTO times_tb (nome, id_liga) VALUES ("Sem time", ?);', [id], (error, results) => {
    //             if(error) { rejeitado(error); return; }
    //            //vai verificar se retornou mais de 1 e pegar o 1
    //                 aceito(results);    
    //         })
    //     });
    // },
    
   
//ABAIXO mostra como adicionar uma coluna na tabela e referenciala com outra tabela

    //ALTER TABLE artilheiro ADD COLUMN id_jogador bigint unsigned not null, ADD foreign key (id_jogador) references jogadores(id_jogador) on delete cascade;


//ABAIXO mostrar como criar uma tabela onde a data é inserida automaticamente quando é feito um insert

//CREATE TABLE IF NOT EXISTS resultados(id bigint AUTO_INCREMENT, resultado varchar(100), data DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));


//ABAIXO mostrar como criar uma tabela onde a data é inserida automaticamente quando é feito um update

// CREATE TABLE IF NOT EXISTS resultados(id bigint AUTO_INCREMENT, resultado varchar(100), data DATETIME ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id));

//

    };