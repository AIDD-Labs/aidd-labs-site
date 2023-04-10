<script>
    import {mapState} from "vuex";
    export default {
        name: "Member",
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
                memberMetadata: state => state.memberMetadata,
                contents: state => state.contents,
                siteMetadata: state => state.siteMetadata,
            }),
            otherTeamMembers() {
                return this.memberMetadata.current.filter(member => member !== this.slug);
            },
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
            activeMarkdownComponent() {
                return this.$route.name;
            },
            canonicalUrl() {
                return `${this.siteMetadata.siteUrl}${this.$route.path}`;
            },
            ogImage() {
                return this.img ? `${this.siteMetadata.url}${this.img}` : "";
            },
            socials() {
                let socials = ["twitter", "linkedin"];
                let socialLinks = [];

                socials.forEach(link => {
                    if (this[link]) {
                        socialLinks.push(this[link]);
                    }
                });

                if (this.personalWebsite) {
                    socialLinks.push(this.personalWebsite);
                }
                return socialLinks;
            },
            otherJsonLd() {
                return {
                    "@type": "Person",
                    name: this.name,
                    jobTitle: this.title,
                    url: this.canonicalUrl,
                    sameAs: this.socials,
                };
            },
        },
        methods: {},
        mounted() {
            this.isLoaded = true;
        },
    };
</script>
<template>
    <div>
        <SEO
            :meta-title="`${name} | ${siteMetadata.title}`"
            :canonical-url="canonicalUrl"
            :other-json-ld="otherJsonLd"
            page-type="non-post"
            section="Members"
            :meta-og-image="ogImage"
        />
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
                    <!-- <Link :to="personalWebsite" doOpenInNewTab>More information</Link> -->
                </div>
            </MaxWidth>
            <MaxWidth size="s" class="articles" v-if="articlesByAuthor.length">
                <h2>Recent content by {{ name }}</h2>
                <ContentGrid :data="articlesByAuthor" />
            </MaxWidth>
            <MaxWidth size="s" class="team">
                <Link to="/team"> <h2>Other team members</h2></Link>
                <MembersGrid variant="m" :data="otherTeamMembers" />
            </MaxWidth>
            <!-- <MaxWidth size="s" class="content">
                <JoinTheLabBlock />
            </MaxWidth> -->
        </MaxWidth>
    </div>
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

            @media (max-width: 800px) {
                flex-direction: column;
            }

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
