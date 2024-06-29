<script>
    import {mapState} from "vuex";
    import {timeFormat, timeParse} from "d3";

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
                // isLoaded: false,
                ...this.newsitem.meta,
            };
        },
        computed: {
            family(){
                return this.newsitem.path.split("/")[1]
            },
            newsMember(){
                return this.newsitem.meta.members
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
                    return `Welcome ${this.newsitem.meta.name}, new ${this.newsitem.meta.title}!`
                }else if(this.family==="content"){
                    const type=this.newsitem.meta.type.split("-").map(str=>str.charAt(0).toUpperCase() + str.slice(1)).join(" ")
                    return `New ${type}: ${this.newsitem.meta.title}`
                }else if(this.family==="projects"){
                    return `New Project: ${this.newsitem.meta.title}`
                }else{
                    return this.newsitem.meta.title
                }
            },
            newsDate(){
                let ret=''
                let date=this.newsitem.meta.createdDate
                if (this.family==="content"){
                    date=this.newsitem.meta.date
                }
                
                if (date){
                    let parseTime = timeParse("%Y-%m-%d");
                    let parsedDate = parseTime(date.split('T')[0]);
                    ret = timeFormat(`%b %d, %Y`)(parsedDate);
                }
                return ret
            },
            newsLink(){
                return this.newsitem.path
            }
        },
        methods: {},
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <Link no-decoration :to="newsLink" class="news-card">
        <div class="news-card__header">
            <TagPill :tag= "newsType" :variant="family"/>
            <p>{{ newsDate }}</p>
        </div>
        <h4>{{ newsTitle }}</h4>
        <p>{{ this.newsitem.meta?.description }}</p>
    </Link>
</template>

<style lang="scss">
    .news-card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        & p {
            margin: 0;
            font-weight: 400;
        }

        & h4 {
            margin: 0;
        }
    }
    .news-card__header {
        display: flex;
        justify-content: space-between;
        & .tag-pill{
            &.team{
                background: var(--orange-500);
            }
            &.projects{
                background: var(--blue-500);
            }
            &.content{
                background: var(--purple-500);
            }
            &.news{
                background: var(--green-600);
            }
        }
    }
</style>

