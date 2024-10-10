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
    buscarCpfRgNome: (cpf, rg, nome) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pacliente Where nome LIKE ? OR cpf LIKE ?  OR rg LIKE ?', [nome + '%', cpf + '%', rg + '%'], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarCpf: (cpf) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pacliente Where cpf LIKE ?', [cpf + '%'], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarRg: (rg) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pacliente Where rg LIKE ?', [rg + '%'], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarNome: (nome) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pacliente Where nome LIKE ?', [nome + '%'], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarRgNome: (nome, rg) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pacliente Where nome LIKE ? OR rg LIKE ?', [nome + '%', rg + '%'], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarCpfRg: (cpf, rg) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pacliente Where cpf LIKE ? OR rg LIKE ?', [cpf + '%', rg + '%'], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarCpfRg: (cpf, rg) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pacliente Where cpf LIKE ? OR rg LIKE ?', [cpf + '%', rg + '%'], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarCpfNome: (cpf, nome) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pacliente Where cpf LIKE ? OR nome LIKE ?', [cpf + '%', nome + '%'], (error, results) => {
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