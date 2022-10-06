<script>
    import { Head, useHead } from "@vueuse/head";
    import {mapState} from "vuex";
    export default {
        components: {
            Head,
        },
        props: {},
        data() {
            return {
                loading: false,
            };
        },
        computed: {
            ...mapState({
                themeColor: state => state.themeColor,
                mode: state => state.mode
            }),
        },
        methods: {},
        setup() {
            useHead({
                htmlAttrs: { lang: "en", amp: true },
                title: "AIDD labs",
                meta: [
                    {
                        name: `Actionable Information for Disasters and Development`,
                        content: "Actionable Information for Disasters and Development",
                    },
                ],
            });
        },

        mounted() {},
    };
</script>

<template>
    <!-- <Head>
        <title>
            {{
                $route.meta.title
                    ? `${$route.meta.title} | marguerite.io`
                    : "marguerite.io"
            }}
        </title>
    </Head> -->
    <div class="app" :theme="themeColor">
        <div id="tooltip-teleport"></div>
        <Layout>
            <router-view :key="$route.path" />
        </Layout>
    </div>
</template>

<style lang="scss">
    @import "src/styles/colorThemes.scss";

    .app, #app {
        width: 100%;
        height: 100%;
        background-color: var(--background-color);

        &.navless {
            .sidebar {
                display: none;
            }

            .app-content {
                margin-left: 0;
            }

            .internal-only {
                display: none;
            }
        }

        #tooltip-teleport {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            pointer-events: none;
        }

        .sidebar-header {
            padding-left: 1.25em;

            .WyndlyTitle {
                max-width: 9em;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        .hidenav-button {
            margin-top: auto;
        }

        .sidebar-option {
            text-transform: capitalize;
        }

        .app-content {
            margin-left: 14em;
        }

        &[theme="dark"] {
            color: var(--text-base-color);
        }
    }
</style>
