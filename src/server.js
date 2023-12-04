require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob

const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/api', routes);
server.use('', routes);

// const job = new CronJob('* * * * * *', () => {
// console.log("esta rodando")
// }, null, true, 'America/Sao_Paulo')


server.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});