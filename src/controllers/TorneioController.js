const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const TorneioModel = require('../services/TorneioModel');
const SECRET = 'emesantana'
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
    
    async buscarTodos(req, res, next) {
    //   let autenticar = verifyJWT(req, res)
    //   if(autenticar){
    //   return  res.status(500).send("sem autenticar")
    //   }
        let json = { error: '', result: [] };
        let futebol = await LoginModel.buscarTodos();
        json.result = futebol
        return res.json(json.result)
    },

    async deleteTimeSorteado(req, res) {
        let json = { error: '', result: {} };

        let dados = {id: req.body.id}
            let inserir = await TorneioModel.deleteTimeSorteado(dados);
            if (inserir) {  
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async deletar(req, res) {
        let json = { error: '', result: {} };

        let dados = {id: req.body.id}
            let inserir = await TorneioModel.deletar(dados);
            if (inserir) {  
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async cadastrarTime(req, res) {
        let json = { error: '', result: {} };

        let dados = { pontos: req.body.pontos, nome: req.body.nome, saldo: req.body.saldo  }
            let inserir = await TorneioModel.cadastrarTime(dados);
            if (inserir) {
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async buscarUm(req, res) {
        let json = { error: '', result: {} };
        let codigo = req.body;
        let futebol = await TorneioModel.buscarUm(codigo);
        if (futebol) {
            json.result = futebol; //se tiver nota ele joga no json
        }

        return res.json(json)
    },

    async bucarNome(req, res) {
        let json = { error: '', result: {} };
        let nome = req.body.nome;
        let format = nome.toLowerCase()
        let futebol = await TorneioModel.bucarNome(format);
        if (futebol) {
            json.result = futebol; //se tiver nota ele joga no json
        }
        return res.json(json.result)
    },


    async timeSorteado(req, res) {
        let json = { error: '', result: {} };
        let dados = {nome: req.body.nome }
        let futebol = await TorneioModel.timeSorteado();
        if (futebol) {
            json.result = futebol; //se tiver nota ele joga no json
        }

        return res.json(json.result)
    },

    
    async bucarTimeSorteados(req, res) {
        let json = { error: '', result: {} };
        let futebol = await TorneioModel.bucarTimeSorteados();
        if (futebol) {
            json.result = futebol; //se tiver nota ele joga no json
        }

        return res.json(json.result)
    },

    async atualizaTime(req, res) {
        let json = { error: '', result: {} };

        let dados = {id: req.body.id, pontos: req.body.pontos, saldo: req.body.saldo  }
            let inserir = await TorneioModel.atualizaTime(dados);
            if (inserir) {  
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async atualizaTimeSorteado(req, res) {
        let json = { error: '', result: {} };

        let dados = {id: req.body.id, nome: req.body.nome }
            let inserir = await TorneioModel.atualizaTimeSorteado(dados);
            if (inserir) {  
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async salvarPlacar(req, res) {
        let json = { error: '', result: {} };

        let dados = {id: req.body.id, resultado: req.body.resultado}
            let inserir = await TorneioModel.salvarPlacar(dados);
            if (inserir) {  
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async buscarPlacar(req, res) {
        let json = { error: '', result: {} };

        let dados = {id: req.body.id}
            let inserir = await TorneioModel.buscarPlacar(dados);
            if (inserir) {  
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async buscarPlacares(req, res) {
        let json = { error: '', result: {} };

        let dados = {id: req.body.id}
            let inserir = await TorneioModel.buscarPlacares(dados);
            if (inserir) {  
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async deletarPlacar(req, res){
        let json = { error: '', result: {} };
        let dados = {id: req.body.id}
        let inserir = await TorneioModel.deletarPlacar(dados);
            if (inserir) {  
                json.result = inserir; //se tiver nota ele joga no json
            }
            return res.json(json)
    },

    async cadastrarTimeSorteado(req, res) {
        let json = { error: '', result: {} };

        let dados = { nome: req.body.nome  }
            let inserir = await TorneioModel.cadastrarTimeSorteado(dados);
            if (inserir) {
                json.result = inserir;
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