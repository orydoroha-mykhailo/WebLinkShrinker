<template>
  <header class="header">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark-blue" role="navigation">
      <router-link role="banner" :to="{name: 'Main'}" id='router_link' class="navbar-brand">
        <img src="logo.png" width="80" alt="Logo">
        Link Shrinker
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDefault"
              aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsDefault">
        <ul class="navbar-nav mr-auto">
          <router-link class="nav-link" :to="{name: 'Login'}" id='router_link'>Login</router-link>
          <router-link class="nav-link" :to="{name: 'Registration'}" id='router_link'>Register</router-link>
          <router-link class="nav-link" :to="{name: 'About'}" id='router_link'>About</router-link>
        </ul>

        <form class="form-inline my-2 my-lg-0">
          <router-link role="banner" :to="{name: 'Profile'}" id='router_link'>
            <button class="btn btn-light my-2 my-sm-0" type="submit">My Profile</button>
          </router-link>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  // your JS code here
}
</script>

<style scoped>
.header {
  background-color: #001f3f; /* Dark blue background */
}

.navbar-dark .navbar-nav .nav-link {
  color: #ffffff; /* White text color for nav links */
}

.navbar-brand img {
  margin-right: 10px; /* Space between logo and text */
}

.btn-light {
  background-color: #ffffff; /* White button background */
  border-color: #ffffff; /* White border */
  color: #007bff; /* Blue text color */
}

.btn-light:hover {
  background-color: #e0e0e0; /* Light grey on hover */
  border-color: #e0e0e0; /* Light grey border on hover */
  color: #0056b3; /* Darker blue text color on hover */
}

.bg-dark-blue {
  background-color: #001f3f; /* Dark blue background */
}
</style>
