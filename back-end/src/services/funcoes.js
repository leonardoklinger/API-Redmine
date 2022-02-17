const axios = require("axios")
const url = "http://127.0.0.1/redmine/"

exports.todosProjetos = async (req, res) => {
  const resultado = await axios.get(url + "projects.json")
  res.status(200).json(resultado.data)
}

exports.projetoEspecifico = async (nomeDoProjeto, req, res) => {
  const resultado = await axios.get(url + "projects.json?name=" + nomeDoProjeto)
  res.status(200).json(await dadosArrumados(resultado.data))
}

exports.membrosProjeto = async (ID, req, res) => {
  try {
    const resultado = await axios.get(url + "projects/" + ID + "/memberships.json")
    res.status(200).json(resultado.data)
  } catch (error) {
    if (error.response.status == 404) {
      console.log("Não existe nenhum projeto com esse ID")
    }
  }
}

exports.enviadoEmail = (req, res, nodemailer) => {
  const user = process.env.USER
  const pass = process.env.PASS
  console.log(process.env.USER)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: { user, pass }
  })

  transporter.sendMail({
    from: user,
    to: "Email.teste@gmail.com",
    subject: "Olá, teste enviador de e-mail",
    text: "Olá, teste enviador e-mail"
  }).then(info => {
    res.send(info)
  }).catch(error => {
    res.send(error)
  })
}

async function dadosArrumados(dados) {
  const dadosAntigos = dados.projects[0]
  if (dadosAntigos == undefined) return console.log("Não ah projeto com esté nome !")
  const resultado = await axios.get(url + `issues/${dadosAntigos.id}.json`)
  if (resultado.data == "") return console.log("Não existe nenhum issues com esté ID")
  let objetoNovo = { ...dadosAntigos, ...resultado.data }
  return objetoNovo
}
