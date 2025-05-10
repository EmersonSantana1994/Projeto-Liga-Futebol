const { async } = require('parse/lib/browser/Storage');
const PlacarModel = require('../services/PlacarModel');
const jwt = require('jsonwebtoken')
const SECRET = 'emesantana'
const axios = require('axios');
let cript = false
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const { buscar } = require('./ProntuarioCadastrarController');



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

    async limparEspecificoArtilheiro(req, res) {
        let inserir1
        let nome = req.body.nome
        let json = { error: '', result: {} };
      
            let buscarJogadorArtilheiro = await PlacarModel.buscarJogadorTabelaArtilheiro(nome);
        if (buscarJogadorArtilheiro.length == 0) {
            return res.status(500).send('Jogador se encontra na tabela de artilheiro')
        }

        let buscarJogadorArtilheiroTorneio = await PlacarModel.buscarJogadorTabelaArtilheiroTorneio(nome);

        if (buscarJogadorArtilheiroTorneio.length == 0) {
            return res.status(500).send('Jogador não se encontra na tabela de artilheiro deste torneio')
        }

            if(buscarJogadorArtilheiro[0].gols > 0){
                let atualizar = buscarJogadorArtilheiro[0].gols - 1
                let atualizarTorneio = buscarJogadorArtilheiroTorneio[0].gols - 1
                if(atualizarTorneio == 0){
                    await PlacarModel.excluirJogadorArtilheiroTorneio(nome);
                }else{
                    inserir1 = await PlacarModel.excluirGolArtilheiroTorneio(atualizarTorneio, buscarJogadorArtilheiro[0].nome);
                }
                if(atualizar == 0){
                    await PlacarModel.excluirJogadorArtilheiro(nome);
                }else{
                    inserir1 = await PlacarModel.excluirGolArtilheiro(atualizar, buscarJogadorArtilheiro[0].nome);
                }
                
            }else{
                inserir1 =  await PlacarModel.excluirJogadorArtilheiro(nome);
                await PlacarModel.excluirJogadorArtilheiroTorneio(nome);
            }

            let time = await PlacarModel.buscarTimeJogador(nome);

            let verificarTime = await PlacarModel.verificarTime(time[0].nome);
            if (verificarTime[0]?.placar > 0) {
                let menosumgol = verificarTime[0].placar - 1
                if(menosumgol == 0){
                    inserir1 = await PlacarModel.deletarTimePlacar(time[0].nome);
                }else{
                    inserir1 = await PlacarModel.atualiza(time[0].nome, menosumgol);
                }
            }else{
                inserir1 = await PlacarModel.deletarTimePlacar(time[0].nome);
            }

         
        if(inserir1){
            json.result = inserir1; //se tiver nota ele joga no json     
    }

           
            return res.json(json)
    },



    async limparEspecificoAssistencia(req, res) {
        let inserir1
        let nome = req.body.nome
        let json = { error: '', result: {} };
      
            let buscarJogadorArtilheiro = await PlacarModel.buscarJogadorTabelaAssistencia(nome);
        if (buscarJogadorArtilheiro.length == 0) {
            return res.status(500).send('Jogador não se encontra na tabela de assistencia')
        }

        let buscarJogadorArtilheiroTorneio = await PlacarModel.buscarJogadorTabelaAssistenciaTorneio(nome);

        if (buscarJogadorArtilheiroTorneio.length == 0) {
            return res.status(500).send('Jogador não se encontra na tabela de assistencia deste torneio')
        }

            if(buscarJogadorArtilheiro[0].assistencias > 0){
                let atualizar = buscarJogadorArtilheiro[0].assistencias - 1
                let atualizarTorneio = buscarJogadorArtilheiroTorneio[0].assistencias - 1
                if(atualizarTorneio == 0){
                    await PlacarModel.excluirJogadorAssistenciaTorneio(nome);
                }else{
                    inserir1 = await PlacarModel.excluirGolAssistenciaTorneio(atualizarTorneio, buscarJogadorArtilheiro[0].nome);
                }
                if(atualizar == 0){
                    await PlacarModel.excluirJogadorAssistencia(nome);
                }else{
                    inserir1 = await PlacarModel.excluirGolAssistencia(atualizar, buscarJogadorArtilheiro[0].nome);
                }
            }else{
                inserir1 =  await PlacarModel.excluirJogadorAssistencia(nome);
                await PlacarModel.excluirJogadorAssistenciaTorneio(nome);
            }

         
        if(inserir1){
            json.result = inserir1; //se tiver nota ele joga no json     
    }

           
            return res.json(json)
    },
}