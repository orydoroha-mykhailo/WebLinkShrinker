<template>
  <main role="main">
    <div class="jumbotron">
      <div class="container">
        <img src="logo.png">
        <h1 class="display-3">Скорочувач посилань</h1>
        <p>
          Даний сайт дає вам змогу скоротити велике посилання для більш зручного використання.
        </p>
        <p align="center">
          <router-link :to="{name: 'Main'}" >
          <a class="btn btn-primary btn-lg" href="main.html" role="button">
            Спробувати
          </a>
          </router-link>
        </p>
      </div>
    </div>


  </main>
</template>