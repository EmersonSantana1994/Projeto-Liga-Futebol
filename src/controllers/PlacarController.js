const { async } = require('parse/lib/browser/Storage');
const PlacarModel = require('../services/PlacarModel');
const jwt = require('jsonwebtoken')
const SECRET = 'emesantana'
const axios = require('axios');
let cript = false
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');



async function verifyJWT(req, res, next) {
    cript = false
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            cript = true
            return 'não autenticado'
        }
        req.userId = decoded.userId;
        // next();
    })

}



module.exports = {
    async inserir(req, res) {
        let inserir
        let json = { error: '', result: {} };

        let dados = { gols: req.body.gols, nome: req.body.nome }
        let buscarIdJogador = await PlacarModel.buscarJogadorTabela(req.body.nome);
        if (buscarIdJogador.length == 0) {
            return res.status(500).send('Jogador não cadastrado na tebla de jogadores')
        } else {
            let time = await PlacarModel.buscarTimeJogador(buscarIdJogador[0].nome);
            let verificarTime = await PlacarModel.verificarTime(time[0].nome);
            if (verificarTime.length > 0) {
                let maisumgol = verificarTime[0].placar + 1
                inserir = await PlacarModel.atualiza(time[0].nome, maisumgol);
            }else{
                 inserir = await PlacarModel.inserir(time[0].nome, 1);
            }

                json.result = inserir; //se tiver nota ele joga no json
            
            return res.json(json)
        }
    },

    async email(req, res) {
        let json = { error: '', result: {} };
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "f1b0c710343bd1",
              pass: "f1de54d7d3bcf6"
            }
          });

        //   transport.use('compile', hbs({
        //     viewEngine: 'handlebars',
        //     viewPath: path.resolve('./src/resource')
        //   }))



          transport.sendMail({
            from: "emetest@email.com",
                to: "emerson1994vp@gmail.com",
                subject: "Teste do email",
                html: "<p>O teste deu certo</p>"
          })
            .then(res => {
              console.log("deu certo")
              return "deu certo"
            })
            .catch(error => {
                console.log("deu errado", error)
                console.log(error);
            })


    //     console.log("passouuuuuu")
    //     const smtp = nodemailer.createTransport({
    //         host: "smtp.gmail.com",
    //         port: 587,
    //         secure: false,
    //         auth:{
    //             user: "emerson1994vp@gmail.com",
    //             pass: "emerson65916133"
    //         }
    //     })
        
    

    // const configEmail = {
    //     from: "emerson1994vp@gmail.com",
    //     to: "emerson1994vp@gmail.com",
    //     subject: "Teste do email",
    //     html: "<p>O teste deu certo</p>"
    
    // }

    // //     transporter.sendMail(mailOptions, (err, result) => {
    // //         if (err){
    // //         console.log(err)
    // //             res.json('Opps error occured')
    // //         } else{
    // //             res.json('thanks for e-mailing me');
    // //         }
    // //     })
    

    
        
    //     new Promise((resolve, reject) => {
    //         smtp.sendMail(configEmail)
    //         .then(res => {
    //             smtp.close()
    //             return resolve(res)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             smtp.close()
    //             return reject(error);
    //         })
    //     } )


        
    },

    async buscarTodos(req, res) {
        // verifyJWT(req, res)
        let json = { error: '', result: [] };
        let futebol = await PlacarModel.buscarTodos();
            json.result = futebol
        return res.json(json.result)
    },

    async limpar(req, res) {
        let json = { error: '', result: {} };
            let inserir1 = await PlacarModel.limpar( );
            if(inserir1){
                    json.result = inserir1; //se tiver nota ele joga no json     
            }
           
            return res.json(json)
    },
}