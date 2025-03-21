const RankingTitulosModal = require('../services/RankingTitulosModal');
const CadastrarModel = require('../services/CadastrarModel');


module.exports = {

      async buscarTodos(req, res) {
            // verifyJWT(req, res)
            let json = { error: '', result: [] };
            let futebol = await RankingTitulosModal.buscarTodos(req.body.idUsuario);
            json.result = futebol
            return res.json(json.result)
        },

        async adicionar(req, res) {
       
               // verifyJWT(req, res)
               let json = { error: '', result: [] };
               const verificaString = (format) => {
                return ['liga', 'copa', 'sub-liga', 'mundial', 'super copa'].includes(format)
            }   

               let format = req.body.torneio.toLowerCase()
               const verificarNomeTorneio = verificaString(format)
              console.log("req.body.nome", req.body.nome)
            for (let j = 0; j < req.body.nome.length; j++) {
                let buscarIdJogador =  await CadastrarModel.seExisteJogador(req.body.nome[j]);
                    if(buscarIdJogador.length == 0){
                        return res.status(500).send(`Jogador ${req.body.nome[j]} não cadastrado na tebla de jogadores`)
                    }
            }
              
                if(!verificarNomeTorneio){
                    return res.status(500).send('Nome do torneio não esta correto')
                }

                
                const torneio = (torneioParamter) => {
                    switch(torneioParamter) {
                        case 'liga':
                            return 'liga';
                        case 'copa':
                            return 'copa';
                        case 'sub-liga':
                            return 'subLiga';
                        case 'mundial':
                        return 'mundial';
                        case 'super copa':
                        return 'superCopa';
                    }
                }

                let nomeTorneioValidado = torneio(format)

                let futebol
                for (let j = 0; j < req.body.nome.length; j++) {
                    let existJogador =  await RankingTitulosModal.buscarJogadorTorneioTabela(req.body.nome[j]);
                    if(existJogador.length > 0){
                        
                        let pontosAtuais = existJogador[0][nomeTorneioValidado] || 0;
                        let totaisAtuais = existJogador[0].total || 0;
                        let maisUmPonto = pontosAtuais + 1;
                        let maisUmPontoTotal = totaisAtuais + 1;
                        
                        futebol = await RankingTitulosModal.atulizar(existJogador[0].id, nomeTorneioValidado, maisUmPonto, maisUmPontoTotal);
                    }else{
                            futebol = await RankingTitulosModal.adicionarNovoJogador(req.body.nome[j], nomeTorneioValidado, 1);
                    }
                    
                    
                }
                json.result = futebol
                return res.json(json.result)
            
           },

        }
