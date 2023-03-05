<script>
    import {mapState} from "vuex";
    export default {
        name: "Member",
        components: {
            props: {
                frontmatter: {
                    type: Object,
                    required: true,
                },
            },
        },
        emits: [],
        data() {
            return {
                ...this.$attrs.frontmatter,
                isLoaded: false,
            };
        },
        computed: {
            ...mapState({
                members: state => state.members,
                contents: state => state.contents,
            }),
            articlesByAuthor() {
                return this.contents.filter(article => {
                    if (this.name.includes("Sabine")) {
                        // Give Sabine all the "authorless" posts bc sabine
                        return (
                            !article.meta.authors ||
                            article.meta.authors.split(",")[0].includes(this.name)
                        );
                    } else {
                        return article.meta.authors.split(",")[0] == this.name;
                    }
                });
            },
        },
        methods: {},
        mounted() {
            this.isLoaded = true;
        },
    };
</script>
<template>
    <MaxWidth size="xl" class="member-page" v-if="isLoaded">
        <MaxWidth size="s" class="bio">
            <div>
                <Link class="back-link" to="/team"
                    ><span class="arrow">← &nbsp;</span>Team</Link
                >
                <AuthorBlock no-link orientation="pageHeader" :author="slug" />
                <AuthorBlock
                    class="narrow-width"
                    no-link
                    orientation="landscape"
                    :author="slug"
                />
            </div>
            <div>
                <slot />
            </div>
        </MaxWidth>
        <MaxWidth size="s" class="articles" v-if="articlesByAuthor.length">
            <h2>Lab posts by {{ name }}</h2>
            <div class="articles">
                <ContentCard
                    v-for="article in articlesByAuthor"
                    :key="article"
                    :article="article"
                />
            </div>
        </MaxWidth>
        <MaxWidth size="s" class="team">
            <Link to="/team"> <h2>Other team members</h2></Link>
            <MembersGrid variant="m" :exclude="[slug]" />
        </MaxWidth>
        <MaxWidth size="s" class="content">
            <JoinTheLabBlock />
        </MaxWidth>
    </MaxWidth>
</template>
<style lang="scss">
    .member-page {
        padding-top: 4em;
        padding-bottom: 3em;
        font-size: 1.125em;

        display: flex;
        flex-direction: column;
        gap: 5em;

        .back-link {
            margin-bottom: 1.5em;
            font-size: 0.8em;
            color: var(--blue-700);
        }

        .bio {
            display: flex;
            gap: 6rem;

            .narrow-width {
                display: none;
            }

            @media (max-width: 900px) {
                flex-direction: column;
                gap: 2em;

                .author-block {
                    display: none;
                }
                .narrow-width {
                    display: block;
                    .bio-image-container {
                        max-width: 200px;
                        width: 100%;
                        max-height: 300px;
                        height: 100%;
                    }

                    .info {
                        font-size: 1.2em;
                    }
                }
            }
        }
        .articles {
            display: grid;
            grid-template-columns: repeat(4, minmax(100px, 1fr));
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
    }
</style>
