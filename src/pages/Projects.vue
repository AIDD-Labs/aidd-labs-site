<script>
    import {mapState} from "vuex";

    export default {
        name: "Projects",
        data() {
            return {
                isLoaded: false,
                filteredProjects: [],
            };
        },
        computed: {
            ...mapState({
                projects: state => state.projects,
                projectMetadata: state => state.projectMetadata,
            }),
            activeFilters() {
                return this.$route.query;
            },
            filters() {
                return [
                    {
                        key: 'topic',
                        label: "Topic",
                        queryParam: 'topic',
                        options: this.projectMetadata.topic,
                    },
                    {
                        key: 'methods',
                        label: "Methods",
                        queryParam: 'methods',
                        options: this.projectMetadata.methods,
                    },
                    {
                        key: 'locations',
                        label: "Location",
                        queryParam: 'locations',
                        options: this.projectMetadata.locations,
                    }
                    
                ]
            }
        },

        methods: {
            processProjects() {
                let processed = [...this.projects];
                let query = this.$route.query;

                if (!this.projects.length) {
                    return;
                }

                processed = processed.filter(row => {
                    if (!Object.keys(query).length) {
                        return row;
                    } else {
                        let passesMethod = !query.methods || row.meta.methods.includes(query.methods);
                        let passesLocation = !query.locations || row.meta.locations.includes(query.locations);
                        let passesTopic = !query.topic || row.meta.topic.includes(query.topic);

                        if (passesMethod && passesLocation && passesTopic) {
                            return row;
                        }
                    }
                });

                this.filteredProjects = processed;
                this.isLoaded = true;
            },
        },
        watch: {
            activeFilters: {
                immediate: true,
                handler() {
                    this.isLoaded = false;
                    this.processProjects();
                },
            },
        },
        mounted() {},
    };
</script>

<template>
    <SEO
        meta-title="Projects"
        description="Research projects AIDD labs conducts."
    />
    <MaxWidth class="projectpage container" size="m">
        <div class="projectpage__about">
            <h1>Projects</h1>
        </div>
        <div class="grid">
            <FilterBar :entities="projects" :filters="filters" pageDescription="Our projects surround the use and design of disaster information."/>
            <Loading v-if="!isLoaded" />
            <ContentGrid :data="filteredProjects" v-if="isLoaded" />
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    @import "./../styles/globals";
    .projectpage {
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

        &__about {
            margin-bottom: 1.5em;
        }
    }
</style>
