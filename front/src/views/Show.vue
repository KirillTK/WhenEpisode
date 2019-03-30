<template>
  <div class="container" v-if="isLoaded">

    <section class="show_info">
      <div  class="poster">
        <img :src="'http://image.tmdb.org/t/p/w500/' + tvShow.poster_path" alt="">
        <star-rating :max-rating="10"  :star-size="25" :rating="tvShow.vote_average" :read-only="true"  :round-start-rating="false" :show-rating="false" class="rating"></star-rating>
      </div>

      <div class="description">
        <h1>{{tvShow.name}}</h1>
        <p>{{tvShow.overview}}</p>
      </div>
    </section>


  </div>
</template>

<script>
  import axios from 'axios';
  import StarRating from 'vue-star-rating'


  export default {
    name: "Show",
    components: {
      StarRating
    },
    data: () => {
      return {
        tvShow: null,
        isLoaded: false
      }
    },
    methods: {
      async getShowInfo() {

        const ax = axios.create({
          baseURL: `http://localhost:3000/api`
        });

        const response = await ax.get('http://localhost:3000/api/getTvInfo/75663');
        return response.data;
      }
    },
    async created() {
      this.tvShow = await this.getShowInfo();
      this.isLoaded = !!this.tvShow;
      console.log(this.tvShow);
    },
  }

</script>

<style scoped>

  .poster {
    width: 40%;
  }

  .poster img {
    width: 60%;
  }

  .container {
    width: 90%;
    margin: 20px auto;
  }

  .show_info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .description {
    width: 60%;
    display: flex;
    flex-direction: column;
  }

  .description > h1 {
    text-align: center;
    font-size: 2.3em;
  }

  .rating {
    margin-top: 20px;
  }

  @media only screen and (max-device-width: 600px){
    .poster {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
    }

  }

</style>
