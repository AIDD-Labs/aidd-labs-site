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
                methods: ["all", "risk", "impact", "recovery"], // ONE DAY

                // We are not supporting multiple filters per type
                activeFilters: {
                    type: "all",
                    topic: "all",
                    method: "all",
                },

                filteredContent: [],
            };
        },
        computed: {
            ...mapState({}),
        },
        methods: {
            initActiveFilters() {
                let query = {...this.$route.query};
                let filters = {...this.activeFilters};

                Object.keys(query).forEach(key => {
                    filters[key] = query[key];
                });

                this.activeFilters = filters;
            },
            changeQueryParams() {
                let newQuery = {...this.activeFilters};

                Object.keys(this.activeFilters).forEach(filter => {
                    if (this.activeFilters[filter] == 'all') {
                        delete newQuery[filter]
                    } else {
                        newQuery[filter] = utils.slugify(newQuery[filter]);
                    }
                }) 

                this.$router.push({query: newQuery});
            },
        },
        mounted() {
            this.initActiveFilters();
        },
    };
</script>
<template>
    <div class="filter-bar">
        <div class="contentpage__filters">
            <div class="contentpage__filters__Type">
                <h2 class="">Type</h2>

                <div class="radio-group">
                    <label v-for="type in types" :key="type" class="radio">
                        <input
                            type="radio"
                            :value="type"
                            v-model="activeFilters.type"
                            :name="type"
                            @change="changeQueryParams"
                        />
                        {{ getLabel(type) }}
                    </label>
                </div>
            </div>
            <div class="contentpage__filters__Topic">
                <h2 class="">Topic</h2>
                <RadioGroup
                    name="topic"
                    :options="topics"
                    v-model="activeFilters.topic"
                    @radioGroupChange="changeFilters()"
                />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .filter-bar {
        border: 1px solid var(--base-4);
        padding: 1em;

        .radio-group {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-content: flex-start;
            gap: 0.75em;
            white-space: nowrap;

            .radio {
                display: flex;
                gap: 0.5em;

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
                    height:9px;
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
