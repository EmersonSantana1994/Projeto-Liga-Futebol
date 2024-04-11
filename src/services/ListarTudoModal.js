const db = require('../db');

module.exports = {
    listarTudo: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT j.nome as Jogador, t.nome as Time, l.nome As Liga FROM jogadores j \
            left join times_tb t on j.id_time = t.id_time left join ligas l on t.id_liga = l.id \
            left join artilheiro a on a.id_jogador = j.id_jogador', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },
}