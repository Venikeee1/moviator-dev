<template>
   <div class="movie-item">
       <div class="movie-item__img">
           <img :src="`${imgApiUrl}/t/p/w500${movieDetails.backdrop_path}`" alt="">
       </div>
       <div class="movie-item__text">
           <time class="movie-item__date">{{movieDetails.release_date}}</time>
           <h2 class="movie-item__title primary-subtitle">{{movieDetails.title}}</h2>
           <p class="movie-item__overview">{{movieDetails.overview}}</p>
           <div class="movie-item__nav">
               <PrimaryButton
                       :to="{name: 'video-page', params: {id: movieDetails.id}}"
               >
                   Watch
               </PrimaryButton>
               <Score :score="movieDetails.vote_average"/>
           </div>
       </div>
   </div>
</template>

<script>
    import {config} from "../config/config"
    import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
    import Score from '@/components/Score.vue'

    export default {
        name: "movie-item",
        components: {
            PrimaryButton,
            Score
        },
        props: {
            movieDetails: Object
        },
        computed: {
            imgApiUrl() {
                return config.imgApiUrl;
            }
        }
    }
</script>

<style lang="scss">

    .movie-item {
        //display: flex;
        //border: 1px solid #000;
        align-items: center;
        padding-bottom: 50px;
        background: #e2e9eb;
        width: calc(50% - 15px);

        &__text {
            padding: 30px 30px 0;
            width: 100%;
        }

        &__img {
            width: 100%;

            img {
                width: 100%;
                display: block;
            }
        }

        &__date {
            margin-bottom: 10px;
            font-size: 14px;
            display: block;
        }

        &__title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-bottom: 20px;
        }

        &__overview {
            line-height: 1.3;
            margin-bottom: 30px;
        }

        &__nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

</style>
