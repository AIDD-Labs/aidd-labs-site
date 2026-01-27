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
            allContent: state => state.contents,
            news: state => state.news || []  // ← Added fallback to empty array
        }),
        projectContent () {
            return this.allContent.filter(content => this.content?.includes(content.meta.slug));
        },
        newsByProject() {
            if (!this.news || !Array.isArray(this.news)) {
                return [];
            }
            
            if (!this.slug) {
                return [];
            }
            
            console.log('Current project slug:', this.slug);  // ← ADD THIS
            
            let newsPosts = this.news.filter(newsitem => {
                if (!newsitem || !newsitem.meta) return false;
                
                const projects = newsitem.meta.projects;
                
                if (!projects) return false;
                
                let projectList;
                if (Array.isArray(projects)) {
                    projectList = projects;
                } else if (typeof projects === 'string') {
                    projectList = projects.split(",").map(p => p.trim());
                } else {
                    return false;
                }
                
                // ← ADD THESE DEBUG LOGS
                const matches = projectList.includes(this.slug);
                if (projectList.length > 1) {
                    console.log('News item:', newsitem.meta.title);
                    console.log('  Projects:', projectList);
                    console.log('  Looking for:', this.slug);
                    console.log('  Matches:', matches);
                }
                
                return matches;
            });

            newsPosts.sort((a, b) => {
                const dateA = a.meta?.date ? new Date(a.meta.date) : new Date(0);
                const dateB = b.meta?.date ? new Date(b.meta.date) : new Date(0);
                return dateB - dateA;
            });

            return newsPosts.slice(0, 5);
        }
    },
    methods: {},
    mounted() {
        console.log('Project slug:', this.slug);
        console.log('News available:', this.news?.length || 0);
        console.log('Filtered news:', this.newsByProject);
    },
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
            <MaxWidth size="m" class="articles" v-if="partners?.length">
                <h2>Project partners/funders</h2>
                <PartnersGrid :partners="partners" />
            </MaxWidth>
            <MaxWidth size="m" class="articles" v-if="projectContent.length">
                <h2>Project content</h2>
                <ContentGrid :data="projectContent" />
            </MaxWidth>
            <MaxWidth size="m" class="articles" v-if="newsByProject.length">
                <h2>Recent news</h2>
                <NewsGrid :data="newsByProject" newsCount="3"/>
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
