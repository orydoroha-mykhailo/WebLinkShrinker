<template>
  <header class="header">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" role="navigation">
      <router-link role="banner" :to="{name: 'Main'}" id='router_link'>
        <a class="navbar-brand" href="" role="banner"><img src="logo.png" width="80" alt="Логотип">
          Скорочувач
          посилань</a>
      </router-link>

=

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDefault"
              aria-controls="navbarsDefault" aria-expanded="false" aria-label="Змінити навігацю">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsDefault">
        <ul class="navbar-nav mr-auto">
          <router-link class="nav-link" :to="{name: 'Login'}" id='router_link'>Вхід</router-link>
          <router-link class="nav-link" :to="{name: 'Registration'}" id='router_link'>Реєстрація</router-link>
          <router-link class="nav-link" :to="{name: 'About'}" id='router_link'>Про сайт</router-link>
        </ul>

        <form class="form-inline my-2 my-lg-0">
          <router-link role="banner" :to="{name: 'Profile'}" id='router_link'>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Мій профіль</button>
          </router-link>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
export default {

  // ваш JS-код здесь
}
</script>

<style scoped>
/* ваш CSS-код здесь */
</style>
