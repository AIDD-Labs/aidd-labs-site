<script>
import { mapState } from 'vuex';

    export default {
        name: "Project",
        data() {
            return {
                ...this.$attrs.frontmatter
            }
        },
        computed: {
            ...mapState({
                teamMembers: state => state.members,
            }),
            nonProjectMembers () {
                return Object.keys(this.teamMembers).filter(member => !this.members.includes(member));
            }
        },
        methods: {},
        mounted() {},
        beforeUnmount() {},
    };
</script>

<template>
    <MaxWidth class="post" size="m">
        <h1>{{title}}</h1>
        <h2>Members</h2>
        <MembersGrid :exclude="nonProjectMembers"/>
        <div class="project-text">
            <slot />
        </div>
    </MaxWidth>
</template>

<style lang="scss">
</style>
