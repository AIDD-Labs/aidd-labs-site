<script>
    import MaxWidth from "../components/global/MaxWidth.vue";

    export default {
        name: "AboutWebsite",
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
        meta-title="AIDD Labs Website About"
        meta-description="Background on how the AIDD Labs Website was made"
    />
    <MaxWidth class="news-page container" size="m" v-if="isLoaded">
        <div class="news__about">
            <h1>Curious about how this website was made?</h1>
            - Overview of website
            - Built on vue and md
            - Julianne Klebenow
            - All openly available on github, please fork our site if you use this.
            - train students to use git. 
        </div>
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
