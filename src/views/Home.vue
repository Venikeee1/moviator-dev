<template>
  <main class="home">
    <MovieList/>
  </main>
</template>

<script>
// @ is an alias to /src
import MovieList from '@/components/MovieList.vue'

export default {
  name: 'home',
  components: {
      MovieList
  }
}
</script>

<style lang="scss">

</style>
