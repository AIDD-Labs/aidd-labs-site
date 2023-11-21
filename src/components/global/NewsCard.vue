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
            family(){
                return this.newsitem.path.split("/")[1]
            },
            newsType(){
                let type
                if (this.newsitem.meta.type) {
                    type=this.newsitem.meta.type
                }else{
                    const map={
                        projects:"Project",
                        team:"Team Member"
                    }
                    type=map[this.family]
                }
                return type
            },
            newsTitle(){
                if (this.family==="team"){
                    return `New ${this.newsitem.meta.title}: ${this.newsitem.meta.name}`
                }else if(this.family==="content"){
                    const type=this.newsitem.meta.type.split("-").map(str=>str.charAt(0).toUpperCase() + str.slice(1)).join(" ")
                    return `New ${type}: ${this.newsitem.meta.title}`
                }else if(this.family==="projects"){
                    return `New Project: ${this.newsitem.meta.title}`
                }
            },
            newsDate(){
                let date=this.newsitem.meta.createdDate
                if (this.family==="content"){
                    date=this.newsitem.meta.date
                }
                return date
            }
        },
        methods: {},
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <TagPill :tag= "newsType"/>
    <div>{{ newsTitle }}</div>
    <div>{{ newsDate }}</div>
</template>

<style lang="scss">

</style>

