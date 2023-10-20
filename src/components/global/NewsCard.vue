<script>
    import {mapState} from "vuex";

    export default {
        name: "NewsCard",
        props: {
            newsitem: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                isLoaded: false
            };
        },
        computed: {
        },
        methods: {},
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <div>{{ newsitem.id }}</div>
</template>

<style lang="scss">

</style>

