<script>
    let projectData = [
        {
            slug: "dessert-person",
            title: "Dessert Person viz",
            intro: "test test",
            section: "data-viz",
            date: "2021-08-28",
            status: "active",
            updates: ["2021-08-18", "2021-08-18"],
        },
        {
            slug: "movies",
            title: "Movies Consumed",
            intro: "test test",
            section: "data-viz",
            date: "2021-08-18",
            status: "active",
            updates: ["2021-08-18", "2021-08-18"],
        },
    ];
    export default {
        name: "Work",
        components: {},
        data() {
            return {
                sortedWork: [],
                projectData,
            };
        },
        computed: {},

        methods: {
            initWork() {},
            filterWork() {},
            sortWork() {},
        },
        mounted() {
            this.sortedWork = [...this.projectData];
        },
    };
</script>

<template>
    <MaxWidth>
        <div>
            <div v-for="project in sortedWork" :key="project.title">
                {{ project.title }}
            </div>
        </div>
    </MaxWidth>
</template>

<style lang="scss" >

</style>
