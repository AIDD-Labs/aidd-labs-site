<script>
    import {mapState} from "vuex";
    import {timeFormat, timeParse} from "d3";
    export default {
        name: "ContentCard",
        components: {},
        props: {
            article: {
                type: Object,
                required: true,
            },
        },
        emits: [],
        data() {
            return {
                ...this.article.meta,
            };
        },
        computed: {
            meta() {
                return this.article?.meta;
            },
            imageSrc() {
                if (this.article?.meta?.thumbnail[0] != "/") {
                    // Image should start with `/` to specify root folder beginning
                    return `/${this.article.meta.thumbnail}`;
                } else {
                    return this.article?.meta?.thumbnail;
                }
            },
            humanDate() {
                if (!this.date) {
                    return "";
                }
                else if (this.$route.name==="Projects") {
                    return this.date;
                }
                else {
                    let parseTime = timeParse("%Y-%m-%d");
                    let recentDate = parseTime(this.date);
                    return timeFormat(`%b %d, %Y`)(recentDate);
                }
            },
        },
        methods: {},
        mounted() {},
    };
</script>
<template>
    <Link no-decoration :to="article.path" class="content-card">
        <div class="hover-plate">
            <p class="description">
                {{ description }}
            </p>
            <div>Read More <span class="arrow">→</span></div>
        </div>
        <div class="image-container">
            <img :src="imageSrc" alt="" />
        </div>
        <div class="article-metas">
            <TagPill
                v-if="type" 
                    variant="type"
                    :tag="meta?.type"
                 />
            <TagPill
                v-else-if="topics" 
                    :tag="topics[0]"
                 />
            <div class="date">
                {{ humanDate }}
            </div>
        </div>
        <h4 class="article-metas">
            {{ meta?.title }}
        </h4>
        <AuthorBlock
            no-link
            orientation="landscape"
            v-if="members"
            :author="meta?.members[0]"
        />
    </Link>
</template>
<style lang="scss">
    .content-card {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        position: relative;

        .hover-plate {
            opacity: 0;
            background-color: rgba(30, 38, 72, 0.9);
            color: white;
            padding: 1em;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            p {
                display: -webkit-box;
                -webkit-line-clamp: 9;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }

        &:hover {
            .hover-plate {
                opacity: 1;
            }

            border-radius: 16px;
            overflow: hidden;
        }

        .image-container {
            height: 10em;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            border: 1px solid black;

            img {
                width: 500px;
                height: auto;
            }
        }

        h4 {
            line-height: 1.25;
            margin: 0;
        }

        .article-metas {
            display: flex;
            justify-content: space-between;

            .date {
                font-size: 0.8em;
                opacity: 0.5;
            }
        }
        .author-block {
            .author-metas.landscape {
                align-items: flex-start;
                gap: 0.5em;

                .info {
                    padding-top: 0.7em;
                }
                .bio-image-container {
                    border-radius: 30px;
                    width: 30px;
                    height: 30px;
                }
            }

            .author-metas.landscape .bio-content {
                display: none;
            }
        }
    }
</style>
