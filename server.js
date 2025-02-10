const express = require('express');
const { getMedicos, getMedicosPorNome, getMedicosPorEspecialidade, getMedicoPorId } = require('./queries.js');
const app = express();
const PORT = 9000;

app.use(express.json());

app.get('/medicos', async (req, res) => {
  const resultado = await getMedicos();
  if (resultado && resultado.length > 0) {
    res.json(resultado[0]);
  } else {
    res.status(500).json({ error: "Erro ao buscar médicos ou lista vazia." });
  }
});

app.get('/medicos/nome', async (req, res) => {
  const { nome } = req.query;
  if (!nome) {
    res.status(400).json({ error: 'Parâmetro "nome" é obrigatório.' });
  } else {
    const resultado = await getMedicosPorNome(nome);
    if (resultado && resultado.length > 0) {
      res.json(resultado[0]);
    } else {
      res.status(404).json({ error: "Nenhum médico encontrado com esse nome." });
    }
  }
});

app.get('/medicos/especialidade', async (req, res) => {
  const { especialidade } = req.query;
  if (!especialidade) {
    res.status(400).json({ error: 'Parâmetro "especialidade" é obrigatório.' });
  } else {
    const resultado = await getMedicosPorEspecialidade(especialidade);
    if (resultado && resultado.length > 0) {
      res.json(resultado[0]);
    } else {
      res.status(404).json({ error: "Nenhum médico encontrado com essa especialidade." });
    }
  }
});


app.get('/medicos/:id', async (req, res) => {
  const { id } = req.params;
  const resultado = await getMedicoPorId(id);
  if (resultado && resultado.length > 0) {
    res.json(resultado[0]);
  } else {
    res.status(404).json({ error: "Nenhum médico encontrado com esse ID." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});