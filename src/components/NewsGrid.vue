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
        },
        data() {
            return {
                isLoaded: false
            };
        },
        computed: {
            ...mapState({
                members: state => state.members,
                contents: state => state.contents,
                projects: state => state.projects,
            }),
            recentNews() {
                const allItems = [...this.contents, ...this.projects, ...Object.values(this.members)]
                const sortedItems = allItems.sort((a,b) => {
                    return new Date(b.meta.createdDate) - new Date(a.meta.createdDate)
                })
                console.log(sortedItems)
                return "hi!"
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
        <h1>{{this.recentNews}}</h1>
    </div>
</template>

<style lang="scss">

</style>

