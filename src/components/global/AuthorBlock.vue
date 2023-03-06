<script>
    import {mapState} from "vuex";
    export default {
        name: "AuthorBlock",
        components: {},
        props: {
            author: {
                type: String,
                default: "sabine-loos",
            },
            orientation: {
                type: String,
                default: "portrait",
                validator(value) {
                    return ["portrait", "landscape", "pageHeader", "memberGrid"].includes(
                        value
                    );
                },
            },
            noLink: {
                type: Boolean,
                default: false,
            },
        },
        emits: [],
        data() {
            return {};
        },
        computed: {
            ...mapState({
                members: state => state.members,
            }),
            info() {
                return this.members[this.author];
            },
        },
        methods: {},
        mounted() {},
    };
</script>
<template>
    <component
        :is="noLink ? 'div' : 'Link'"
        class="author-block"
        :to="`/team/${info.meta.slug}`"
    >
        <div class="author-metas portrait" v-if="orientation == 'portrait'">
            <div class="bio-image-wrapper">
                <div class="bio-image-container">
                    <img class="bio-image" :src="info.meta.img" />
                </div>
            </div>
            <h4 class="name">{{ info.meta.name }}</h4>
            <div class="bio-content">
                <p>{{ info.meta.title }}</p>
            </div>
            <div class="wavy">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        </div>
        <div class="author-metas landscape" v-if="orientation == 'landscape'">
            <div class="bio-image-wrapper">
                <div class="bio-image-container">
                    <img class="bio-image" :src="info.meta.img" />
                </div>
            </div>
            <div class="info">
                <h4 class="name">{{ info.meta.name }}</h4>
                <div class="bio-content">
                    <p>{{ info.meta.title }}</p>
                </div>
            </div>
        </div>
        <div class="author-metas pageHeader" v-if="orientation == 'pageHeader'">
            <div class="bio-image-wrapper">
                <div class="bio-image-container">
                    <img class="bio-image" :src="info.meta.img" />
                </div>
            </div>
            <h4 class="name">{{ info.meta.name }}</h4>
            <div class="bio-content">
                <div>{{ info.meta.title }}</div>
                <div v-if="info.meta.affiliation">{{ info.meta.affiliation }}</div>
            </div>
            <div class="wavy">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        </div>
        <div class="member memberGrid" v-if="orientation == 'memberGrid'">
            <div class="image-container">
                <div class="block"></div>
                <img :src="info.meta.img" />
            </div>
            <div :to="`/team/${info.meta.slug}`" class="metas">
                <h3>{{ info.meta.name }}</h3>
                <div>{{ info.meta.title }}</div>
                <div>{{ info.meta.affiliation }}</div>
            </div>
        </div>
    </component>
</template>
<style lang="scss">
    .author-block {
        .author-metas {
            display: flex;
            flex-direction: column;
            position: relative;
            width: fit-content;

            &.landscape {
                flex-direction: row;
                gap: 1em;

                .bio-image-wrapper {
                    width: fit-content;
                }

                .bio-image-container {
                    margin: 0;
                    width: 2.75rem;
                    height: 2.75rem;
                }

                font-size: 0.8em;

                .info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.1em;
                    justify-content: center;

                    p {
                        margin: 0;
                    }
                }

                .name {
                    line-height: 1;
                }

                .bio-content {
                    display: flex;
                    align-items: center;
                    gap: 1em;
                }

                .actions {
                    height: 20px;

                    .Button {
                        svg {
                            max-width: 14px;
                            height: 14px;
                            fill: var(--text-base-color);
                        }

                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }

            &.pageHeader {
                .bio-image-container {
                    width: 16rem;
                    height: 16rem;
                    overflow: hidden;
                    border-radius: 3px;
                    margin-bottom: 0.6em;
                    display: flex;
                    align-items: center;
                }
            }

            .bio-image-wrapper {
                position: relative;
                width: 100%;
            }

            .bio-image-container {
                width: 6rem;
                height: 6rem;
                overflow: hidden;
                border-radius: 3px;
                margin-bottom: 0.6em;
                display: flex;
                align-items: center;
            }

            .name {
                margin: 0;
            }

            p {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                margin: 0;
                //line-height: 1.2;
                margin-bottom: 0.5rem;
                font-size: 14px;
                margin-top: 0.5rem;
                opacity: 0.5;
                font-weight: 400;
                margin-bottom: 1.5rem;
            }

            .metas {
                color: red;
            }

            .actions {
                display: flex;
                gap: 1em;
                padding: 0;

                .Button {
                    padding: 0;
                    background: none;
                    opacity: 0.75;

                    svg {
                        max-width: 16px;
                        fill: var(--text-base-color);
                    }

                    &:hover {
                        opacity: 1;
                    }
                }
            }
            .wavy {
                padding: 0.25em 0;
                color: var(--blue-200);
            }
        }
        .memberGrid {
            .image-container {
                position: relative;

                $bio-img-padding: 2em;

                .block {
                    border: 4px solid var(--blue-500);
                    position: absolute;
                    height: calc(100% - $bio-img-padding);
                    width: calc(100% - $bio-img-padding);
                    top: 0;
                    left: 0;
                }

                img {
                    padding-top: $bio-img-padding;
                    padding-left: $bio-img-padding;
                }
            }

            .metas {
                h3 {
                    margin: 0.25em 0;
                }

                text-align: center;
            }
        }
    }
</style>
