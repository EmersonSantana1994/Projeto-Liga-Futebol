const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const HealfModal = require('../services/HealfModal');
const CopaModal = require('../services/CopaModel');
const SECRET = 'emesantana'
let cript = false
const neo4j = require('neo4j-driver');
const neo4jDriver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '12345678'));
const RollBack = require('../services/RollBack');


module.exports = {

    async buscarTodos(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await CopaModal.buscarTodos();
            json.result = futebol
        return res.json(json.result)
    },


    async questionariddo(req, res) {
        let json = { error: '', result: {} };

        for (let j = 0; j < req.body.tamanho; j++) {
            let inserir = await CopaModal.cadastrarTime(req.body.nome[j] );
            if (inserir) {
                json.result = inserir; //se tiver nota ele joga no json
            }
            
        }
        return res.json(json)
       
           
    },

    async questionario(req, res) {
        let json = { error: '', result: {} };

        try{
            await RollBack.transaction();
            let inserir1 = await HealfModal.sono(req.body.perguntaSono );
            let inserir2 = await HealfModal.nutricao(req.body.perguntaNutricao);
            let inserir3 = await HealfModal.mente(req.body.perguntaMente);
            let inserir4 = await HealfModal.sexualidade(req.body.perguntaSexualidade);
            let inserir = await HealfModal.pessoa(req.body.nome, inserir1.insertId, inserir2.insertId, inserir3.insertId, inserir4.insertId, req.body.idade );


        const neo4jQuery1 = `CREATE (:Pessoa {nome: '${req.body.nome}'}) 
        CREATE (:Mente {nome: '${req.body.perguntaMente}'}) 
        CREATE (:Sexualidade {nome: '${req.body.perguntaSexualidade}'}) 
        CREATE (:Sono {nome: '${req.body.perguntaSono}'}) 
        CREATE (:Nutricao {nome: '${req.body.perguntaNutricao}'})`


      const neo4jQuery2  =  `MATCH (u:User {nome: '${req.body.nome}'}), (p:Nutricao {nome: '${req.body.perguntaNutricao}', idade: '${req.body.idade}'}) CREATE (u)-[:RespostaNutricao]->(p)
        MATCH (u:User {nome: '${req.body.nome}'}), (p:Mente {nome: '${req.body.perguntaMente}'}) CREATE (u)-[:RespostaMente]->(p)
        MATCH (u:User {nome: '${req.body.nome}'}), (p:Sexualidade {nome: '${req.body.perguntaSexualidade}'}) CREATE (u)-[:RespostaSexualidade]->(p)
        MATCH (u:User {nome: '${req.body.nome}'}), (p:Sono {nome: '${req.body.perguntaSono}'}) CREATE (u)-[:RespostaSono]->(p)`;

// para chamar todos no neo4j
// MATCH (a)-[:RespostaNutricao|RespostaMente]->(b) RETURN a, b;

        
        const neo4jSession = neo4jDriver.session();
        neo4jSession
    // .run(neo4jQuery1, neo4jQuery3, neo4jQuery4, neo4jQuery5, neo4jQuery7, neo4jQuery8, neo4jQuery9)
 
    .run(neo4jQuery1)
    .then(result => {
     relacionar(req.body.nome, req.body.perguntaNutricao, req.body.perguntaMente, req.body.perguntaSexualidade, req.body.perguntaSono)
    })
    .catch(error => {
      console.error('Erro ao importar dados para Neo4j', error);
      RollBack.rollBack();
      console.log('Roll Back realizado depois do neo4j');
    })

            if (inserir) {
                json.result = inserir; //se tiver nota ele joga no json
            }
            
            await RollBack.commit();
        return res.json(json)
        }catch(erro){
            await RollBack.rollBack();
            console.log('Erro na execução, Roll Back realizado', erro );
            return res.status(500).send('Erro na execução, Roll Back realizado')
       }
               
    },

 
}

async function relacionar(nome, nutricao, mente, sexualidade, sono){

     HealfModal.sonoNeo(nome, sono)
     HealfModal.menteNeo(nome, mente)
     HealfModal.sexualidadeNeo(nome, sexualidade)
     HealfModal.nutricaoNeo(nome, nutricao)
}