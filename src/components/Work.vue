<script>
    import {mapState} from "vuex";
    let projectData = [
        {
            slug: "2020-bachelor",
            title: "Bachelor 2020 Contestant Guide",
            intro: "Hannah Ann, Madison, Kelly, oh my!",
            date: "2020-03-28",
            status: "pinned",
            updates: ["2020-03-28"],
            tags: ["react", "d3", "dataviz"],
            extra: {},
        },
        {
            slug: "currents",
            title: "Currents Dashboard",
            intro: "A look into the Current's Attention analytics dashboard built at Parse.ly.",
            date: "2020-01-19",
            status: "sunsetted",
            updates: ["2020-01-19"],
            tags: ["react", "d3", "figma"],
            extra: {},
        },
        {
            slug: "prist",
            title: "Prist | A Gatsby & Prismic Starter",
            intro: "A light-themed starter powered by Gatsby v2 and Prismic to showcase portfolios and blogs.",
            date: "2020-01-19",
            status: "sunsetted",
            updates: ["2020-01-19"],
            tags: ["gatsby", "react", "figma", "cms", "netlify"],
            extra: {
                repo: "https://github.com",
                demo: "https://github.com",
                docs: "https://github.com",
            },
        },
        {
            slug: "dvs",
            title: "Data Visualization Society Member Map",
            intro: "The Data Visualization Society asked members to rank their skills in the following categories: data, visualization, and society. I mapped the location of each member with the ability to filter by their highest ranked skill to show the distribution of each around the world.",
            date: "2019-09-19",
            status: "sunsetted",
            updates: ["2020-01-19"],
            tags: ["react", "d3", "dataviz"],
            extra: {
                repo: "https://github.com",
            },
        },
    ];

    export default {
        name: "Work",
        components: {},
        props: {},
        data() {
            return {
                sortedWork: [],
                projectData,
            };
        },
        computed: {
            ...mapState({}),
        },
        methods: {},
        mounted() {
            this.sortedWork = [...this.projectData];
        },
    };
</script>

<template>
    <MaxWidth class="Work" size="xl">
        <div class="projects">
            <div
                class="project-container"
                v-for="project in sortedWork"
                :key="project.title"
            >
                <div>
                    {{ project.title }}
                </div>
            </div>
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    .Work {
        width: 100%;

        .projects {
            display: flex;

            .project-container {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            .project-image {
                width: 100%;
                max-width: 500px;
            }
        }
    }
</style>
