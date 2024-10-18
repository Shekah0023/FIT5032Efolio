<script>
import BHeader from './components/BHeader.vue'
import CountBookAPI from './views/CountBookAPI.vue';
import GetAllBookAPI from './views/GetAllBookAPI.vue';

export default {
  name: 'App',
  components: {
    BHeader,
    CountBookAPI,
    GetAllBookAPI
  },
  computed: {
    showHeader() {
      const route = this.$route.name;
      if (route !== 'CountBookAPI' && route !== 'GetAllBookAPI') {
        return true;
      }
      return false;
    }
  }
};
</script>

<template>
  <div class="fixed-header">
    <header v-if="showHeader">
      <BHeader />
    </header>
  </div>
  <main>
    <router-view></router-view>
  </main>
</template>

<style>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #8E7AB5; 
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
}
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
