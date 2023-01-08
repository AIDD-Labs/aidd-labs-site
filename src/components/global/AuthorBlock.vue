<script>
    import {mapState} from "vuex";
    export default {
        name: "AuthorBlock",
        components: {},
        props: {
            author: {
                type: String,
                default: "sabine-loos"
            },  
            orientation: {
                type: String,
                default: "portrait",
                validator(value) {
                    return ["portrait", "landscape"].includes(value);
                },
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
        },
        methods: {},
        mounted() {},
    };
</script>
<template>
    <div class="author-metas portrait" v-if="orientation == 'portrait'">
        <div class="bio-image-wrapper">
            <div class="bio-image-container">
                <img
                    class="bio-image"
                    src="@/assets/images/marg-oscar.jpg"
                    alt="Woman (Marguerite) taking a selfie in the mirror, phone in hand, wearing a RHCP shirt."
                />
            </div>
        </div>
        <h4 class="name">Marguerite Roth</h4>
        <div class="bio-content">
            <p>Senior Product Engineer <br />@Parse.ly</p>
            <!-- <div class="metas">Aug 25, 2012 * 10m read</div> -->
        </div>
        <div class="actions">
            <!-- <Link to="https://www.linkedin.com/in/margueriteroth/" is-button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"
                    /></svg
            ></Link> -->
<!-- 
            <Link is-button to="https://instagram.com/marguer.ite/">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    /></svg
            ></Link> -->
            <!-- <Link to="https://github.com/margueriteroth/" is-button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    /></svg
            ></Link> -->
        </div>
        <div class="wavy">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    </div>
    <div class="author-metas landscape" v-if="orientation == 'landscape'">
        <div class="bio-image-wrapper">
            <div class="bio-image-container">
                <img
                    class="bio-image"
                    src="@/assets/images/marg-oscar.jpg"
                    alt="Woman (Marguerite) taking a selfie in the mirror, phone in hand, wearing a RHCP shirt."
                />
            </div>
        </div>
        <div class="info">
            <h4 class="name">Marguerite Roth</h4>
            <div class="bio-content">
                <p>Senior Product Engineer @Parse.ly</p>
                <div class="actions">
                    <!-- <Link to="https://www.linkedin.com/in/margueriteroth/" is-button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"
                    /></svg
            ></Link> -->

                    <!-- <Link is-button to="https://instagram.com/marguer.ite/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                            /></svg
                    ></Link>
                    <Link to="https://github.com/margueriteroth/" is-button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                            /></svg
                    ></Link> -->
                </div>
            </div>
        </div>
        <!-- <div class="wavy">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div> -->
    </div>
</template>
<style lang="scss">
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
                width: 2.25rem;
                height: 2.25rem;
            }

            font-size: 0.8em;

            .info {
                display: flex;
                flex-direction: column;
                gap: 0.1em;
                align-items: center;
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
        }
    }
</style>
