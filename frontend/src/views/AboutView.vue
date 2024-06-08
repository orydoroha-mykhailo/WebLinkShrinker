<template>
  <main role="main">
    <div class="jumbotron">
      <div class="container">
        <img src="logo.png">
        <h1 class="display-3">Link Shrinker</h1>
        <p>
          This website allows you to shrink a long URL for more convenient use.
        </p>
        <p align="center">
          <router-link :to="{name: 'Main'}" >
            <a class="btn btn-primary btn-lg" href="main.html" role="button">
              Try It
            </a>
          </router-link>
        </p>
      </div>
    </div>
  </main>
</template>
