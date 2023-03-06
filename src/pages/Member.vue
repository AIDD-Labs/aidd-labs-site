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
                let posts = this.contents.filter(article => {
                    if (this.name.includes("Sabine")) {
                        return article;
                    } else {
                        return article.meta.authors.split(",")[0] == this.name;
                    }
                });

                posts.sort((a, b) => {
                    return new Date(b.meta.date) - new Date(a.meta.date);
                });

                return posts.slice(0, 3);
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
                <Link no-decoration class="back-link" to="/team"
                    ><span class="arrow">← &nbsp;</span>Team</Link
                >
                <AuthorBlock no-link orientation="pageHeader" :author="slug" />
            </div>
            <div>
                <slot />
                <Link :to="personalWebsite" doOpenInNewTab>More information</Link>
            </div>
        </MaxWidth>
        <MaxWidth size="s" class="articles" v-if="articlesByAuthor.length">
            <h2>Recent posts by {{ name }}</h2>
            <ContentGrid :data="articlesByAuthor" />
        </MaxWidth>
        <MaxWidth size="s" class="team">
            <Link to="/team"> <h2>Other team members</h2></Link>
            <MembersGrid variant="m" :exclude="[slug]" />
        </MaxWidth>
        <!-- <MaxWidth size="s" class="content">
            <JoinTheLabBlock />
        </MaxWidth> -->
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

        .links {
            margin-top: 1em;
        }

        .bio {
            display: flex;
            gap: 6rem;

            .narrow-width {
                display: none;
            }
        }
        .articles {
            display: flex;
            flex-direction: column;
            gap: 1em;
        }
    }
</style>
