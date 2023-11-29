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
            filteredMembers() {
                return Object.values(this.members).filter(member=>member.meta.type!=="external")
            },
            filteredProjects() {
                return this.projects.filter(project=>project.meta.status!=="draft")
            },
            recentNews() {
                const allItems = [...this.contents, ...this.filteredProjects, ...this.filteredMembers]
                const sortedItems = allItems.sort((a,b) => {
                    return new Date(b.meta.createdDate) - new Date(a.meta.createdDate)
                })
                console.log(sortedItems)
                return sortedItems.slice(0,10)
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

