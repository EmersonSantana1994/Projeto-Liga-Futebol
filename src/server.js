require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob
const fs = require('fs');
const https = require('https');
const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/api', routes);
server.use('', routes);

// const job = new CronJob('* * * * * *', () => {
// console.log("esta rodando")
// }, null, true, 'America/Sao_Paulo')


// server.listen(process.env.PORT,()=>{
//     console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
// });

https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
}, server).listen(3001, ()=> console.log("ta rodando aqui na https") )