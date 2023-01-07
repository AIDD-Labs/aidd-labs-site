<script>
    import {mapState} from "vuex";
    import {useRoute} from "vue-router";
    import {useHead} from "@vueuse/head";
    import Prism from "prismjs";
    import utils from "@/scripts/utils.js";

    export default {
        name: "Post",
        components: {},
        data() {
            return {
                ...this.$attrs.frontmatter,

                breakpointWatcher: "",

                readingTime: {},
                readingTimeUnit: "",

                activeHeadingId: "",

                activeWindow: {},

                titles: [], // same set in <TOC/>
                titleIds: [],
                nodes: [],
                minDepth: 0,
                idsByDepth: {},

                contentOffset: 0,

                titleIdsInView: [],
            };
        },
        computed: {
            ...mapState({
                posts: state => state.posts,
            }),
            activeMarkdownComponent() {
                return this.$route.name;
            },
            pubDates() {
                return this.$route.meta.date;
            },
            authorList() {
                return this.authors?.split() || ["Dr. Sabine Loos"];
            },
        },
        methods: {
            initHeadingTitles() {
                let titles = utils.getMarkdownTitles() || {
                    nodes: [],
                    minDepth: 1,
                    titles: [],
                };
                Object.keys(titles).forEach(key => {
                    this[key] = {...titles}[key];
                });

                let ids = [];
                this.nodes.forEach((node, index) => {
                    ids.push(node.id);
                });
                this.titleIds = ids;
            },
            getClosestId(activeWindow) {
                let titleIdsByDepth = {};
                this.titleIds.forEach((id, index) => {
                    if (index == this.titleIds.length - 1) {
                        // sometimes last section is not long enough
                        titleIdsByDepth[document.getElementById(id).offsetTop] = id;
                    } else {
                        titleIdsByDepth[document.getElementById(id).offsetTop] = id;
                    }
                });

                // // closes aka closest before, not after, scroll position
                let depths = Object.keys(titleIdsByDepth);
                let currentDepth = activeWindow.start;

                let titleId = this.titleIds[0];
                depths.forEach((depth, index) => {
                    if (depth < currentDepth + 200) {
                        titleId = this.titleIds[index] || this.titleIds[0];
                    }
                });
                return titleId;
            },
            setActiveHeadingId() {
                let windowHeight = window.innerHeight;
                let currentScrollDepth = window.scrollY;
                let activeWindow = {
                    start: currentScrollDepth,
                    end: currentScrollDepth + windowHeight,
                };

                this.activeWindow = activeWindow;
                this.activeHeadingId = this.getClosestId(activeWindow);
            },
            onScroll() {
                this.setActiveHeadingId();
            },
            scrollToHeading(headingId, $event) {
                $event.preventDefault();
                let element = document.getElementById(headingId);
                let top = element.offsetTop - 6 * 16;
                window.scrollTo({left: 0, top, behavior: "smooth"});
            },
            scrollToTop($event) {
                $event.preventDefault();
                let top = 0;
                window.scrollTo({left: 0, top, behavior: "smooth"});
            },
        },
        mounted() {
            window.addEventListener("scroll", this.onScroll);
            this.initHeadingTitles();
            this.setActiveHeadingId();

            Prism.highlightAll();

            let content = document.getElementsByClassName("markdown-body")[0]?.innerHTML;
            if (content) {
                this.readingTime = utils.getReadingTime(content);
                this.readingTimeUnit =
                    this.readingTime.readingTime < 2 ? "minute" : "minutes";
            }
        },
        beforeUnmount() {
            window.removEventListener("scroll", this.onScroll);
        },
    };
</script>

<template>
    <MaxWidth class="post" size="m">
        <div class="post-left"></div>
        <div class="post-center">
            <div class="content">
                <div class="metas">
                    <h1>{{ title }}</h1>
                    <div class="description" v-if="description">
                        {{ description }}
                    </div>
                    <div class="authors">
                        <div class="author" v-for="author in authorList" :key="author">
                            {{ author }}
                        </div>
                    </div>
                    <div class="other-metas">
                        <div class="publication" v-if="publication">
                            <strong>Publication:</strong> {{ publication }}
                        </div>
                        <div class="citation" v-if="citation">
                            <strong>Citation:</strong> {{ citation }}
                        </div>
                    </div>
                </div>
                <div class="article-text">
                    <slot />
                </div>
            </div>
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    .post {
        padding-top: 2em;
        padding-bottom: 3em;

        img {
            border: 1px solid;
        }

        .hero-wrapper {
            text-align: center;
        }

        .content {
            font-size: 1.125em;
        }

        .metas {
            h1 {
                text-transform: none;
                font-size: 3em;
                line-height: 1.15;
                margin-bottom: 0;

                @media(max-width: 1300px) {
                    font-size: 2em;
                }
            }
        }

        .other-metas {
            padding-top: 1em;
            font-size: 0.8em;
        }

        .authors {
            font-weight: 600;
        }

        .description {
            font-size: 1.25em;
            padding: 0.75em 0;
        }

        .abstract {
            padding: 1em 0;
        }

        .article-text {
            padding-top: 1.5em;
        }
    }
</style>
