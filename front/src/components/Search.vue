<template>
  <div class="search">
    <md-autocomplete
            class="search"
            v-model="selectedShow"
            :md-options="shows"
            md-layout="box">
      <label>Search...</label>
    </md-autocomplete>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data: () => {
      return {
        shows: [],
        selectedShow: null
      }
    }
  }
</script>

<style scoped>

  @media only screen and (max-device-width: 600px){
    .search {
      width: 130px;
    }
  }

</style>
