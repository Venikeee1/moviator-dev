<template>
    <div id="app">
        <MainHeader/>
        <div id="nav">
            <router-link to="/">Home</router-link>
        </div>
        <router-view :key="$route.path"/>
    </div>
</template>

<script>
    import MainHeader from '@/components/Header'

    export default {
        name: 'App',
        components: {
            MainHeader
        }
    }

</script>

<style lang="scss">
    @import './sass/utils/variables';
    @import './sass/static-styles';

    * {
        box-sizing: border-box;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: $primary-color;
        //background: lightblue;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
