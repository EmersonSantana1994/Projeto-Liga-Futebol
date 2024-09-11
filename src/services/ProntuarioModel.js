const { pesquisar } = require('../controllers/ProntuarioController');
const db = require('../db');


module.exports = {
    listarUser: (offset, itensPorPagina) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuarios LIMIT ?, ?;', [offset, itensPorPagina], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    listarUserContagem: (offset, itensPorPagina) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT COUNT(*) As contagem FROM usuarios;', [offset, itensPorPagina], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    listar: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('select p.id_prontuario, p.descricao, p.data_procedimento, \
            p.upload, p.anotacao, p.data, p.id_usuario, p.id_procedimento, t.nome \
            from prontuario p left join tipo_procedimento t on t.id_procedimento = p.id_procedimento\
            where deletar = 1 and id_usuario = ? ORDER BY p.data_procedimento Desc', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    listar2: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM prontuario2 where (id_pro = ?) ', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    pesquisar: (nome) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuarios WHERE (nome LIKE ?)', [nome + '%'], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },


    pesquisarProntuario: (nome) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM prontuario WHERE (descricao LIKE ?)', [nome + '%'], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    adicionar: (descricao, data, anotacao, id_usuario, tipo_arquivo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO prontuario (descricao, data_procedimento,anotacao, id_usuario, id_procedimento, deletar ) VALUES (?,?,?,?,?,?); ', [descricao, data, anotacao, id_usuario, tipo_arquivo, 1], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    adicionar2: (nome, id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO prontuario2 (nome, id_pro) VALUES (?,?);  ', [nome, id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    editar: (descricao, data, anotacao, tipo_arquivo, id_prontuario) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE prontuario SET descricao = ?, data_procedimento = ?,  anotacao = ?, id_procedimento = ?  WHERE (id_prontuario = ?)', [descricao, data, anotacao, tipo_arquivo, id_prontuario], (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; }
                    aceito(results);
            });
        });
    },

}