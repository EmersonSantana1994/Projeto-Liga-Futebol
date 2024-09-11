const db = require('../db');

module.exports = {

    listar: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query(' select j.nome, t.liga, t.subLiga, t.mundial, t.recopa, t.copa, t.superCopa from titulos t\
            left join jogadores j on j.id_jogador = t.id_jogador', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    buscarNomeJogador: (nomeToneio, id) => {
 
        if(nomeToneio == 'liga'){
            return new Promise((aceito, rejeitado)=>{
                db.query('SELECT liga FROM titulos Where (id_jogador = ?) ', [id], (error, results) => {
                    if(error) { 
                        rejeitado(error); 
                        return; }
                        aceito(results);
                });
            });  
        }
        else if(nomeToneio == 'subLiga'){
            return new Promise((aceito, rejeitado)=>{
                db.query('SELECT subLiga FROM titulos Where (id_jogador = ?) ', [id], (error, results) => {
                    if(error) { 
                        rejeitado(error); 
                        return; }
                        aceito(results);
                });
            });
        }
        else if(nomeToneio == 'mundial'){
            return new Promise((aceito, rejeitado)=>{
                db.query('SELECT mundial FROM titulos Where (id_jogador = ?) ', [id], (error, results) => {
                    if(error) { 
                        rejeitado(error); 
                        return; }
                        aceito(results);
                });
            });
        }
        else if(nomeToneio == 'recopa'){
            return new Promise((aceito, rejeitado)=>{
                db.query('SELECT recopa FROM titulos Where (id_jogador = ?) ', [id], (error, results) => {
                    if(error) { 
                        rejeitado(error); 
                        return; }
                        aceito(results);
                });
            });
        }
        else if(nomeToneio == 'copa'){
            return new Promise((aceito, rejeitado)=>{
                db.query('SELECT copa FROM titulos Where (id_jogador = ?) ', [id], (error, results) => {
                    if(error) { 
                        rejeitado(error); 
                        return; }
                        aceito(results);
                });
            });
        }
        else if(nomeToneio == 'superCopa'){
            return new Promise((aceito, rejeitado)=>{
                db.query('SELECT superCopa FROM titulos Where (id_jogador = ?) ', [id], (error, results) => {
                    if(error) { 
                        rejeitado(error); 
                        return; }
                        aceito(results);
                });
            });
        }
    
},

// CREATE TABLE IF NOT EXISTS titulos(id_jog_titulo bigint AUTO_INCREMENT, liga bigint, subLiga bigint, mundial bigint, recopa bigint, copa bigint, superCopa bigint,  id_jogador bigint unsigned not null, 
//     index im_jg_index(id_jogador), foreign key (id_jogador) references jogadores(id_jogador) on delete cascade, PRIMARY KEY (id_jog_titulo));
    


adicionar: (nomeToneio, id, soma) => {
    if(nomeToneio == 'liga'){
        console.log("jjjjjj")
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO titulos ( id_jogador, liga) VALUES (?,?) ', [ id, soma], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });  
    }
    else if(nomeToneio == 'subLiga'){
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO titulos ( id_jogador, subLiga) VALUES (?,?) ', [id, soma], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    }
    else if(nomeToneio == 'mundial'){
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO titulos ( id_jogador, mundial) VALUES (?,?) ', [ id, soma], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    }
    else if(nomeToneio == 'recopa'){
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO titulos ( id_jogador, recopa) VALUES (?,?) ', [id, soma], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    }
    else if(nomeToneio == 'copa'){
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO titulos ( id_jogador, copa) VALUES (?,?) ', [ id, soma], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    }
    else if(nomeToneio == 'superCopa'){
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO titulos ( id_jogador, superCopa) VALUES (?,?) ', [ id, soma], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    }

},
update: (nomeToneio, id, soma) => {
    console.log("sssssss", soma)
    if(nomeToneio == 'liga'){
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE titulos SET liga = ? WHERE (id_jogador = ?) ', [ soma, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });  
    }
    else if(nomeToneio == 'subLiga'){
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE titulos SET subLiga = ? WHERE (id_jogador = ?) ', [ soma, id], (error, results)  => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    }
    else if(nomeToneio == 'mundial'){
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE titulos SET mundial = ? WHERE (id_jogador = ?) ', [ soma, id], (error, results)  => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    }
    else if(nomeToneio == 'recopa'){
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE titulos SET recopa = ? WHERE (id_jogador = ?) ', [ soma, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    }
    else if(nomeToneio == 'copa'){
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE titulos SET copa = ? WHERE (id_jogador = ?) ', [ soma, id], (error, results)  => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    }
    else if(nomeToneio == 'superCopa'){
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE titulos SET superCopa = ? WHERE (id_jogador = ?) ', [ soma, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    }
},
}