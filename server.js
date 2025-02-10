// GET http://localhost:9000/medicos                # Buscar todos os médicos
// GET http://localhost:9000/medicos?nome=João      # Buscar médico por nome
// GET http://localhost:9000/medicos?especialidade=Cardiologista  # Buscar médicos por especialidade
// GET http://localhost:9000/medicos/1              # Buscar médico por ID


const express = require('express');
const { getMedicos, getMedicosPorNome, getMedicosPorEspecialidade, getMedicoPorId } = require('./servico/queries.js');
const app = express();
const PORT = 9000;

app.use(express.json());

app.get('/medicos', async (req, res) => {
  const { nome, especialidade } = req.query;

  if (nome) {
    const resultado = await getMedicosPorNome(nome);
    return resultado && resultado.length > 0
      ? res.json(resultado[0])
      : res.status(404).json({ error: "Nenhum médico encontrado com esse nome." });
  }

  if (especialidade) {
    const resultado = await getMedicosPorEspecialidade(especialidade);
    return resultado && resultado.length > 0
      ? res.json(resultado[0])
      : res.status(404).json({ error: "Nenhum médico encontrado com essa especialidade." });
  }

  const resultado = await getMedicos();
  return resultado && resultado.length > 0
    ? res.json(resultado[0])
    : res.status(500).json({ error: "Erro ao buscar médicos ou lista vazia." });
});

app.get('/medicos/:id', async (req, res) => {
  const { id } = req.params;
  const resultado = await getMedicoPorId(id);
  return resultado && resultado.length > 0
    ? res.json(resultado[0])
    : res.status(404).json({ error: "Nenhum médico encontrado com esse ID." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
