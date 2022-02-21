<template>
{{erros}}
  <div v-if="tarefa == ''" class="alert alert-primary" role="alert">
        Projeto Especifico vázio !
  </div>
  <div v-if="verificar402 == true" class="alert alert-danger" role="alert">
        Não existe nenhum projeto com o nome -> {{resultadoPerma}}
</div>
<div v-if="verificar404 == true" class="alert alert-warning" role="alert">
        Não existe nenhuma Issue com o nome -> {{resultadoPerma}}
</div>
  <div class="inputsCss">
      <input type="text" v-model="resultado" placeholder="Nome do projeto"/>
      <button v-on:click="teste">Buscar</button>
  </div>
  <div class="X" v-if="tarefa != ''">
    <h1>Projeto Especifico </h1>
    <ul class="SG">
      <li class="sgLi">
        <div class="box">
        <h3>{{ tarefa.name }}</h3>
        <ul class="df">
        <li>Status: {{ tarefa.status }}</li>
        <li>Projeto publico: {{ tarefa.is_public == true ? "Sim" : "Não"  }}</li>
        <li>Data de criação: {{ tarefa.created_on.substr(0, 10) }}</li>
        <li>Data de update: {{  tarefa.updated_on.substr(0, 9) }}</li>
        <li>ID: {{tarefa.id}}</li>
        <li>Tracker: {{ tarefa.issue.tracker.name }}</li>
        <li>Status Issue: {{ tarefa.issue.status.name }}</li>
        <li>Prioridade: {{ tarefa.issue.priority.name }}</li>
        <li>Descrição: {{ tarefa.issue.description }}</li>
        <li>Autor: {{ tarefa.issue.author.name }}</li>
        <li>Horas estimadas: {{ tarefa.issue.estimed_hours == null ? "Sem horas definada" : tarefa.issue.estimed_hours }}</li>
        <li>Total de horas estimadas: {{ tarefa.issue.total_estimated_hours == null ? "Sem horas definada" : tarefa.issue.estimed_hours }}</li>
        <li>Projeto Fechado: {{ tarefa.issue.closed_on == null ? "Não": "Sim" }}</li>
        </ul> 
      </div>
    </li> 
  </ul>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      resultado: "",
      resultadoPerma: "",
      verificar402: Boolean,
      verificar404: Boolean
    };
  },
  methods: {
    ...mapActions(["projetoEspecifico"]),
    async teste() {
      console.log(this.erros)
      this.resultadoPerma = this.resultado
      this.projetoEspecifico(this.resultado)

/*       switch (this.erros) {
        case 402:
          this.verificar402 = true
          setTimeout(() => {
            this.verificar402 = false
          }, 2000)
          break;
        case 404:
          this.verificar404 = true
          setTimeout(() => {
            this.verificar404 = false
          }, 2000)
          break;
        default:
          break;
      } */
    },
  },
  computed: {
    ...mapState(["tarefa", "erros"]),
  },
};
</script>

<style scoped>
.inputsCss {
  margin-top: 5%;
  margin-bottom: 5%;
}

.inputsCss button {
  background-color: #518bc2;
  border: none;
  width: 80px;
  height: 30px;
  margin-left: 10px;
  color: white;
}

.inputsCss button:hover {
  opacity: 80%;
  transition: 0.4s;
}

body{
  padding: 0 2%;
  color: #2e3e50;
  background: #d8dddd;
}
.X{
  margin: auto;
  padding: 1% 2%;
  max-width: 1440px;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(0,0,0, .3);
}
h1,h2,h3{
  text-align: center;
  font-family: 'Baloo Tamma', cursive;
}
li{
  color: #2c3e50;
  font-size: 18px;
  line-height: 30px;
  text-align: justify;
  letter-spacing: 1px;
  font-family: 'Raleway', serif;
}
/*SG = style grid*/
.SG{
  margin: 0;
  padding: 0;
  text-align: center;
}
.SG .sgLi{
  min-width: 24%;
  margin: 2% .35%;
  display: inline-flex;
  box-shadow: 0 2px 4px rgba(0,0,0, .2);
}
.SG .sgLi:hover{
  box-shadow:0 5px 10px rgba(0,0,0,.15);}
.SG .box{
  width: 100%;
  height: 100vh;
  padding: 1% 2%;
  background: #fff;
  min-height: 480px;
  max-height: 220px;
  box-sizing: border-box;
}
/*Styles */
.df{list-style-type: disc;}
.s1{list-style-type: square;}
.s2{list-style-type: circle;}
.s3{list-style-type: decimal;}
.s4{list-style-type: decimal-leading-zero;}
.s5{list-style-type: lower-alpha;}
.s6{list-style-type: upper-alpha;}
.s7{list-style-type: lower-roman;}
.s8{list-style-type: upper-roman;}
.s9{list-style-type: lower-greek;}
.s10{list-style-type: georgian;}
.s11{list-style-type: hebrew;}
.s12{list-style-type: hiragana;}
.s13{list-style-type: hiragana-iroha;}
.s14{list-style-type: katakana;}
.s15{list-style-type: katakana-iroha;}
.s16{list-style-type: cjk-ideographic;}
.s17{list-style-image: url(//goo.gl/L3tqpe);}
.s18{list-style: none;}
.s18 li:before{
  content: '';
  width: 20px;
  height: 20px;
  margin-right: 15px;
  display: inline-block;
  background: url(//goo.gl/lcPSVD);
  background-position: 50%;
}
.s19{list-style: none;}
.s19 li:before{
  content: '\f0a9';
  margin-right: 15px;
  font-family: FontAwesome;
}

/* responsive grid*/
@media (max-width: 970px){
  .SG .sgLi{width: 180px;}}
@media (max-width: 425px){
  .SG .sgLi{width: 100%;}
}
</style>