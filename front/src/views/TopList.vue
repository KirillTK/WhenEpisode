<template>
  <div class="top-list">
    <div class="elevation-demo">

      <md-card v-for="serial in serials" :key="serial.id">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title"><a class="title">{{serial.name}}</a></div>
            <div class="md-subhead">{{serial.vote_average}}</div>
          </md-card-header-text>

          <md-card-media md-big>
            <img :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + serial.poster_path" alt="" class="poster">
          </md-card-media>
        </md-card-header>

      </md-card>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {

    name: 'TopList',
    data: () => {
      return {
        serials: null
      }
    },
    methods: {
      async getTopSeries() {

        const ax = axios.create({
          baseURL: `http://localhost:3000/api`
        });

        const response = await ax.get('http://localhost:3000/api/getTopRatedSeries');
        return response.data;
      }
    },
    async created() {
      const {results} = await this.getTopSeries();
      this.serials = results;
    },
  }

</script>


<style scoped>
  .top-list {
    margin: 0 auto;
    width: 90%;
  }

  .elevation-demo {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .md-card {
    width: 350px;
    height: 265px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .title {
    color: black !important;
    text-decoration: none !important;
    cursor: pointer;
  }

</style>
