<script>
    export default {
        name: "MarkdownContainer",
        components: {},
        props: {},
        emits: [],
        data() {
            return {
                frontmatter: this.$attrs.frontmatter,
            };
        },
        computed: {
            componentName() {
                if (this.frontmatter.component) {
                    return this.frontmatter.component;
                } else {
                    const routeToComponent = {
                        content: 'Post',
                        projects: 'Project',
                        team: 'Member'
                    }
                    const routeName = this.$route.path.split('/')[1]
                    return routeToComponent[routeName];
                }
            },
        },
        methods: {},
        mounted() {},
    };
</script>
<template>
    <div class="MarkdownContainer">
        <component :is="componentName" :frontmatter="frontmatter">
            <slot />
        </component>
    </div>
</template>
<style lang="scss">
    .MarkdownContainer {
    }
</style>
