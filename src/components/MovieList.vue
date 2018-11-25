<template>
    <section class="movie-list" v-if="movieList" ref="movieList">
        <div class="container movie-list__inner">
            <MovieItem class="movie-list__item" v-for="(movieItem, index) in movieList" :key="index" :movieDetails="movieItem"/>
        </div>
    </section>
</template>

<script>
    import MovieItem from '@/components/MovieItem.vue'
    import {config} from "../config/config";

    export default {
        name: "movie-list",
        components: {
            MovieItem
        },
        data() {
            return {
                movieList: null,
                currentPage: 1,
                body: document.body,
                html: document.documentElement,
                bottomGap: 150,
                isDataLoadingDisabled: false
            }

        },
        computed: {
            pageUrl() {
                return  `${config.apiUrl}/${config.trends}/movie/day?page=${this.currentPage}&${config.key}`;
            }
        },
        created() {
            fetch(this.pageUrl)
                .then(function(response) {
                    return response.json();
                })
                .then((list) => {
                    this.movieList = list.results;
                    this.currentPage++;
                })
                .catch( () => {
                    alert('Sorry, request errors hepens');
                });
        },
        methods: {
            getAdditionalMovies() {
                if(!this.isDataLoadingDisabled) {
                    this.isDataLoadingDisabled = true;
                    fetch(this.pageUrl)
                        .then((response) => {
                            return response.json();
                        })
                        .then((movieList) => {
                            this.addMovies(movieList.results);
                            this.currentPage++;
                        })
                        .catch( () => {
                            alert('Sorry, request errors hepens');
                        })
                        .finally( () => {
                            this.isDataLoadingDisabled = false;
                        })
                }

            },
            addMovies(arr) {
                if (arr.length > 0) this.movieList.push(...arr);
            },
            isScrollEnd() {
                const height = Math.max( this.body.scrollHeight, this.body.offsetHeight,
                    this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight );
                const scrolled = window.pageYOffset || document.documentElement.scrollTop;
                const delta = height - window.innerHeight - this.bottomGap - scrolled;

                if(delta <= 0) {
                    this.getAdditionalMovies();
                }
            }
        },
        mounted() {
            window.addEventListener('scroll', this.isScrollEnd);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.isScrollEnd);
        }

    }
</script>

<style lang="scss">

    .movie-list {
        padding-top: 140px;

        /*&__title {*/
            /*text-align: center;*/
            /*margin-bottom: 2em;*/
        /*}*/

        &__inner {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        &__item {
            margin-bottom: 40px;
        }
    }


</style>
