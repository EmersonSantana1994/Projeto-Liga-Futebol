const { async } = require('parse/lib/browser/Storage');
const LoginModel = require('../services/LoginModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = 'emesantana'

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err){return res.status(500).send('sem autenticacao');} 
        req.userId = decoded.userId;
        // next();
    })
    
    }

module.exports = {
    async buscarTodos(req, res) {
        verifyJWT(req, res)
        console.log(req.userId + 'fez esta chamada')
        let json = { error: '', result: [] };
        let futebol = await LoginModel.buscarTodos();

        for (let i in futebol) {
            json.result.push({
                codigo: futebol[i].nome,
                descricao: futebol[i].pontos
            });

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