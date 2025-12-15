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
                news: state => state.news,
                siteMetadata: state => state.siteMetadata,
            }),
            otherTeamMembers() {
                return this.memberMetadata.current.filter(member => member !== this.slug);
            },
           articlesByAuthor() {
                let posts = this.contents.filter(article => {
                    // Collect authors from BOTH 'authors' and 'members' fields
                    let allAuthors = [];
                    
                    // Add from 'authors' field
                    if (article.meta.authors) {
                        if (Array.isArray(article.meta.authors)) {
                            allAuthors = allAuthors.concat(article.meta.authors);
                        } else if (typeof article.meta.authors === 'string') {
                            allAuthors = allAuthors.concat(
                                article.meta.authors.split(",").map(a => a.trim())
                            );
                        }
                    }
                    
                    // Add from 'members' field
                    if (article.meta.members) {
                        if (Array.isArray(article.meta.members)) {
                            allAuthors = allAuthors.concat(article.meta.members);
                        } else if (typeof article.meta.members === 'string') {
                            allAuthors = allAuthors.concat(
                                article.meta.members.split(",").map(a => a.trim())
                            );
                        }
                    }
                    
                    // Skip if no authors found
                    if (allAuthors.length === 0) return false;
                    
                    // Check both slug AND name to handle both formats
                    return allAuthors.some(author => 
                        author === this.slug ||           // Matches slugs like "eli-knodel"
                        author === this.name ||           // Matches full names like "Elijah Knodel"
                        author.toLowerCase().replace(/\s+/g, '-') === this.slug  // Converts "Elijah Knodel" to "elijah-knodel"
                    );
                });

                posts.sort((a, b) => {
                    return new Date(b.meta.date) - new Date(a.meta.date);
                });

                return posts.slice(0, 3);
            },
            newsByAuthor() {
                let newsPosts = this.news.filter(newsitem => {
                    // Get members field
                    const members = newsitem.meta.members;
                    
                    // Skip if no members
                    if (!members) return false;
                    
                    // Handle both array and string formats
                    let memberList;
                    if (Array.isArray(members)) {
                        memberList = members;
                    } else if (typeof members === 'string') {
                        memberList = members.split(",").map(m => m.trim());
                    } else {
                        return false;
                    }
                    
                    // Check if this person is in the member list (any position)
                    return memberList.some(member => 
                        member === this.slug ||           // Matches slugs like "eli-knodel"
                        member === this.name ||           // Matches full names like "Elijah Knodel"
                        member.toLowerCase().replace(/\s+/g, '-') === this.slug  // Converts names to slugs
                    );
                });

                newsPosts.sort((a, b) => {
                    return new Date(b.meta.date) - new Date(a.meta.date);
                });

                return newsPosts.slice(0, 3);
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
            <MaxWidth size="s" class="articles" v-if="newsByAuthor.length">
                <h2>Recent news about {{ name }} </h2>
                <NewsGrid :data="newsByAuthor" newsCount="3"/>
            </MaxWidth>
            <!-- <MaxWidth size="s" class="team">
                <Link to="/team"> <h2>Other team members</h2></Link>
                <MembersGrid variant="m" :data="otherTeamMembers" />
            </MaxWidth> -->
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
