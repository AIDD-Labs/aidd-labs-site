<script>
    import {mapState} from "vuex";
    import Prism from "prismjs";
    import utils from "@/scripts/utils.js";

    export default {
        name: "NewsItem",
        components: {},
        data() {
            return {
                ...this.$attrs.frontmatter,

                isLoaded: false,

                readingTime: {},
                readingTimeUnit: "",

                activeHeadingId: "",

                activeWindow: {},

                titles: [], // same set in <TOC/>
                titleIds: [],
                nodes: [],
                minDepth: 0,
                idsByDepth: {},
            };
        },
        computed: {
            primaryAuthor() {
                if (this.members?.length) {
                    return this.members[0];
                    // Need to specifically check for members and length here for ssg build
                } else {
                    return "sabine-loos";
                }
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
            if (this.title) {
                this.isLoaded = true;
            }
        },
        beforeUnmount() {
        },
    };
</script>

<template>
    <MaxWidth class="newsitem" size="m">
        <div class="wrapper" v-if="isLoaded">
            <div class="newsheader">
                <Link no-decoration class="back-link" to="/news"
                    ><span class="arrow">← &nbsp;</span>News</Link
                >
            <h1>{{ title }}</h1>
            </div>
            <div class="content">
                <div class="metas">
                    <div class="tags">
                                <TagPill variant="type" :tag="type" />
                            </div>
                            <div class="description" v-if="description">
                                {{ description }}
                    </div>
                    <div class="article-text">
                        <slot />
                    </div>
            </div>
                <div class="sidebar">
                        <AuthorBlock :author="primaryAuthor" />
                        <TOC :active-heading="activeHeadingId" />
                </div>
            </div>

        </div>
    </MaxWidth>
</template>

<style scoped lang="scss">
    .newsitem {
        padding-top: 4em;
        padding-bottom: 3em;
        font-size: 1.125em;

        .wrapper {
            display: flex;
            flex-direction: column;
            gap: 1em;
            position: relative;
            padding-top: 1em;

            @media (max-width: 1100px) {
                gap: 4em;
            }

            @media (max-width: 1000px) {
                gap: 2em;
            }

            .content {
                display: flex;
                gap: 6em;
                .metas {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 1em;
                    flex-basis: 1200px;

                    .tags {
                        display: flex;
                        gap: 0.5em;
                        flex-wrap: wrap;
                    }
                    
                    .article-text {

                        .markdown-body {
                            img {
                                border: 1px solid;
                            }
                        }
                    }

                    .description {
                        font-weight: 500;
                        //padding: 0.75em 0;
                    }
                }
                .sidebar {
                    position: sticky;
                    top: 1em;
                    align-self: flex-start;
                    padding-bottom: 4em;
                    width: 24em;

                    @media (max-width: 1000px) {
                        display: none;
                    }
                }
            }


            .newsheader {
            .back-link {
                margin-bottom: 1.5em;
                font-size: 0.8em;
                color: var(--blue-700);
            }

            h1 {
                text-transform: none;
                font-size: 3em;
                line-height: 1.15;
                margin-bottom: 0;
                margin-top: 0;

                @media (max-width: 1300px) {
                    font-size: 2em;
                }
            }
            }
        }
    }
</style>
