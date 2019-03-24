<template>
  <div id="app">
    <md-toolbar class="md-accent">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <h1 class="md-title">App</h1>
        </div>

        <Search/>

        <div class="md-toolbar-section-end">
          <md-button to="/components/button">Sign in</md-button>
          <md-button to="/components/button" class="md-primary">Sign up</md-button>
        </div>
      </div>
    </md-toolbar>

    <TopList/>

  </div>
</template>

<script>


  import TopList from "./components/TopList";
  import Search from "./components/Search";

  export default {

    name: 'app',
    components: {
      Search,
      TopList
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

</style>
