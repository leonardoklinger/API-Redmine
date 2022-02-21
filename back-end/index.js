const app = require("express")()
const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
const funcoes = require("./src/services/funcoes")
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.post("/todosProjetos/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  funcoes.todosProjetos(req, res)
})

app.get("/projetoEspecifico/:nomeDoProjeto", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { nomeDoProjeto } = req.params
  funcoes.projetoEspecifico(nomeDoProjeto, req, res)
})

app.get("/membros/:idProjeto", (req, res) => {
  const { idProjeto } = req.params
  res.header("Access-Control-Allow-Origin", "*");
  funcoes.membrosProjeto(idProjeto, req, res)
})

app.post("/enviarEmail", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  funcoes.enviadoEmail(req, res, nodemailer)
})

app.listen(5050, () => {
  console.log("servidor proxy")
})