<script>
    import {mapState} from "vuex";

    export default {
        name: "NewsGrid",
        props: {
            variant: {
                default: "l",
                validator(value) {
                    return ["m", "l"].includes(value);
                },
            },
            newsCount: Number,
            data: Array
        },
        data() {
            return {
                isLoaded: false
            };
        },
        computed: {
            ...mapState({
                news: state => state.news,
            }),
            recentNews() {
                return this.data || (this.newsCount ? this.news.slice(0,this.newsCount) : this.news)
            }
        },
        methods: {},
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <div class="news-grid" v-if="isLoaded" :class="`size-${variant}`">
        <div class="news-grid-item" v-for="newsitem in recentNews" :key="newsitem.id"> <NewsCard :newsitem="newsitem"/> </div>
    </div>
</template>

<style lang="scss">
    .news-grid {
        display: grid;
        row-gap: 0.5rem;
    }
    .news-grid-item {
        padding-bottom: 0.25rem;
        border-bottom: 1px solid #EAEAEA;
    }
</style>

