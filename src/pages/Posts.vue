<script>
    import {mapState} from "vuex";

    export default {
        name: "Posts",
        components: {},
        data() {
            return {
                isLoaded: false,
                filterKeys: ["all", "dashboard", "tech", "tutorial", "dataviz"],

                activeFilters: {},

                postListing: [],
                sortValue: "Newest",
            };
        },
        computed: {
            ...mapState({
                posts: state => state.posts,
                postsById: state => state.postsById,
            }),
            defaultFilterOptions() {
                let filters = {};
                this.filterKeys.forEach(filter =>
                    filter == "all" ? (filters["all"] = true) : (filters[filter] = false)
                );
                return filters;
            },
        },

        methods: {
            initPosts() {
                this.activeFilters = {...this.defaultFilterOptions};
                this.postListing = this.posts;
                this.sortPosts(this.sortValue.toLowerCase());
                this.isLoaded = true;
            },
            sortPosts(value) {
                let sorted = [...this.postListing];
                this.sortValue = value[0].toUpperCase() + value.slice(1);

                if (value == "newest") {
                    let recentDate = arr => new Date(arr[arr.length - 1]);
                    sorted = sorted.sort((a, b) => {
                        return recentDate(b.meta.date) - recentDate(a.meta.date);
                    });
                } else {
                    let recentDate = arr => new Date(arr[arr.length - 1]);
                    sorted = sorted.sort((a, b) => {
                        return recentDate(a.meta.date) - recentDate(b.meta.date);
                    });
                }

                this.postListing = sorted;
            },
            updateFilters(filters) {
                console.table(filters)
            },
        },
        watch: {
            // filters: {
            //     immediate: true,
            //     deep: true,
            //     handler() {
            //         console.log('beep')
            //     }
            // }
        },
        mounted() {
            this.initPosts();
            console.log(this.posts)
            if (!Object.keys(this.$route.query).length) {
                this.activeFilters.all = true;
                console.log(this.activeFilters)
            }
        },
    };
</script>

<template>
    <MaxWidth class="PostsPage" v-if="isLoaded" size="s">
        <p class="blurb">
            <Tooltip neon>
                <template #toggle>Dev is hard.</template>
                <template #contents>I hope any of this helps! 🙇‍♀️</template>
            </Tooltip>
        </p>

        <div class="content">
            <div class="filter-column">
                <!-- <InputCheckbox
                    v-if="activeFilters"
                    :options="Object.keys(activeFilters)"
                    :active-filters="activeFilters"
                    type="checkbox"
                    @selected="updateFilters"
                /> -->
            </div>
            <div class="posts-listing">
                <div class="sort-actions">
                    <Dropdown
                        :value="sortValue"
                        :items="['newest', 'oldest']"
                        @selected="sortPosts"
                        class="sort-dropdown"
                        no-border
                    />
                </div>
                <div
                    class="listing-item"
                    :post="post"
                    v-for="post in postListing"
                    :key="post"
                >
                    <PostCard :post="post" :href="post.path" tag-count="3" />
                </div>
            </div>
            <div class="filter-column"></div>
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    .PostsPage {
        padding-bottom: 3em;
        flex: 1;
        max-width: 1200px;

        .content {
            display: flex;
            gap: 1em;
        }

        .filter-column {
            width: 20em;
            padding-top: 2.5em;
        }

        .posts-listing {
            gap: 1em;
            display: flex;
            flex-direction: column;
            width: 100%;

            .listing-item {
                border-top: 1px solid var(--border-500);
                margin-top: 0em;
                padding-top: 1em;
            }
        }

        h1 {
            text-align: center;
        }

        p.blurb {
            text-align: center;
        }

        .sort-dropdown {
            margin-left: auto;

            .menu {
                //width: 6em;
            }
        }

        .listing {
            margin-top: 2em;
            margin-bottom: 3em;
            display: grid;
            //grid-template-columns: 1fr 1fr 1fr;
            //gap: 1em;
            width: 100%;
            gap: 1em;
            display: flex;
            flex-direction: column;
        }
    }
</style>