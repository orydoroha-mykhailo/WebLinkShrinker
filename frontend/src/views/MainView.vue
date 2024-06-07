<template>
  <main role="main">
    <div class="jumbotron bg-primary text-white">
      <div class="container">
        <h1 class="display-3">Enter the URL</h1>
        <input type="text" v-model="inputUrl" class="form-control form-control-lg mb-3" />
        <p>(The shrinked URL will be automatically copied after the process completes)</p>
        <p align="center">
          <a id="long_url" @click="shortenUrl" class="btn btn-light btn-lg text-primary" role="button">✄ Shrink ✄</a>
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import { getAPI } from '../api'

export default {
  data() {
    return {
      inputUrl: '',
      shortenedUrl: ''
    }
  },
  methods: {
    shortenUrl() {
      const apiUrl = `https://cutt.ly/api/api.php?key=cb6e9014af99c1735937297960ef782850bd3&short=${encodeURIComponent(this.inputUrl)}`
      getAPI.get(apiUrl)
          .then(response => {
            const { data } = response
            if (data.url && data.url.status === 7) {
              // Updating the state to display the shortened URL on the screen
              // For example:
              this.shortenedUrl = data.url.shortLink

              // Copying the shortened URL to the clipboard
              navigator.clipboard.writeText(data.url.shortLink)
              alert('URL successfully shrinked!')

              getAPI.post('/urls/', {
                    date_create: new Date().toISOString(),
                    url_long: data.url.fullLink,
                    url_short: data.url.shortLink,
                  }, { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } }
              ).then(response => {
                console.log(response);
              }).catch(error => {
                console.log(error)
              })

            }
          })
          .catch(error => {
            alert('Error during shrink!')
            console.error('Error during API request:', error)
          })
    }
  }
}
</script>

<style scoped>
.jumbotron {
  background-color: #007bff; /* Bright blue background */
  color: #ffffff; /* White text color */
  padding: 2rem 1rem;
  border-radius: 0.3rem;
  margin-top: 25rem; /* Added margin to move the container lower */
}

.container {
  text-align: center;
}

.form-control-lg {
  border: 2px solid #ced4da;
  border-radius: 0.3rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #ffffff; /* White background for input */
  color: #000000; /* Black text color for input */
}

.btn-light {
  background-color: #ffffff; /* White button background */
  border-color: #ffffff; /* White border */
  color: #007bff; /* Blue text color */
  padding: 0.75rem 1.25rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

.btn-light:hover {
  background-color: #e0e0e0; /* Light grey on hover */
  border-color: #e0e0e0; /* Light grey border on hover */
  color: #0056b3; /* Darker blue text color on hover */
}
</style>

