<template>
<nav class="navbar navbar-expand-lg navbar-light" id="navbar">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">LifeApps</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/">Todos Projetos</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link " to="/about">Projeto Especifico</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <router-view/>
</template>

<style>

body {
  background-color: #8bc7ff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#navbar {
  background-color: #628DB6;
}

.navbar-light .navbar-brand{
  color: white;
}

.navbar-light .navbar-nav .nav-link {
  color: white;
}
.navbar-light .navbar-nav .nav-link:hover {
  background:  #6698c7;
  color: white;
  transition: 0.5s;
}
.navbar-light .navbar-nav .nav-link.active {
  color: white;
}
</style>
