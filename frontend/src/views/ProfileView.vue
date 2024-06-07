<template>
  <main>
    <table class="table">
      <thead class="thead-light">
      <tr>
        <th scope="col">Ім’я</th>
        <th scope="col">Пошта</th>
        <th scope="col">Стать</th>
        <th scope="col">Дата народження</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{user_info.username}}</td>
        <td>{{user_info.email}}</td>
        <td>{{user_info.gender === 'M' ? 'Чоловіча' : 'Жіноча'}}</td>
        <td>{{new Date(user_info.birth_date).toLocaleDateString()}}</td>
      </tr>
      </tbody>
    </table>
    <table class="table">
      <thead class="thead-light">
      <tr>
        <th scope="col">Дата</th>
        <th scope="col">Повне посилання</th>
        <th scope="col">Скорочене</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="url in urls" :key="url.id">
        <td>{{new Date(url.date_create).toLocaleString()}}</td>
        <td>{{url.url_long}}</td>
        <td>{{url.url_short}}</td>
        <td>
          <button id="submit_button"  @click="updateUrl(url.id)" style="border: none; background-color: transparent;">
            <svg width="16px" height="16px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash-fill">
              <path d="M13.877 3.123l3.001 3.002.5-.5a2.123 2.123 0 10-3.002-3.002l-.5.5zM15.5 7.5l-3.002-3.002-9.524 9.525L2 17.999l3.976-.974L15.5 7.5z" fill="#5C5F62"/></svg>
          </button>
        </td>
        <td>
          <button id="submit_button" @click="deleteUrl(url.id)" style="border: none; background-color: transparent;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import {getAPI} from '../api'

export default {
  data () {
    return {
      user_info: "",
      urls:[]

    }
  },
  
  mounted (){
    this.getUserInfo();
    if (this.$store.getters.authorized) {
      this.getUrls();
    } else {
      this.$router.push({name: 'Login'})
    }
  },

  methods: {
    getUserInfo () {
        getAPI('/api/user/',
        { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
      .then(response => this.user_info = response.data)
    },

    getUrls() {
      getAPI('/api/urls/'+this.$store.state.user_id+'/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } }).then(response => this.urls = response.data)
    },

    deleteUrl(id){
      getAPI.delete('/urls/'+id+'/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } }).then(response => {
        console.log(response)
        this.getUrls()
      }).catch(error => {
        console.log(error)
      })
    },
    updateUrl(id) {
      this.$router.push({name: 'UpdateUrl', params: {id: id}})
    },
  }
}

</script>

<style scoped>
.table td,
.table th {
  text-align: left;
}
</style>