const db = require('./db');

const getMedicos = () => {
  return db.promise().query('SELECT * FROM medicos ORDER BY nome');
};

const getMedicosPorNome = (nome) => {
  return db.promise().query('SELECT * FROM medicos WHERE nome LIKE ? ORDER BY nome', [`%${nome}%`]);
};

const getMedicosPorEspecialidade = (especialidade) => {
  return db.promise().query(
    'SELECT m.id, m.nome, m.telefone, m.email, e.especialidade ' +
    'FROM medicos m ' +
    'JOIN especialidades e ON m.especialidade = e.id ' +
    'WHERE e.especialidade LIKE ? ORDER BY m.nome',
    [`%${especialidade}%`] 
  );
};

module.exports = {
  getMedicos,
  getMedicosPorNome,
  getMedicosPorEspecialidade
};
