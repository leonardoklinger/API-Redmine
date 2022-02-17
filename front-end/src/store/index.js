import { createStore } from 'vuex'
import axios from 'axios'
const url = "http://localhost:5050/"
export default createStore({
  state: {
    tarefas: [],
    tarefa: []
  },
  mutations: {
    listarTodosProjetos(state, payload) {
      state.tarefas = payload
    },
    projetoEspecifico(state, payload) {
      state.tarefa = payload
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
      })
    }
  }
})
