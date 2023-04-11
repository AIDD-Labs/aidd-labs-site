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
                contentMetadata: state => state.contentMetadata,
            }),
            activeFilters() {
                return this.$route.query;
            },
            filters() {
                return [
                    {
                        key: "type",
                        label: "Type",
                        queryParam: "type",
                        options: this.contentMetadata.types,
                    },
                    {
                        key: "topics",
                        label: "Topic",
                        queryParam: "topic",
                        options: this.contentMetadata.topics,
                    },
                ];
            },
        },

        methods: {
            processContent() {
                let processed = [...this.contents];
                let query = this.$route.query;

                if (!this.contents.length) {
                    return;
                }

                processed = processed.filter(row => {
                    if (!Object.keys(query).length) {
                        return row;
                    } else {
                        let passesType = !query.type || row.meta.type == query.type;
                        let passesTopic =
                            !query.topic || row.meta.topics.includes(query.topic);

                        if (passesType && passesTopic) {
                            return row;
                        }
                    }
                });

                this.filteredContent = processed;
                this.isLoaded = true;
            },
        },
        watch: {
            activeFilters: {
                immediate: true,
                handler() {
                    this.isLoaded = false;
                    this.processContent();
                },
            },
        },
        mounted() {},
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
        </div>
        <div class="grid">
            <FilterBar :entities="contents" :filters="filters" pageDescription="We communicate our research for multiple audiences, making sure what we do
            reaches the people who need it. "/>
            <Loading v-if="!isLoaded" />
            <ContentGrid :data="filteredContent" v-if="isLoaded" />
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
        padding-top: 2em;
        position: relative;

        .grid {
            display: flex;
            gap: 4em;
            position: relative;

            @media (max-width: 1100px) {
                gap: 1em;
            }

            @media (max-width: 800px) {
                flex-direction: column;
                gap: 0;
            }
        }

        .filter-bar {
            position: sticky;
            flex-basis: 280px;
            top: 1.5em;
            left: 0;
            align-self: flex-start;

            @media (max-width: 800px) {
                position: initial;
                flex-basis: 100%;
            }
        }

        &__about {
            margin-bottom: 1.5em;
        }

        &__contents {
        }
    }
</style>
