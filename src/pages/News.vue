<script>
    import MaxWidth from "../components/global/MaxWidth.vue";

    export default {
        name: "News",
        components: {
            MaxWidth,
        },
        data() {
            return {
                isLoaded: false,
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
    <SEO
        meta-title="News"
        meta-description="Recent awards, publications, and other news from AIDD Labs at University of Michigan."
    />
    <MaxWidth class="news-page container" size="m" v-if="isLoaded">
        <div class="news__about">
            <h1>News</h1>
            Recent awards, publications, and other news from AIDD Labs at University of Michigan.
        </div>
        <NewsGrid/>
    </MaxWidth>
</template>

<style lang="scss">
    .news-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 5em;
        padding-top: 4em;
        gap: 2em;

        > div:not(:last-child) {
            margin-bottom: 1rem;
        }
    }
</style>
