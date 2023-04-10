<script>
    import utils from "@/scripts/utils.js";
    import {Head, useHead} from "@vueuse/head";
    import {mapState} from "vuex";
    export default {
        name: "SEO",
        components: {
            Head,
        },
        props: {
            metaUrl: {
                type: String,
                required: false,
            },
            canonicalUrl: {
                type: String,
                required: false,
            },
            metaTitle: {
                type: String,
                required: false,
            },
            metaDescription: {
                type: String,
                required: false,
            },
            metaKeywords: {
                type: Array,
                required: false,
            },
            metaUrl: {
                type: String,
                required: false,
            },
            metaOgImage: {
                type: String,
                required: false,
            },
            headline: {
                type: String,
                default: "University of Michigan | AIDD | Dr. Sabine Loos",
            },
            type: {
                type: String,
                default: "WebPage",
            },
            otherJsonLd: {
                type: Object,
                default: {},
            },
            pageType: {
                type: String,
                default: "index",
            },
            section: {
                type: String,
                default: "other",
            },
            pubDate: {
                type: String,
            },
            author: {
                type: String,
                default: "Dr. Sabine Loos",
            },
        },
        data() {
            return {
                graphJsonLd: {},
            };
        },
        computed: {
            ...mapState({
                siteMetadata: state => state.siteMetadata,
            }),
            title() {
                return this.metaTitle
                    ? this.metaTitle + " | AIDD Labs"
                    : this.siteMetadata.title;
            },
            ogImage() {
                return this.metaOgImage || this.siteMetadata.ogImage;
            },
            url() {
                return this.metaUrl ? this.metaUrl : this.siteMetadata.url;
            },
            canonical() {
                return this.canonicalUrl
                    ? this.canonicalUrl
                    : this.$route.path
                    ? `${this.siteMetadata.siteUrl}${this.$route.path}`
                    : this.siteMetadata.siteUrl;
            },
            pageAuthor() {
                return this.author || this.metaDescription.author;
            },
            publishDate() {
                return this.pubDate ? new Date(this.pubDate) : "";
            },
        },
        methods: {
            setJsonLd() {
                let json = {
                    "@type": `${this.type}`,
                    name: `${this.title}`,
                    headline: `${this.headline}`,
                    description: `${this.siteMetadata.description}`,
                    author: `${this.siteMetadata.author}`,

                    publisher: {
                        "@type": "Organization",
                        name: `${this.siteMetadata.title}`,
                        url: `${this.siteMetadata.siteUrl}`,
                    },
                    url: `${this.canonical}`,
                    image: {
                        "@type": "ImageObject",
                        url: `https://disasterdata.engin.umich.edu/metas/og-image-defaut.png`,
                        height: 630,
                        width: 1200,
                    },
                };

                this.graphJsonLd = {
                    "@context": "http://schema.org/",
                    "@graph": Object.keys(this.otherJsonLd).length
                        ? [this.otherJsonLd, json]
                        : [json],
                };
            },
        },
        watch: {
            otherJsonLd: {
                immediate: true,
                handler() {
                    this.setJsonLd();
                },
            },
        },
        mounted() {},
    };
</script>

<template>
    <Head>
        <title>{{ title }}</title>
        <meta name="description" :content="metaDescription || siteMetadata.description" />
        <meta name="keywords" :content="metaKeywords || siteMetadata.keywords" />

        <link rel="canonical" :href="canonical" />

        <!-- Facebook Meta Tags -->
        <meta property="og:url" :content="canonical" />
        <meta property="og:type" content="website" />
        <meta property="og:title" :content="title" />
        <meta
            property="og:description"
            :content="metaDescription || siteMetadata.description"
        />
        <meta property="og:image" :content="ogImage" />

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" :content="siteMetadata.siteUrl" />
        <meta property="twitter:url" :content="canonical" />
        <meta name="twitter:title" :content="title" />
        <meta
            name="twitter:description"
            :content="metaDescription || siteMetadata.description"
        />
        <meta name="twitter:image" :content="ogImage" />

        <!-- Parse.ly Tags -->
        <meta name="parsely-title" :content="title" />
        <meta name="parsely-link" :content="canonical" />
        <meta name="parsely-type" :content="pageType" />

        <meta v-if="pageType == 'post'" name="parsely-pub-date" :content="publishDate" />
        <meta v-if="pageType == 'post'" name="parsely-section" :content="section" />
        <meta v-if="pageType == 'post'" name="parsely-author" :content="author" />

        <meta name="parsely-tags" :content="metaKeywords || siteMetadata.keywords" />

        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://disasterdata.engin.umich.edu/metas/apple-touch-icon.png"
        />

        <component :is="'script'" type="application/ld+json">
            {{ graphJsonLd }}
        </component>
    </Head>
</template>

<style lang="scss">
    .SEO {
        .heading {
            text-decoration: none;
            font-size: 0.85em;
            line-height: 1.15;
            padding: 0.5em 0;
            opacity: 0.3;

            &.active {
                opacity: 1;
            }
        }
    }
</style>
