<script>
    import {mapState} from "vuex";

    export default {
        name: "Content",
        data() {
            return {
                isLoaded: false,
                filteredContent: [],
            };
        },
        computed: {
            ...mapState({
                contents: state => state.contents,
            }),
            activeFilters() {
                return this.$route.query;
            }
        },

        methods: {
            processContent() {
                let processed = [...this.contents];
                let query = this.$route.query;

                if (!this.contents.length) {
                    return;
                }

                // this.contents.forEach(row => {
                //     let tags = row.meta.tags; // topics
                //     let type = row.meta.type;

                //     if (!Object.keys(this.$route.query).length) {
                //        processed.push(row);
                //     }
                // });

                processed.filter(row => {
                    if (!Object.keys(query).length) {
                       return row;
                    } else {
                        return row.type == query.type && row;
                    }
                })

                
                this.filteredContent = processed;
            },
        },
        watch: {
            activeFilters: {
                immediate: true,
                handler() {
                    this.processContent();
                },
            },
        },
        mounted() {
            //this.filteredContent = this.contents;
            this.isLoaded = true;
        },
    };
</script>

<template>
    <SEO
        meta-title="Content"
        description="Journal articles, blog posts,
            visualizations, reports, presentations, and podcasts on AIDD work."
    />
    <MaxWidth class="contentpage container" size="m">
        <div class="contentpage__about">
            <h1>Content</h1>
            <p>
                We communicate our research for multiple audiences, making sure what we do
                reaches the people who need it. Below, find our journal articles, blog
                posts, visualizations, reports, presentations, and podcasts on our work.
            </p>
        </div>
        <div class="grid">
            <FilterBar :content="contents" />
            <div class="contentpage__contents" v-if="isLoaded">
                <div
                    v-for="content in filteredContent"
                    :key="content.slug"
                    class="content"
                >
                    <Link no-decoration :to="content.meta.url" class="member card">
                        <div class="hoverwrap">
                            <img :src="content.meta.thumbnail" />
                            <!-- <div class="hovercap">{{ content.meta.title }}</div> -->
                            <div class="hovercap">
                                Read More <span class="arrow">→</span>
                            </div>
                        </div>
                        <div class="metas">
                            {{ content.meta.title }}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    @import "./../styles/globals";
    .contentpage {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 8em;
        padding-top: 4em;
        position: relative;

        .grid {
            display: flex;
            gap: 4em;
            position: relative;
        }

        .filter-bar {
            position: sticky;
            top: 0;
            left: 0;
            align-self: flex-start;
        }

        &__contents {
            display: grid;
            grid-template-columns: repeat(4, minmax(100px, 1fr));
            gap: 2em;

            @media (max-width: 1100px) {
                grid-template-columns: repeat(3, minmax(100px, 1fr));
            }

            @media (max-width: 900px) {
                grid-template-columns: repeat(2, minmax(100px, 1fr));
            }

            @media (max-width: 600px) {
                grid-template-columns: minmax(100px, 1fr);
            }
        }

        .content {
            flex: 1;
        }

        /* (A) WRAPPER */
        .hoverwrap {
            position: relative;
        }

        /* (B) RESPONSIVE IMAGE */
        .hoverwrap img {
            display: block;
            width: 100%;
        }

        /* (C) CAPTION */
        .hovercap {
            /* (C1) DIMENSIONS */
            box-sizing: border-box;
            width: 100%;
            height: 100%;

            /* (C2) POSITION */
            position: absolute;
            top: 0;
            left: 0;
            text-align: left;
            padding: 0.75em 1.25em;

            /* (C3) COLORS */
            background-color: rgba(30, 38, 72, 0.9);
            color: white;
        }

        /* (D) SHOW/HIDE */
        .hovercap {
            visibility: none;
            opacity: 0;
            transition: opacity 0.5s;
        }
        .hoverwrap:hover .hovercap {
            visibility: visible;
            opacity: 1;
        }

        .member {
            text-decoration: none;

            &.card {
                flex: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
                border-radius: 6px;
                overflow: hidden;
                border: 1px solid rgba(black, 0.1);

                &:hover {
                    box-shadow: 0 5px 1em 0 rgba(black, 0.5);
                    border: 1px solid rgba(30, 38, 72, 0.9);
                }

                .hoverwrap {
                }
            }

            .metas {
                padding: 0.75em 1.25em;
                flex: 1;
                background: rgba(30, 38, 72);
                color: white;
            }
        }
    }
</style>
