<template>
  <main role="main">
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-3">Введіть посилання</h1>
        <input type="text" v-model="inputUrl" class="form-control form-control-lg" />
        <p>(Скорочене посилання буде автоматично скопійоване після завершення роботи)</p>
        <p align="center">
          <a @click="shortenUrl" class="btn btn-primary btn-lg" role="button">✄ Скоротити ✄</a>
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
      inputUrl: ''
    }
  },
  methods: {
    shortenUrl() {
      const apiUrl = `https://cutt.ly/api/api.php?key=cb6e9014af99c1735937297960ef782850bd3&short=${encodeURIComponent(this.inputUrl)}`
      getAPI.get(apiUrl)
          .then(response => {
            const { data } = response
            if (data.url && data.url.status === 7) {
              // Обновление состояния для отображения укороченной ссылки на экране
              // Например:
              this.shortenedUrl = data.url.shortLink

              // Копирование укороченной ссылки в буфер обмена
              navigator.clipboard.writeText(data.url.shortLink)
              alert('Посилання успішно скорочено!')

              getAPI.post('/urls/', {
                    date_create: new Date().toISOString(),
                    url_long: data.url.fullLink,
                    url_short: data.url.shortLink,
                  },{ headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } }
              ).then(response => {
                console.log(response);
              }).catch(error => {
                console.log(error)
              })

            }
          })
          .catch(error => {
            alert('Помилка при скороченні!')
            console.error('Ошибка при запросе к API:', error)
          })
    }
  }
}
</script>

