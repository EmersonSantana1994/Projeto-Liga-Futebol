const { async } = require('parse/lib/browser/Storage');
const ArtilheiroModel = require('../services/ArtilheiroModel');
const AssitenciaModel = require('../services/AssitenciaModel');
const jwt = require('jsonwebtoken')
const SECRET = 'emesantana'
const axios = require('axios');
let cript = false

async function verifyJWT(req, res, next){
    cript = false
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err){
            cript = true
            return 'não autenticado'
        } 
        req.userId = decoded.userId;
        // next();
    })
    
    }



module.exports = {
    async buscarTodos(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let todosArtilheiro = await AssitenciaModel.buscarTodos();
            json.result = todosArtilheiro
        return res.json(json.result)
    },

    async buscarJogador(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let todosArtilheiro = await ArtilheiroModel.buscarJogador(req.body.nome);
            json.result = todosArtilheiro
        return res.json(json.result)
    },

    async buscarTodosTorneio(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let todosArtilheiro = await AssitenciaModel.buscarTodosTorneio();
            json.result = todosArtilheiro
        return res.json(json.result)
    },


    async  teste(req, res) {

        maisumteste()

        try {
          const headers = {
            'Authorization': 'Bearer 4919583d-10bf-492a-a7b5-3efbbdf5c7e7',
            'Content-Type': 'application/json',
          };
          const response = await axios.post('https://api.fireflies.ai/graphql', {
            query: `
            query {
              transcripts {
                  id
                  title
                  fireflies_users
                  participants
                  date
                  transcript_url
                  duration
              }
          }
            `,
          }, { headers });
          const data = response.data;
          console.log("lllll", data.data )
          resposta = data.data;
        } catch (error) {
          console.error('Erro ao fazer a requisição GraphQL:', error);
          res.status(500).json({ error: 'Erro ao processar a requisição' });
        }
        return resposta
        },

    async inserirPontos(req, res) {
        let inserir 
        let json = { error: '', result: {} };

        let dados = { assistencia: req.body.assistencia, nome: req.body.nome  }
        let buscarIdJogador =  await ArtilheiroModel.buscarJogadorTabela(req.body.nome);
        if(buscarIdJogador.length == 0){
            return res.status(500).send('Jogador não cadastrado na tebla de jogadores')
        }
        let buscarJogadorTorneio = await AssitenciaModel.buscarJogadorTorneio(req.body.nome);
        let buscarJogador = await AssitenciaModel.buscarJogador(req.body.nome);
            if(buscarJogador.length > 0){
                let atualiza =  req.body.assistencia + buscarJogador[0].assistencias  
                await AssitenciaModel.atualizaPontos(dados, atualiza);
            }
            else{
                inserir = await AssitenciaModel.inserirPontos(dados, buscarIdJogador[0].id_jogador);
            }
            if(buscarJogadorTorneio.length > 0){
                let atualiza =  req.body.assistencia + buscarJogadorTorneio[0].assistencias  
                   await AssitenciaModel.atualizaPontosToneio(dados, atualiza);
               }else{
                   await AssitenciaModel.inserirPontosTorneio(dados, req.body.assistencia);
               }
            if (inserir) {
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
        
    },


    async deleteJogador(req, res) {
        let json = { error: '', result: {} };

        let dados = {id: req.body.id}
            let inserir = await ArtilheiroModel.deleteJogador(dados);
            if (inserir) {  
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async deleteJogadorTorneio(req, res) {
        let json = { error: '', result: {} };

        let dados = {id: req.body.id}
            let inserir = await ArtilheiroModel.deleteJogadorTorneio(dados);
            if (inserir) {  
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async buscarUm(req, res) {
        let json = { error: '', result: {} };
        let codigo = req.body;
        let futebol = await LoginModel.buscarUm(codigo);
        if (futebol) {
            json.result = futebol; //se tiver nota ele joga no json
        }

        return res.json(json)
    },



    async cadastrar(req, res) {
        let json = { error: '', result: {} };

        let codigo = req.body;
        let hashedPassword = await bcrypt.hash(req.body.senha, 10);
        let user = { usuario: req.body.usuario, senha: hashedPassword }
        let verificarUsuario = await LoginModel.verificarUsuario(user.usuario);
        if (verificarUsuario) {
            let cadastro = await LoginModel.cadastrar(user);
            if (cadastro) {
                json.result = cadastro; //se tiver nota ele joga no json
            }
            return res.json(json)
        } else {
            return res.status(500).send('Usuario já existe na base de dados')
        }

    },

    async login(req, res) {
        let json = { error: '', result: {} };
        let buscarUsuario = await LoginModel.buscarUsuario(req.body.usuario);
        if (buscarUsuario != 'atencao' && buscarUsuario) {
            if (await bcrypt.compare(req.body.senha, buscarUsuario[0].senha)) {
             const token =  jwt.sign({userId: 1}, SECRET, {expiresIn: "1 days"})
             return res.json({auth: true, token})
                // return res.status(200).send('Você esta logado!')
            }else{
                return res.status(500).send('Senha encorreta')
            }
        } else if (buscarUsuario == 'atencao') {
            return res.status(500).send('Existem dois usuarios com o este mesmo nome registrados na base')
        }
        else {
            return res.status(500).send('Usuario nao existe na base de dados')
        }

    }
}