const db = require('../db');

module.exports = {
    getConsultorio: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select * from consultorios', [], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    reservarAgendaMedica: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO eventos (title, start, end, `desc`, color, tipo, id_consultorio, id_medico) VALUES (?,?,?,?,?,?,?,?)', 
                [dados.title, dados.start, dados.end, dados.desc, dados.color, dados.tipo, dados.id_consultorio, dados.id_medico], 
                (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscartudo: (id_consultorio, id_medico) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select * from eventos where id_consultorio = ? and id_medico = ?', [id_consultorio, id_medico], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    verificar: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT id FROM eventos WHERE ? BETWEEN `start` AND `end`;', [dados.start], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
}


// CREATE TABLE eventos (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     start DATETIME NOT NULL,
//     end DATETIME NOT NULL,
//     `desc` TEXT,
//     color VARCHAR(50),
//     tipo VARCHAR(50)
// );

