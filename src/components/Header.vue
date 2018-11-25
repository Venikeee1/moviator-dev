<template>
    <header class="header">
        <div class="header__inner container">
            <Logo/>
            <div class="header__search">
                <form class="header__form" action="">
                    <label>
                        <!--<span>Search</span>-->
                        <input
                                v-focus="setFocus"
                                v-model="searchText"
                                @input="getSearchList"
                                class="header__input"
                                type="text"
                        >
                    </label>
                    <svg class="header__svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512">
                        <g>
                            <path d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z"/>
                        </g>
                    </svg>
                </form>
            </div>
        </div>
        <div class="header__search-result" v-if="searchIsFocused">
            <div class="container">
                <button @click="removeFocus" class="filter__close-btn">
                    <span>Close</span>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 212.982 212.982" style="enable-background:new 0 0 212.982 212.982;" xml:space="preserve">
                    <g id="Close">
                        <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312
                            c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312
                            l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937
                            c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"/>
                    </g>
                    </svg>
                </button>
                <ul class="header__search-list" v-if="searchList">
                    <li class="header__search-item" v-for="item in searchList" :key="item.id">
                        <router-link @click.native="removeFocus" :to="{name: 'video-page', params: {id: item.id}}">
                            {{item.name}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
    import Logo from '@/components/Logo'
    import {config} from "../config/config";

    export default {
        name: "main-header",
        components: {
            Logo
        },
        data() {
            return {
                searchText: '',
                searchList: null,
                searchIsFocused: false
            }
        },
        computed: {
            seearchUrl() {
                return `${config.apiUrl}/${config.search}/keyword?page=1&query=${this.searchText}&${config.key}`;
            }
        },
        methods: {
            setFocus() {
                this.searchIsFocused = true;
            },
            removeFocus() {
                this.searchIsFocused = false;
            },
            getSearchList() {
                if (!this.searchText) return;

                fetch(this.seearchUrl)
                    .then((response) => {
                        return response.json();
                    })
                    .then((searchList) => {

                        if (searchList.results.length > 0) {
                            this.searchList = searchList.results;
                        } else {
                            this.searchList = null
                        }

                    })
                    .catch(() => {
                        console.log('Sorry, request errors hepens');
                    })
            }
        }
    }
</script>

<style lang="scss">
    @import '../sass/utils/variables';
    
    .filter__close-btn {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        margin-left: auto;
        margin-top: 20px;
        font-size: 20px;

        svg {
            width: 30px;
            height: 30px;
            margin-left: 10px;
        }
    }

    .header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: lightblue;
        padding: 10px 0;
        z-index: 50;

        &__inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__search-result {
            max-height: 400px;
            overflow: auto;
            text-align: right;
            font-size: 18px;
            font-weight: 500;
        }

        &__search-list {
            padding-top: 20px;
        }

        &__search-item {
            border-bottom: 1px solid $primary-color;
            padding: 15px 0;
        }

        &__form {
            position: relative;
        }

        &__input {
            background: none;
            border: 1px solid transparent;
            border-bottom: 1px solid $primary-color;
            width: 200px;
            margin-left: 35px;
            color: inherit;
            font-size: 18px;
            outline: none;
            transition: width 0.3s;

            &:focus {
                width: 400px;
            }
        }

        &__svg {
            position: absolute;
            left: 0;
            bottom: -10px;
            width: 30px;
            height: 30px;
            fill: $primary-color;
        }

    }
</style>
