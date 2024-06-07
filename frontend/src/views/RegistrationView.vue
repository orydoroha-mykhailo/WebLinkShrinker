<template>
  <main class="form-signin">
    <section class="vh-10">
      <div class="container py-5 h-10">
        <div class="row d-flex justify-content-center align-items-center h-10">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style="border-radius: 1rem;">
              <form class="card-body p-5 text-center" @submit.prevent="handleSubmit">


                <h3 class="mb-5">Реєстрація</h3>

                <div class="form-outline form-white mb-4">
                    <input type="text" id="typeEmailX" class="form-control form-control-lg" placeholder="Ім'я" required v-model="username"/>
                </div>

                <div class="form-outline form-white mb-4">
                  <input
                      placeholder="Дата народження"
                      class="form-control form-control-lg"
                      type="text"
                      onfocus="(this.type='date')"
                      onblur="(this.type='text')"
                      id="dob"
                      required v-model="birth_date"
                  />
                </div>

                <div class="form-outline form-white mb-4">
                  <select name="gender" id="gender" class="form-control form-control-lg" required v-model="gender">
                    <option disabled value="">Оберіть стать</option>
                    <option value="M" >Чоловіча</option>
                    <option value="F" >Жіноча</option>
                  </select>
                  <span id="error_gender" class="text-danger"></span>
                </div>
                <div class="form-outline form-white mb-4">
                  <input type="email" id="typeEmailX" class="form-control form-control-lg"  placeholder="Пошта" required v-model="email"/>
                </div>

                <div class="form-outline form-white mb-4">
                  <input type="password" id="typePasswordX-2" class="form-control form-control-lg" placeholder="Пароль" required v-model="password"/>
                </div>

                <div class="submit">
                <button id="submit_button" class="btn btn-primary btn-lg btn-block" type="submit">Зареєструватися</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


<script>
import {getAPI} from '../api'

export default {
    data() {
        return {
            email: "",
            username: "",
            password: "",
            full_name: "",
            birth_date: "",
            gender: "",
            errors: {},
        }
    },

    methods: {
        handleSubmit() {
            getAPI.post('/api/signup/', {
                email: this.email,
                username: this.username,
                password: this.password,
                full_name: 'TEST',
                birth_date: this.birth_date,
                gender: this.gender,
            }).then(response => {
                console.log(response.data);
                this.$router.push('/');
            }).catch(error => {
                this.errors = error.response.data
                console.log(error)
            })
        }
    }
}
</script>


<style scoped>

</style>