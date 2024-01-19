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
                allContent: state => state.contents
            }),
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
            <div class="info">
                <div> <b>{{ date }}</b> </div>
                <div class="tags">
                    <Link
                        v-for="topic in topics"
                        :key="topic"
                        no-decoration
                        :to="`/projects?topic=${topic}`"
                    >
                        <TagPill variant="topic" :tag="topic" />
                    </Link>
                    <Link
                        v-for="method in methods"
                        :key="method"
                        no-decoration
                        :to="`/projects?method=${method}`"
                    >
                        <TagPill variant="method" :tag="method" />
                    </Link>
                </div>
            </div>
            
        </div>
        <div class="flex-wrapper">
                    <div class="top">
                        <figure>
                            <img :src="thumbnail" alt="">
                            <figcaption>
                                <p><em> {{ thumbnailCaption }}</em></p>
                            </figcaption>
                        </figure>
                        <p>
                            <slot />
                        </p>
                    </div>
            <MaxWidth size="m" class="team">
                <h2>Core team members</h2>
                <MembersGrid variant="m" :data="members" />
            </MaxWidth>
            <MaxWidth size="m" class="articles" v-if="projectContent.length">
                <h2>Project content</h2>
                <ContentGrid :data="projectContent" />
            </MaxWidth>
            <MaxWidth size="m" class="articles" v-if="partners?.length">
                <h2>Project partners/funders</h2>
                <PartnersGrid :partners="partners" />
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

            .info {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                gap: 1em;
            }
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
            gap: 2em;
            position: relative;
            padding-top: 2em;
            @media (max-width: 1100px) {
                gap: 4em;
            }

            @media (max-width: 1000px) {
                gap: 2em;
            }

            .top figure {
                float:right;
                max-width: 50%;
                margin: 18px 0px 4px 40px;
            }
            .top p {
                margin-top:0;
                text-align: justify;
            }

        }

    }


</style>
