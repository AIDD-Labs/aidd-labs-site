<script>
    import {mapState, mapActions} from "vuex";
    import MaxWidth from "../components/global/MaxWidth.vue";

    export default {
        name: "Content",
        components: { MaxWidth },
        data() {
            return {
                isLoaded: false,
                tags: [ 'all', 'risk', 'impact', 'recovery'],
                // methods: [ 'all', 'risk', 'impact', 'recovery'], // ONE DAY
                types: [ 'all', 'journal-article', 'report', 'presentation', 'visualization','blog','podcast' ],
                tagFilter: 'all',
                typeFilter: 'all',
            };
        },
        computed: {
            ...mapState({
                contents: state => state.contents,
            }),
            ...mapActions({
                test: 'filterByTag'
            }),
            filteredContent() {              
                return this.contents.filter(content => {
                    const meta = content.meta || {};

                    const tagFilterCheck = this.tagFilter === 'all' ? true : meta.tags.includes(this.tagFilter);
                    const typeFilterCheck = this.typeFilter === 'all' ? true : meta.type === this.typeFilter;
                
                    return tagFilterCheck && typeFilterCheck
                });
            }
        },

        methods: {
            setTagFilter(tag) {
                this.tagFilter = tag;
            },
            setTypeFilter(type) {
                this.typeFilter = type
            }
        },
        mounted() {
            this.isLoaded = true;
            this.filteredContent = this.contents;
        },
    };
</script>

<template>
    <MaxWidth class="contentpage container" size = "xl">
        <div class="contentpage__about">
            <h1>Content</h1>
            We communicate our research for multiple audiences, making sure what we do reaches the people who need it. 
            Below, find our journal articles, blog posts, visualizations, reports, presentations, and podcasts on our work.
        </div>
            <div class="contentpage__filters">
                <div class="contentpage__filters__Topic">
                    <h2>TOPIC</h2>
                    <RadioGroup
                    name="tags"
                    :options=this.tags
                    v-model="this.tagFilter"
                    @radioGroupChange="this.setTagFilter"/>
                </div>
                <div>
                    <h2>TYPE</h2>
                    <RadioGroup 
                    name="type"
                    :options=this.types
                    v-model="this.typeFilter"
                    @radioGroupChange="this.setTypeFilter"/>
                </div>
            </div>
            <div class="contentpage__contents">
                <div
                    v-for="content in filteredContent"
                    :key="content.slug"
                    class="content">
                        <a :href="content.meta.url" target="_blank" class="member">
                            <div class="hoverwrap">
                                <img :src="content.meta.thumbnail"/>
                                <div class="hovercap">{{content.meta.title}}</div>
                            </div>
                        </a>
                </div>
            </div>
    </MaxWidth>
</template>

<style lang="scss" >
    @import "./../styles/globals"; 
    .contentpage {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 12.5% 2rem;

        > div:not(:last-child) {
            margin-bottom: 1rem;
        }

        &__filters {
            display: flex;
            &__Topic {
                width: 33%;
            }
        }
        &__contents {
            margin-top: 20px;
            display: grid;
            grid-template-columns: repeat(auto-fill, 255px);
            grid-gap: 1%;
            justify-items: flex-end;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    /* (A) WRAPPER */
    .hoverwrap {
        position: relative; /* required for (c2) */
        aspect-ratio: 1/1;
        max-width: 275px;   /* optional */
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1); // 0 6px 20px 0 rgba(0, 0, 0, 0.19)
    }

    /* (B) RESPONSIVE IMAGE */
    .hoverwrap img { width: 100%; }

    /* (C) CAPTION */
    .hovercap {
        /* (C1) DIMENSIONS */
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        
        /* (C2) POSITION */
        position: absolute;
        top: 0; left: 0;
        text-align: left;
        padding-top: 5%;
        padding-left: 5%;
        padding-right: 5%;
        
        /* (C3) COLORS */
        background-color: rgba(30, 38, 72, 0.9);
        color: white;
    }

    /* (D) SHOW/HIDE */
    .hovercap {
        visibility: none; opacity: 0;
        transition: opacity 0.5s;
    }
        .hoverwrap:hover .hovercap {
        visibility: visible; opacity: 1;
    }
</style>