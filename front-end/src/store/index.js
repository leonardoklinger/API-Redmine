import { createStore } from 'vuex'
import axios from 'axios'
const url = "http://localhost:5050/"
export default createStore({
  state: {
    tarefas: [],
    tarefa: [],
    erros: []
  },
  mutations: {
    listarTodosProjetos(state, payload) {
      state.tarefas = payload
    },
    projetoEspecifico(state, payload) {
      state.tarefa = payload
    },
    errosProjeto(state, payload) {
      state.erros = payload
    }
  },
  actions: {
    listarTodosProjetos(context) {
      axios.get(`${url}todosProjetos`).then(resp => {
        context.commit('listarTodosProjetos', resp.data)
      })
    },
    projetoEspecifico(context, payload) {
      axios.get(`${url}projetoEspecifico/${payload}`).then(resp => {
        context.commit('projetoEspecifico', resp.data)
      }).catch((error) => {
        context.commit('errosProjeto', error.response.status)
      })
    }
  }
})
