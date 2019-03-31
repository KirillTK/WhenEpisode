<template>
  <div class="container" v-if="isLoaded">

    <section class="show_info">
      <div  class="poster">
        <img :src="'http://image.tmdb.org/t/p/w500/' + tvShow.poster_path" alt="">

        <section class="action">

          <md-button class="md-icon-button md-raised">
            <md-icon class="icon watch_list">bookmark</md-icon>
            <md-tooltip md-direction="top">Add to watch list</md-tooltip>
          </md-button>
          <md-button class="md-icon-button md-raised">
            <md-icon class="icon favourite">favorite</md-icon>
            <md-tooltip md-direction="top">Favourite</md-tooltip>
          </md-button>
        </section>

        <star-rating :max-rating="10"  :star-size="25" :rating="tvShow.vote_average" :read-only="true"  :round-start-rating="false" :show-rating="false" class="rating"></star-rating>
      </div>

      <div class="description">
        <h1>{{tvShow.name}}</h1>
        <p>{{tvShow.overview}}</p>
        <h2>Featured Crew</h2>
        <section class="crew">

          <div  v-for="creator in tvShow.created_by" :key="creator.id">
            <a>{{creator.name}}</a>
            <span>Creator</span>
          </div>

        </section>

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
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

  .action {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 20px;
    width: 40%;
  }

  .md-icon-button {
    width: 50px;
    height: 50px;
  }

  .icon {
    font-size: 2.5em !important;
  }

  .watch_list {
    color: blue !important;
  }

  .favourite {
    color: red !important;
  }





  .crew {
    display: flex;
    flex-direction: row;
  }

  .crew > div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
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
