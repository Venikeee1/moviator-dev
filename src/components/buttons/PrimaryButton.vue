<template>
    <router-link :to="to" class="primary-button">
        <slot></slot>
    </router-link>
</template>

<script>
    export default {
        name: "primary-button",
        props: {
            to: [String, Object]
        }
    }
</script>

<style lang="scss">
    @import '../../sass/utils/variables';

    .primary-button {
        display: inline-block;
        text-transform: uppercase;
        font-size: 14px;
        color: $primary-color;
        border: 1px solid $primary-color;
        text-decoration: none;
        padding: 8px 15px;
        min-width: 140px;
        text-align: center;
        transition: color 0.4s, background-color 0.4s;

        &:hover {
            color: #fff;
            background: $primary-color;
        }
    }
</style>
