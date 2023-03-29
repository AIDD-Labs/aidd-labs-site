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
                allContent: state => state.contents
            }),
            nonProjectMembers () {
                return Object.keys(this.teamMembers).filter(member => !this.members?.includes(member));
            },
            projectContent () {
                return this.allContent.filter(content => this.content?.includes(content.meta.slug));
            }
        },
        methods: {},
        mounted() {},
        beforeUnmount() {},
    };
</script>

<template>
    <MaxWidth class="project-page" size="m">
        <div class="metas">
            <Link no-decoration class="back-link" to="/projects"
                ><span class="arrow">← &nbsp;</span>Projects</Link
            >
            <h1>{{ title }}</h1>
            <div class="tags">
                <Link
                    v-for="topic in topics"
                    :key="topic"
                    no-decoration
                    :to="`/projects?topic=${topic}`"
                >
                    <TagPill variant="topic" :tag="topic" />
                </Link>
            </div>
        </div>
        <div class="flex-wrapper">
            <!-- <MaxWidth size = "l"> -->
                <div class="top">
                <div class="description">
                    {{ description }}
                </div>
                <div class="img">
                    <img :src="thumbnail" alt="">
                </div>
                </div>
            <!-- </MaxWidth> -->
            <MaxWidth size="m" class="team">
                <h2>Project team members</h2>
                <MembersGrid variant="m" :exclude="nonProjectMembers" />
            </MaxWidth>
            <MaxWidth size="m" class="articles">
                <h2>Project content</h2>
                <ContentGrid :data="projectContent" />
            </MaxWidth>
        </div>

    </MaxWidth>
</template>

<style scoped lang="scss">
    .project-page {
        padding-top: 4em;
        padding-bottom: 3em;
        font-size: 1.125em;

        display: flex;
        flex-direction: column;
        .metas {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1em;

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

            .tags {
                display: flex;
                gap: 0.5em;
                flex-wrap: wrap;
            }
        }
        .flex-wrapper {
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
            .top {
                display: flex;
                flex-direction: row;
                gap: 6rem;
                .description {
                    display: flex;
                    width: 100%;
                    // height: auto;
                }
                .img {
                    // height: 10px;
                    width: max-content;
                }
            }   

        }

    }


</style>
