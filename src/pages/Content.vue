<script>
    import {mapState} from "vuex";

    export default {
        name: "Content",
        data() {
            return {
                isLoaded: false,
                tags: ["all", "risk", "impact", "recovery"],
                methods: ["all", "risk", "impact", "recovery"], // ONE DAY

                types: [
                    "all",
                    "journal-article",
                    "report",
                    "presentation",
                    "visualization",
                    "blog",
                    "podcast",
                    "software",
                ],

                tagFilter: "all",
                typeFilter: "all",

                filteredContent: [],
            };
        },
        computed: {
            ...mapState({
                contents: state => state.contents,
            }),
        },

        methods: {
            setTagFilter(tag) {
                this.tagFilter = tag;
            },
            setTypeFilter(type) {
                this.typeFilter = type;
            },
            filterContent() {
                return this.contents.filter(content => {
                    const meta = content.meta || {};

                    const tagFilterCheck =
                        this.tagFilter === "all"
                            ? true
                            : meta.tags.includes(this.tagFilter);
                    const typeFilterCheck =
                        this.typeFilter === "all" ? true : meta.type === this.typeFilter;

                    return tagFilterCheck && typeFilterCheck;
                });
            },
        },
        mounted() {
            this.filteredContent = this.contents;
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
            <div class="contentpage__filters">
                <div class="contentpage__filters__Type">
                    <h2 class="">TYPE</h2>
                    <RadioGroup
                        :name="activeType"
                        :options="types"
                        v-model="typeFilter"
                        @radioGroupChange="setTypeFilter"
                    />
                </div>
                <div class="contentpage__filters__Topic">
                    <h2 class="">TOPIC</h2>
                    <RadioGroup
                        :name="activeTag"
                        :options="tags"
                        v-model="tagFilter"
                        @radioGroupChange="setTagFilter"
                    />
                </div>
            </div>
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
                            <div class="hovercap">Read More <span class="arrow">→</span></div>
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
        position: relative;

        .grid {
            display: flex;
            gap: 4em;
            position: relative;
        }

        > div:not(:last-child) {
            margin-bottom: 1rem;
        }

        &__filters {
            display: flex;
            flex-direction: column;
            gap: 2em;

            position: sticky;
            top: 2em;
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
