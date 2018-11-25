<template>
    <section class="video-details" v-if="movieInfo">
        <div class="container">
            <div class="video-details__inner">
                <img class="video-details__img" :src="`${imgApiUrl}/t/p/w500${movieInfo.poster_path}`" alt="">
                <div class="video-details__text">
                    <div class="video-details__time">
                        <time class="">{{movieInfo.release_date}}</time>
                    </div>
                    <Score class="video-details__score" :score="+movieInfo.vote_average"/>
                    <h1 class="video-details__title">{{movieInfo.title}}</h1>
                    <div class="video-details__description">{{movieInfo.overview}}</div>
                    <div class="video-details__section" v-if="movieInfo.production_companies">
                        <h2 class="video-details__subtitle secondary-subtitle">Production companies</h2>
                        <ul class="video-details__list">
                            <li v-for="item in movieInfo.production_companies" :key="item.id">{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="video-details__section" v-if="movieInfo.production_countries">
                        <h2 class="video-details__subtitle secondary-subtitle">Production countries</h2>
                        <ul class="video-details__list">
                            <li v-for="item in movieInfo.production_countries" :key="item.id">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div v-else-if="isLoadFailed" class="video-not-find">
        Page not found
    </div>
</template>

<script>
    import Score from '@/components/Score.vue'
    import {config} from "../../config/config";

    export default {
        name: "video-details",
        data() {
            return {
                movieInfo: null,
                isLoadFailed: false
            }
        },
        components: {
            Score
        },
        computed: {
            imgApiUrl() {
                return config.imgApiUrl;
            }
        },
        created() {
            const id = this.$route.params.id;

            fetch(`${config.apiUrl}/movie/${id}?${config.key}`)
                .then( response => {
                    if(response.status === 404) {
                        this.isLoadFailed = true;
                        return null;
                    }
                    this.isLoadFailed = false;
                    return response.json();
                })
                .then( list => {
                    this.movieInfo = list;
                })
                .catch( () => {
                    alert('Sorry, request errors hepens');
                });
        }
    }
</script>

<style lang="scss">
    @import '../../sass/utils/variables';

    .video-not-find {
        padding-top: 60px;
        text-align: center;
        font-size: 35px;
    }

    .video-details {
        padding: 140px 0;
        font-size: 18px;

        &__inner {
            width: 100%;
            margin: 0 auto;
            display: flex;
        }

        &__img {
            width: 500px;
        }

        &__text {
            padding: 30px 25px;
        }

        &__time {
            display: block;
            margin-bottom: 10px;
        }

        &__score {
            margin-bottom: 15px;
        }

        &__title {
            font-size: 35px;
            font-weight: 800;
            margin-bottom: 30px;
        }

        &__subtitle {
            margin-bottom: 20px;
        }

        &__section {
            margin-bottom: 40px;
        }

        &__description {
            line-height: 1.4;
            margin-bottom: 25px;
        }

        &__list {
            line-height: 1.5;

            li {
                position: relative;
                padding-left: 25px;

                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 15px;
                    height: 1px;
                    background: $primary-color;
                }
            }
        }
    }
</style>
