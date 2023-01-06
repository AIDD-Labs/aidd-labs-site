<script>
    import {mapState} from "vuex";
    import utils from "@/scripts/utils.js";
    export default {
        name: "FilterBar",
        components: {},
        props: {
            content: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                isLoaded: false,
                types: [
                    "all",
                    "journal article",
                    "report",
                    "presentation",
                    "visualization",
                    "blog",
                    "podcast",
                    "software",
                ],
                topics: ["all", "risk", "impact", "recovery"],

                // We are not supporting multiple filters per type
                activeFilters: {
                    type: "all",
                    topic: "all",
                },

                filterCounts: {}, // adding this until it gets too slow

                filteredContent: [],
            };
        },
        computed: {
            ...mapState({}),
        },
        methods: {
            initFilterCounts() {
                let filterCounts = {};
                let categories = Object.keys(this.activeFilters);

                // set up starting empty counts of 0
                categories.forEach(cat => {
                    let category = `${cat}s`;
                    filterCounts[category] = {};
                    let items = [...this[category]];
                    filterCounts[category] = Object.fromEntries(
                        items.map(item => [item, 0])
                    );
                });

                // Loop through content, update counts
                this.content.forEach(row => {
                    let type = row.meta.type;
                    filterCounts.types[type] += 1;

                    this.topics.forEach(filterTopic => {
                        if (row.meta.tags.includes(filterTopic)) {
                            filterCounts.topics[filterTopic] += 1;
                        }
                    });
                });

                this.filterCounts = filterCounts;
            },
            initActiveFilters() {
                let query = {...this.$route.query};
                let filters = {...this.activeFilters};

                Object.keys(query).forEach(key => {
                    filters[key] = query[key];
                });

                this.activeFilters = filters;
            },
            changeQueryParams(event) {
                let newQuery = {...this.activeFilters};

                Object.keys(this.activeFilters).forEach(filter => {
                    if (this.activeFilters[filter] == "all") {
                        delete newQuery[filter];
                    } else {
                        newQuery[filter] = utils.slugify(newQuery[filter]);
                    }
                });

                this.$router.push({query: newQuery});
            },
        },
        mounted() {
            this.initActiveFilters();
            this.initFilterCounts();
        },
    };
</script>
<template>
    <div class="filter-bar">
        <div class="filter-bar__filters">
            <div class="filter-bar__filters">
                <h2 class="">Type</h2>
                <Loading  v-if="!filterCounts.types"/>
                <div class="radio-group" v-if="filterCounts.types">
                    <label v-for="filter in types" :key="filter" class="radio">
                        <input
                            type="radio"
                            :value="filter"
                            v-model="activeFilters.type"
                            @change="changeQueryParams({type: filter})"
                        />
                        {{ getLabel(filter) }}
                        <div v-if="filter != 'all'"
                            >({{ filterCounts.types[filter] }})</div
                        >
                    </label>
                </div>
            </div>
            <div class="filter-bar__filters">
                <h2 class="">Topic</h2>
                <div class="radio-group" v-if="filterCounts.topics">
                    <label v-for="filter in topics" :key="filter" class="radio">
                        <input
                            type="radio"
                            :value="filter"
                            v-model="activeFilters.topic"
                            @change="changeQueryParams({topic: filter})"
                        />
                        {{ getLabel(filter) }}
                        <div v-if="filter != 'all'"
                            >({{ filterCounts.topics[filter] }})</div
                        >
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .filter-bar {
        border: 1px solid var(--base-4);
        padding: 1em;

        > div:not(:last-child) {
            margin-bottom: 1rem;
        }

        &__filters {
            display: flex;
            flex-direction: column;
            gap: 0.25em;
            align-self: flex-start;
            margin-bottom: 2em;
        }

        .radio-group {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-content: flex-start;
            gap: 0.6em;
            white-space: nowrap;

            .radio {
                display: inline-flex;
                gap: 0.5em;
                width: fit-content;
                padding-right: 0.5em;

                &:hover {
                    cursor: pointer;
                }

                input[type="radio"] {
                    appearance: none; // removes native appearance
                    background-color: #fff;
                    font: inherit;
                    color: currentColor;
                    width: 18px;
                    height: 18px;
                    border-radius: 18px;
                    border: 0.15em solid black;
                    transform: translateY(0.1em);
                    display: inline-flex;
                    position: relative;

                    margin: 0;

                    &:hover {
                        cursor: pointer;
                    }
                }

                input[type="radio"]::before {
                    content: "";
                    width: 9px;
                    height: 9px;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    border-radius: 2em;
                    // position: relative;
                    transform: scale(0);
                    box-shadow: inset 0em 1em var(--purple-blue-300);
                    transition: 120ms transform ease-in-out;
                }

                input[type="radio"]:checked::before {
                    transform: scale(1);
                }

                span {
                    line-height: 1;
                    white-space: nowrap;
                }
            }
        }
    }
</style>