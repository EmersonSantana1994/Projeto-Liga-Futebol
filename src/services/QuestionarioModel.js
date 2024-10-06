const db = require('../db');

module.exports = {

    salvarQuestionario: (questionarioNome, idUsuario) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO questionario (  `nomeQuestionario`, `id_usuario`) VALUES (?,?)', 
                [questionarioNome, idUsuario], 
                (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    salvar: (title, text, type, idQuestionario) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO questoes ( `text`, `title`, `type`, `id_questionario` ) VALUES (?,?,?,?)', 
                [text, title, type, idQuestionario], 
                (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    salvarPergunta: (options, id_questao) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO perguntas ( `options`, `id_questao`) VALUES (?,?)', 
                [options, id_questao], 
                (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarQuestionario: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM questionario', [], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarQuestoes: (idQuestionario) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM questoes where id_questionario = ?', [idQuestionario], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarPergun: (idsQuestao) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM perguntas where id_questao IN (?)', [idsQuestao], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

}