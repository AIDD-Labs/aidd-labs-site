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
            <div
                class="projectpage__projects"
                v-if="isLoaded"
                :style="{alignItems: filteredProjects.length <= 3 && 'flex-start'}"
            >
                <div
                    v-for="project in filteredProjects"
                    :key="project.slug"
                    class="project"
                >
                    <Link no-decoration :to="`/projects/${project.meta.slug}`" class="member card">
                        <div class="hoverwrap">
                            <div class="img-container">
                                <img
                                    :src="
                                        project.meta.thumbnail ||  '/img/home-hero-1.png'
                                    "
                                />
                            </div>
                            <!-- <div class="hovercap">{{ content.meta.title }}</div> -->
                            <div class="hovercap">
                                Read More <span class="arrow">→</span>
                            </div>
                        </div>
                        <div class="metas">
                            {{ project.meta.title }}
                        </div>
                    </Link>
                </div>
            </div>
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

        &__projects {
            display: grid;
            grid-template-columns: repeat(3, minmax(100px, 1fr));
            gap: 2em;
            flex: 1;
            //align-items: flex-start;

            @media (max-width: 1100px) {
                grid-template-columns: repeat(3, minmax(100px, 1fr));
                gap: 1em;
            }

            @media (max-width: 900px) {
                grid-template-columns: repeat(2, minmax(100px, 1fr));
            }

            @media (max-width: 600px) {
                grid-template-columns: minmax(100px, 1fr);
            }
        }

        .project {
            flex: 1;
        }

        /* (A) WRAPPER */
        .hoverwrap {
            position: relative;
        }

        /* (B) RESPONSIVE IMAGE */
        .hoverwrap img {
            //display: block;
            //width: 100%;
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

        .img-container {
            height: 230px;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: flex-start;
            background-color: rgba(30, 38, 72, 0.9); 
            // rgba(30, 38, 72, 0.9);
            justify-content: center;

            img {
                height: 100%;
                width: auto;
            }
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
