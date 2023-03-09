<script>
    import {mapState} from "vuex";
    import utils from "@/scripts/utils.js";
    export default {
        name: "FilterBar",
        components: {},
        props: {
            entities: {
                type: Array,
                required: true,
            },
            filters: {
                type: Array,
                required: true
            },
            pageDescription: {
                type: String,
                default: "",
            },
        },
        data() {
            return {
                isLoaded: false,
                activeFilters: {},
                filterCounts: {}, // adding this until it gets too slow
            };
        },
        computed: {
            ...mapState({})
        },
        methods: {
            initFilterCounts() {
                let filterCounts = {};
    
                // Set up starting empty counts of 0
                this.filters.forEach(filter => {
                    const { options, key } = filter;
                    
                    filterCounts[key] = {};
                    filterCounts[key] = Object.fromEntries(
                        options.map(option => [utils.slugify(option), 0])
                    );
                });

                // Loop through entities and update counts
                this.entities.forEach(entity => {
                    this.filters.forEach(filter => {
                        const { key } = filter;
                        const value = entity.meta[key];

                        if (Array.isArray(value)) {
                            value.forEach(item => {
                                entity.meta[key].includes(item) && (filterCounts[key][item] += 1);
                            });
                        } else {
                            filterCounts[key][value] +=1;
                        }
                    })
                });

                this.filterCounts = filterCounts;
            },
            initActiveFilters() {
                let query = {...this.$route.query};
                let filters = Object.fromEntries(this.filters.map(filter => [ filter.queryParam, 'all' ]));

                Object.keys(query).forEach(key => {
                    filters[key] = query[key];
                });

                this.activeFilters = filters;
            },
            changeQueryParams(event) {
                let newQuery = {...this.activeFilters};
                window.scrollTo({top: 0})

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
        <p>{{ pageDescription }}</p>
        <div class="filter-bar__filters">
            <div class="filter-bar__filters" v-for="filter in filters">
                <h2 class="">{{filter.label}}</h2>
                <Loading v-if="!filterCounts[filter.key]" />
                <div class="radio-group" v-if="filterCounts[filter.key]">
                    <!-- ALL radio option -->
                    <label class="radio">
                        <input
                            type="radio"
                            value="all"
                            v-model="activeFilters[filter.queryParam]"
                            @change="changeQueryParams({[filter.queryParam]: 'all'})"
                        />
                        All
                    </label>
                    <!-- The rest of the filter options -->
                    <label v-for="option in filter.options" :key="option" class="radio">
                        <input
                            type="radio"
                            :value="option"
                            v-model="activeFilters[filter.queryParam]"
                            @change="changeQueryParams({[filter.queryParam]: option})"
                        />
                        {{ getLabel(option) }}
                        <div v-if="option != 'all'">
                            ({{ filterCounts[filter.key][slugify(option)] }})
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .filter-bar {
        p {
            margin-top: 0;
            font-size: 0.95em;
        }

        > div:not(:last-child) {
            margin-bottom: 1rem;
        }

        &__filters {
            display: flex;
            flex-direction: column;
            gap: 0.25em;
            align-self: flex-start;
            margin-bottom: 2em;

            @media(max-width: 800px) {
            }
        }

        .radio-group {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-content: flex-start;
            gap: 0.6em;
            white-space: nowrap;

            @media(max-width: 800px) {
                flex-direction: row;
            }

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
                    box-shadow: inset 0em 1em var(--blue-400);
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
