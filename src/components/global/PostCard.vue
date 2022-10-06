<script>
    import {timeFormat} from "d3";
    export default {
        name: "PostCard",
        components: {},
        props: {
            post: {
                type: Object,
                required: true,
            },
            tagCount: {
                type: Number,
                default: 1,
            },
        },
        data() {
            return {};
        },
        computed: {
            title: state => state.post.meta.title,
            description: state => state.post.meta.description,
            tags: state => state.post.meta.tags,
            path: state => state.post.path,
            dates: state => state.post.meta.date,
            humanDate() {
                return timeFormat(`%b %d`)(new Date(this.dates[0]));
            },
            thumbnailPath() {
                return this.post.meta.thumbnailPath || "";
            },
        },
        methods: {
            // getFullUrl(relativeUrl) {
            //     return new URL(relativeUrl, import.meta.url).href;
            // }
        },
        mounted() {
            // let bees = this.getFullUrl("/src/content/2019-1125-currents/currents-info.gif");
            // console.log(bees)
        },
    };
</script>

<template>
    <a class="PostCard">
        <div>
            <div class="main">
                <h3>
                    {{ title }}
                </h3>
                <div class="date">
                    {{ humanDate }}
                </div>
            </div>
            <div class="description">
                {{ description }}
            </div>
        </div>
        <div class="tags">
            <div v-for="tag in tags.slice(0, tagCount)" :key="tag" class="tag">
                {{ tag }}
            </div>
        </div>
    </a>
</template>

<style lang="scss">
    .PostCard {
        padding: 1em 0 1em;
        width: 100%;
        //background: lightgrey;
        text-decoration: none;

        // &:hover {
        //     background: rgba(#97d8f1, 0.1);
        //      border-color: darken(#97d8f1, 20%);
        //     cursor: pointer;
        // }

        h3 {
            margin: 0;
            line-height: 1.1;
        }

        .main {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 1em;
        }

        .date {
            opacity: 0.4;
            font-size: 0.85em;
            min-width: fit-content;
        }

        .description {
            margin: 1em 0;
        }

        .tags {
            display: flex;
            gap: 0.3em;
            margin: 0.5em 0 0;
        }

        .tag {
            background: rgba(lightgrey, 0.3);
            color: #727272;
            display: inline-block;
            font-size: 0.85em;
            padding-left: 0.2em;
            padding-right: 0.2em;
        }
    }
</style>
