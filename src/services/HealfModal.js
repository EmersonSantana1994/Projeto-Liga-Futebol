const db = require('../db');
const neo4j = require('neo4j-driver');
const neo4jDriver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));

module.exports = {
    buscarTodos: (nome) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM times_copa', (error, results) => {
                if(error) { rejeitado(error); return; }
               //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results);    
            })
        });
    },


    sono: (nome) => {
        console.log("")
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO sono (nome) VALUES (?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    mente: (nome) => {
        console.log("")
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO mente (nome) VALUES (?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    sexualidade: (nome) => {
        console.log("")
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO sexualidade (nome) VALUES (?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    nutricao: (nome) => {
        console.log("")
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO nutricao (nome) VALUES (?)', [nome], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },
    pessoa: (nome, sono, nutricao, mente, sexualidade, idade) => {
        console.log("")
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO pessoa (nome, id_mente, id_sono, id_nutricao, id_sexualidade, idade) VALUES (?, ?, ?, ?, ?, ?)', [nome,mente,sono,nutricao,sexualidade,idade], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });      
    },


    sonoNeo: (nome, sono) => {
        const neo4jQuery =  `MATCH (u:Pessoa {nome: '${nome}'}), (p:Sono {nome: '${sono}'}) CREATE (u)-[:RespostaSono]->(p)`; 
        const neo4jSession = neo4jDriver.session();
    neo4jSession
    .run(neo4jQuery)
    .then(result => {
    console.log("dados no Neo4j Sono importatos com sucesso")
       })
       .catch(error => {
         console.error('Erro ao importar dados para Neo4j', error);
       })
    },

    menteNeo: (nome, mente) => {
        const neo4jQuery = `MATCH (u:Pessoa {nome: '${nome}'}), (p:Mente {nome: '${mente}'}) CREATE (u)-[:RespostaMente]->(p)`
        const neo4jSession = neo4jDriver.session();
    neo4jSession
    .run(neo4jQuery)
    .then(result => {
    console.log("dados no Neo4j Mente importatos com sucesso")
       })
       .catch(error => {
         console.error('Erro ao importar dados para Neo4j', error);
       })
    },

    sexualidadeNeo: (nome, sexualidade) => {
        const neo4jQuery = `MATCH (u:Pessoa {nome: '${nome}'}), (p:Sexualidade {nome: '${sexualidade}'}) CREATE (u)-[:RespostaSexualidade]->(p)` 
        const neo4jSession = neo4jDriver.session();
    neo4jSession
    .run(neo4jQuery)
    .then(result => {
    console.log("dados no Neo4j sexualidade importatos com sucesso")
       })
       .catch(error => {
         console.error('Erro ao importar dados para Neo4j', error);
       })
    },

    nutricaoNeo: (nome, nutricao) => {
        const neo4jQuery = `MATCH (u:Pessoa {nome: '${nome}'}), (p:Nutricao {nome: '${nutricao}'}) CREATE (u)-[:RespostaNutricao]->(p)`
        const neo4jSession = neo4jDriver.session();
    neo4jSession
    .run(neo4jQuery)
    .then(result => {
    console.log("dados no Neo4j importatos Nutricao com sucesso")
       })
       .catch(error => {
         console.error('Erro ao importar dados para Neo4j', error);
       })
    },




    cadastrar_placar: (placar, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE resultados_copa SET placar = ? WHERE (id = ?);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

    limpar: (placar, id) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE resultados_copa SET placar = null, data = null WHERE (id <> 0);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
            db.query('DELETE FROM times_copa WHERE (id <> 0);', [placar, id], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },
}