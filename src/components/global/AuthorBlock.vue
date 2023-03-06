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
        no-decoration
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
                <div>
                    <div v-if="info.meta.affiliation">{{ info.meta.affiliation }}</div>
                    <div class="socials">
                        <Link
                            :to="info.meta.linkedin"
                            v-if="info.meta.linkedin"
                            do-open-in-new-tab
                        >
                            <svg viewBox="0 0 448 512" width="24" height="24">
                                <path
                                    d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                                />
                            </svg>
                        </Link>

                        <Link
                            :to="info.meta.github"
                            v-if="info.meta.github"
                            do-open-in-new-tab
                        >
                            <svg width="23" height="23" viewBox="0 0 24 24">
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                /></svg
                        ></Link>
                        <Link
                            :to="info.meta.twitter"
                            v-if="info.meta.twitter"
                            do-open-in-new-tab
                        >
                            <svg viewBox="0 0 448 512" width="24" height="24">
                                <path
                                    d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"
                                /></svg
                        ></Link>
                        <Link
                            class="site-link"
                            v-if="info.meta.personalWebsite"
                            :to="info.meta.personalWebsite"
                            do-open-in-new-tab
                        >
                            {{
                                info.meta.personalWebsite
                                    .replace("https://", "")
                                    .replace("/", "")
                                    .replace("www.", "")
                            }}
                        </Link>
                    </div>
                </div>
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

            .socials {
                display: flex;
                gap: 0.75em;
                align-items: center;
                flex-wrap: wrap;
                padding: 0.75em 0;

                svg {
                    &:hover {
                        fill: var(--blue-500);
                    }
                }

                .site-link {
                    font-size: 0.8em;
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
