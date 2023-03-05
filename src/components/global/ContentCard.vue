<script>
    import {mapState} from "vuex";
    export default {
        name: "ContentCard",
        components: {},
        props: {
            article: {
                type: Object,
                required: true,
            },
        },
        emits: [],
        data() {
            return {};
        },
        computed: {
            ...mapState({
                user: state => state.user,
                ctx: state => state.ctx,
                features: state => state.features,
            }),
            imageSrc() {
                if (this.article?.meta?.thumbnail[0] != "/") {
                    // Image paths need to start with `/` to specify root folder beginning
                    return `/${this.article.meta.thumbnail}`;
                } else {
                    this.article?.meta?.thumbnail[0];
                }
            },
        },
        methods: {},
        mounted() {},
    };
</script>
<template>
    <div class="content">
        <Link no-decoration :to="`/content/${article.meta.slug}`" class="content-card">
            <div class="hoverwrap">
                <div class="img-container">
                    <img :src="imageSrc || '/img/home-hero-1.png'" />
                </div>
                <!-- <div class="hovercap">{{ content.meta.title }}</div> -->
                <div class="hovercap">Read More <span class="arrow">→</span></div>
            </div>
            <div class="metas">
                {{ article.meta.title }}
            </div>
        </Link>
    </div>
</template>
<style lang="scss">
    .content-card {
        .content {
            flex: 1;
        }

        /* (A) WRAPPER */
        .hoverwrap {
            position: relative;
        }

        /* (B) RESPONSIVE IMAGE */
        .hoverwrap img {
            //display: block;
            //width: 100%;
        }

        /* (C) CAPTION */
        .hovercap {
            /* (C1) DIMENSIONS */
            box-sizing: border-box;
            width: 100%;
            height: 100%;

            /* (C2) POSITION */
            position: absolute;
            top: 0;
            left: 0;
            text-align: left;
            padding: 0.75em 1.25em;

            /* (C3) COLORS */
            background-color: rgba(30, 38, 72, 0.9);
            color: white;
        }

        /* (D) SHOW/HIDE */
        .hovercap {
            visibility: none;
            opacity: 0;
            transition: opacity 0.5s;
        }
        .hoverwrap:hover .hovercap {
            visibility: visible;
            opacity: 1;
        }

        .img-container {
            height: 230px;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: flex-start;
            background-color: rgba(30, 38, 72, 0.9);
            justify-content: center;

            img {
                height: 100%;
                width: auto;
            }
        }

        .content {
            text-decoration: none;

            &.card {
                flex: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
                border-radius: 6px;
                overflow: hidden;
                border: 1px solid rgba(black, 0.1);

                &:hover {
                    box-shadow: 0 5px 1em 0 rgba(black, 0.5);
                    border: 1px solid rgba(30, 38, 72, 0.9);
                }

                .hoverwrap {
                }
            }

            .metas {
                padding: 0.75em 1.25em;
                flex: 1;
                background: rgba(30, 38, 72);
                color: white;
            }
        }
    }
</style>
