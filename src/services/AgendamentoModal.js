const db = require('../db');


module.exports = {
    especialidade: () => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select * from especialidade', [], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
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
            db.query('INSERT INTO eventos ( start, end, `desc`, color, tipo, id_especialidade, id_consultorio, id_medico, id_repetir) VALUES (?,?,?,?,?,?,?,?,?)', 
                [dados.start, dados.end, dados.desc, dados.color, dados.tipo, dados.id_especialidade, 
                dados.id_consultorio, dados.id_medico, dados.repetir], 
                (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    reservarAgendaMedicaRepetir: (start, end, desc, color, tipo, id_especialidade, id_consultorio, id_medico, id_repetir  ) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO eventos (start, end, `desc`, color, tipo, id_especialidade, id_consultorio, id_medico, id_repetir ) VALUES (?,?,?,?,?,?,?,?,?)', 
                [start, end, desc, color, tipo, id_especialidade, id_consultorio, id_medico, id_repetir], 
                (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    repetir: (start, end) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO eventosRepetir (start, end) VALUES (?,?)', 
                [start, end], 
                (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscartudo: (id_consultorio) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('select start, end, `desc`, color, tipo, id_consultorio, id_medico, id_repetir, e.especialidade AS title from eventos ev \
                left join especialidade e on ev.id_especialidade = e.id_especialidade where id_consultorio = ?', 
                [id_consultorio], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    verificar: (dados) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT id FROM eventos WHERE ? BETWEEN `start` AND `end` and id_consultorio = ?;', 
                [dados.start, dados.id_consultorio], (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    verificarRepetir: (start, id_consultorio) => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT id FROM eventos WHERE ? BETWEEN `start` AND `end` and id_consultorio = ?;', 
                [start, id_consultorio], (error, results)=>{
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



