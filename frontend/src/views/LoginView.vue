<template>
  <main class="form-signin">
    <section class="vh-10">
      <div class="container py-5 h-10">
        <div class="row d-flex justify-content-center align-items-center h-10">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style="border-radius: 1rem; margin-top: 25rem;">
              <form id="form" class="card-body p-5 text-center" @submit.prevent="signIn">

                <h3 class="mb-5">Sign In</h3>

                <div class="form-outline form-white mb-4">
                  <input type="email" id="typeEmailX" class="form-control form-control-lg" placeholder="Email" required v-model="email"/>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="typePasswordX-2" class="form-control form-control-lg" placeholder="Password" required v-model="password"/>
                </div>

                <button class="btn btn-primary btn-lg btn-block" type="submit">Sign In</button>

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

<style scoped>
.card {
  margin-top: 25rem; /* Added margin to move the container lower */
}

.form-control-lg {
  border: 2px solid #ced4da;
  border-radius: 0.3rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #ffffff; /* White background for input */
  color: #000000; /* Black text color for input */
}

.btn-primary {
  background-color: #007bff; /* Blue button background */
  border-color: #007bff; /* Blue border */
  color: #ffffff; /* White text color */
  padding: 0.75rem 1.25rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

.btn-primary:hover {
  background-color: #0056b3; /* Darker blue on hover */
  border-color: #004085; /* Darker blue border on hover */
  color: #ffffff; /* White text color on hover */
}
</style>
