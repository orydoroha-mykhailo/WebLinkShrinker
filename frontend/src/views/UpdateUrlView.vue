<template>
  <main class="form-signin">
    <section class="vh-10">
      <div class="container py-5 h-10">
        <div class="row d-flex justify-content-center align-items-center h-10">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style="border-radius: 1rem;">
              <form id="form" class="card-body p-5 text-center" @submit.prevent="updateUrl">
                <h3 class="mb-5">Update Data</h3>

                <div class="form-outline form-white mb-4">
                  <input
                      placeholder="Creation Date"
                      class="form-control form-control-lg"
                      type="text"
                      onfocus="(this.type='date')"
                      onblur="(this.type='text')"
                      id="dob"
                      required v-model="date_create"
                  />
                </div>
                <div class="form-outline form-white mb-4">
                  <input type="text" id="url_long" class="form-control form-control-lg" placeholder="Full URL" required
                         v-model="url_long"/>
                </div>
                <div class="form-outline form-white mb-4">
                  <input type="text" id="url_short" class="form-control form-control-lg" placeholder="Shortened URL" required
                         v-model="url_short"/>
                </div>

                <div class="submit">
                  <button id="submit_button" class="btn btn-primary btn-lg btn-block" type="submit">Update</button>
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
import { getAPI } from '../api'

export default {
  data() {
    return {
      date_create: "",
      url_long: "",
      url_short: "",
    }
  },
  mounted() {
    if (this.$store.getters.authorized) {
      this.getData();
    } else {
      this.$router.push({name: 'Login'})
    }
  },
  methods: {
    getData() {
      getAPI('/urls/' + this.$route.params.id + '/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } }).then(response => {
        this.date_create = response?.data?.date_create
        this.url_long = response?.data?.url_long
        this.url_short = response?.data?.url_short
      })
    },
    updateUrl() {
      getAPI.put('/urls/' + this.$route.params.id + '/', {
        date_create: this.date_create,
        url_long: this.url_long,
        url_short: this.url_short
      }, { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } }).then(() => {
        this.$router.push({name: 'Profile'})
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

