const axios = require("axios")
const url = "http://127.0.0.1/redmine/"

exports.todosProjetos = async (req, res) => {
  const resultado = await axios.get(url + "projects.json")
  todosProjetosFiltro(resultado.data, res, req)
}

exports.projetoEspecifico = async (nomeDoProjeto, req, res) => {
  const resultado = await axios.get(url + "projects.json?name=" + nomeDoProjeto)
  let funcao = await dadosArrumados(resultado.data)

  if (funcao != 404 && funcao != 402) {
    res.status(200).json(funcao)
  } else if (funcao != 404) {
    res.status(402).json({status: 402, mensagem: "Não existe nenhum projeto com o nome"})
  } else if (funcao != 402) {
    res.status(404).json({status: 402, mensagem: "Não existe nenhuma Issue com o nome"})
  }
}

exports.enviadoEmail = (req, res, nodemailer) => {
  const { emailUser, titulo, texto } = req.body
  console.log(emailUser, titulo, texto)

  const user = process.env.USER
  const pass = process.env.PASS
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: { user, pass }
  })

  transporter.sendMail({
    from: user,
    to: emailUser,
    subject: titulo,
    text: texto
  }).then(info => {
    res.send(info)
  }).catch(error => {
    res.send(error)
  })
}

async function dadosArrumados(dados) {
  const dadosAntigos = dados.projects[0]
  if (dadosAntigos == undefined) return 402
  try {
    const resultado = await axios.get(url + `issues/${dadosAntigos.id}.json`)
    let objetoNovo = { ...dadosAntigos, ...resultado.data }
    return objetoNovo
  } catch (error) {
    return error.response.status
  }
}

async function membrosProjeto (ID, User)  {
    let array = []
    const resultado = await axios.get(url + "projects/" + ID + "/memberships.json")
    if(resultado.data.memberships[0] != undefined){
      if(User != undefined) {
        array.push(resultado.data.memberships[0])
        if(array.filter(x => x.user.name == User)[0] != undefined) {
          return array.filter(x => x.user.name == User)[0].id
        }
      }
    }
}

async function todosProjetosFiltro(dados, res, req) {
  const { filtro, data, user } = req.body
  const Data = dados.projects
  switch (filtro) {
    case 1:
      res.json(Data)
      break;
    case 2:
      res.json(Data.filter(x => x.created_on.slice(0, 10) == data))
      break;
    case 3:
      let array = []
      for(let i = 0; i < Data.length; i++) {
        if(await membrosProjeto(Data[i].id, user) != undefined) {
          const resultado = await axios.get(url + "projects/" + await membrosProjeto(Data[i].id, user) + ".json")
          array.push(resultado.data)
        }
      }
       res.json(array)
      break;
    default:
      break;
  }
}