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
            db.query('CREATE TABLE IF NOT EXISTS jogadores(id_jogador bigint unsigned not null AUTO_INCREMENT, nome varchar(255), pais varchar(100), posicao varchar(100), foto longblob, id_time bigint unsigned not null, dono int, index jg_tm_index(id_time), foreign key (id_time) references times_tb(id_time) on delete cascade, PRIMARY KEY (id_jogador));', [], (error, results) => {
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

    placar_jogo: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS placar_jogo(id bigint AUTO_INCREMENT, nome varchar(100), placar int, PRIMARY KEY (id));;', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    ranking_titulos: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS ranking_titulos(id bigint AUTO_INCREMENT, nomeJogador varchar(100), liga int, copa int, subLiga int, mundial int, superCopa int, total int, PRIMARY KEY (id));', 
                [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1s
                    aceito(results);    
            })
        });
    },

    assistencia: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS assistencia(id bigint AUTO_INCREMENT, assistencias bigint, nome varchar(255), id_jogador bigint unsigned not null, index ar_jg_index(id_jogador), foreign key (id_jogador) references jogadores(id_jogador) on delete cascade, PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    assistenciaTorneio: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS assistencia_torneio(id bigint AUTO_INCREMENT, assistencias bigint, nome varchar(255), PRIMARY KEY (id));', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    log: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('CREATE TABLE IF NOT EXISTS log(id int AUTO_INCREMENT, log int, PRIMARY KEY (id));', [], (error, results) => {
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
    verificarResultadosPontos: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('Select * from pontos_troneio where id > 0;', [], (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },

    salvarIdResultadosPontos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO pontos_troneio (nome, pontos) VALUES
                ('Primeiro lugar no Campeonato Mundial', 400),
                ('Primeiro lugar na Super Copa', 370),
                ('Segundo lugar no Campeonato Mundial', 300),
                ('Segundo lugar na Super Copa', 270),
                ('Terceiro lugar no Campeonato Mundial', 200),
                ('Terceiro lugar na Super Copa', 170),
                ('Quarto lugar na Super Copa', 70),
                ('Primeiro lugar na liga', 100),
                ('Quarto lugar no Campeonato Mundial', 100),
                ('Primeiro lugar na Copa', 100),
                ('Primeiro lugar na Sub-Liga', 90),
                ('Segundo lugar na liga', 60),
                ('Quinto lugar no Campeonato Mundial', 60),
                ('Segundo lugar na Copa', 60),
                ('Segundo lugar na Sub-Liga', 50),
                ('Sexto lugar no Campeonato Mundial', 40),
                ('Terceiro lugar na liga', 30),
                ('Terceiro lugar na Copa', 30),
                ('Terceiro lugar na Sub-Liga', 20),
                ('Sétimo lugar no Campeonato Mundial', 20),
                ('Primeiro lugar na Recopa', 5);`,
            [], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    logInsert: (cont) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO log (log) VALUES
                (?);`,
            [cont], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
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
//lembrando, se for referenciar uma tabela usando o id principal da tabela principal, a tabela alterada tem que estar ZERADA de dados pq o id ele é not null 

    //ALTER TABLE artilheiro ADD COLUMN id_jogador bigint unsigned not null, ADD foreign key (id_jogador) references jogadores(id_jogador) on delete cascade;
//ATENÇÂO se caso estiver dando erro é por causa que no momento de criar as duas tabelas a principal e a alterada que o id delas não foi criado com o "unsigned" na frendo do tipo por exemplo  id bigint unsigned AUTO_INCREMENT PRIMARY KEY,

//ABAIXO mostrar como criar uma tabela onde a data é inserida automaticamente quando é feito um insert

//CREATE TABLE IF NOT EXISTS resultados(id bigint AUTO_INCREMENT, resultado varchar(100), data DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));


//ABAIXO mostrar como criar uma tabela onde a data é inserida automaticamente quando é feito um update

// CREATE TABLE IF NOT EXISTS resultados(id bigint AUTO_INCREMENT, resultado varchar(100), data DATETIME ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id));

//ABAIXO mostra como fazer uma tabela se relacionando com MAIS DE UMA TABELA


//lembrando que tem que inserir o unsigned na coluna quando vc criar a tabela principal
//CREATE TABLE IF NOT EXISTS pessoa(id_pessoa bigint unsigned not null AUTO_INCREMENT, nome varchar(255), id_mente bigint unsigned not null, id_sono bigint unsigned not null, id_sexualidade bigint unsigned not null, id_nutricao bigint unsigned not null,  index jg_so_index(id_sono), index jg_me_index(id_mente), index jg_se_index(id_sexualidade), index jg_nu_index(id_nutricao), foreign key (id_mente)  references mente(id_mente) on delete cascade, foreign key (id_sexualidade) references sexualidade(id_sexualidade) on delete cascade, foreign key (id_nutricao)  references nutricao(id_nutricao) on delete cascade, foreign key (id_sono)  references sono(id_sono) on delete cascade,   PRIMARY KEY (id_pessoa));

    };