<template>
  <main class="form-signin">
    <section class="vh-10">
      <div class="container py-5 h-10">
        <div class="row d-flex justify-content-center align-items-center h-10">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style="border-radius: 1rem;">
              <form class="card-body p-5 text-center" @submit.prevent="signIn">

                <h3 class="mb-5">Вхід</h3>

                <div class="form-outline form-white mb-4">
                  <input type="email" id="typeEmailX" class="form-control form-control-lg" placeholder="Пошта" required v-model="email"/>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="typePasswordX-2" class="form-control form-control-lg" placeholder="Пароль" required v-model="password"/>
                </div>


                <button class="btn btn-primary btn-lg btn-block" type="submit">Увійти</button>


              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>



<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error_text: "",
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password,
      }).then(() => {
        this.$router.push({name: 'Home'})
      }).catch(error => {
        this.error_text = error.response.data.non_field_errors[0]
        console.log(error)
      })
    }
  }
}
</script>