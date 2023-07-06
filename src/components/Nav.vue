<script>
    import {mapState} from "vuex";
    export default {
        name: "Nav",
        components: {},
        props: {},
        data() {
            return {
                theme: "light",
                navPages: ["projects","content", "team"],
            };
        },
        computed: {
            ...mapState({
                isMobileMenuOpen: state => state.isMobileMenuOpen,
            }),
            pageType() {
                return this.$route.fullPath.includes("/posts/")
                    ? "post"
                    : this.$route.fullPath == "/"
                    ? "index"
                    : "other";
            },
            navClass() {
                return {
                    nav: true,
                    "nav--home": this.$route.name === "Index",
                };
            },
        },
        methods: {
            setTheme() {
                this.theme = this.navClass["nav--home"] ? "light" : "dark";
            },
            toggleMobileMenu() {
                this.$store.dispatch("toggleMobileMenu");
            },
        },
        mounted() {
            this.setTheme();
        },
    };
</script>

<template>
    <MaxWidth size="m" :class="navClass">
        <div class="nav__left">
            <Link to="/" no-decoration>
                <Logo />
                <div class="meta" :style="{borderTop: '1px solid lightgrey'}">
                    Dr. Sabine Loos <span>/ University of Michigan</span>
                </div>
            </Link>
        </div>
        <div class="nav__right">
            <!--
            TODO: implement all routes: ['team','posts', 'projects', 'content', 'events']
            -->
            <Link v-for="item in navPages" :key="item" :to="`/${item}`">
                {{ item }}
            </Link>
            <!-- <Link class="cta" to="/team" is-button> Work with us! </Link> -->
        </div>
        <div class="mobile-actions">
            <button
                class="hamburger-container"
                @click="toggleMobileMenu"
                :class="{open: isMobileMenuOpen}"
            >
                <div class="nav-icon" :class="{open: isMobileMenuOpen}">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
        </div>
        <div class="mobile-menu" v-if="isMobileMenuOpen">
            <div class="mobile-content">
                <h2>menu</h2>
                <Link
                    v-for="item in navPages"
                    :key="item"
                    :to="`/${item}`"
                    is-button
                    :class="{active: $route.fullPath == '/contact'}"
                    class="nav-link"
                    hover-wave
                >
                    {{ item }}
                </Link>
            </div>
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    .nav {
        z-index: 200;
        position: relative;

        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        font-weight: 500;
        transition: all 100ms linear;
        background-color: none;
        height: $nav-height;

        &--home {
            color: white;
        }

        &__left {
            padding-top: 1rem;
            padding-bottom: 1rem;

            &:hover {
                text-decoration: none;
            }

            .meta {
                font-size: 0.925em;
                border-top: 1px solid rgba(255, 255, 255, 0.4);
                padding-top: 0.5em;
                margin-top: 0.05em;
                padding-right: 1em;

                span {
                    opacity: 0.75;
                }
            }
        }

        &__right {
            padding-top: 1.5rem;
            padding-bottom: 1rem;
            flex-wrap: wrap;
            display: flex;
            justify-content: flex-end;
            gap: 2.5em;
            padding-left: 1em;
            align-items: center;
            text-transform: capitalize;
            position: relative;

            a {
                text-decoration: none;
            }

            @media (max-width: 700px) {
                display: none;
            }
        }
        .logo-img {
            max-width: 15em;
            height: auto;
            pointer-events: none;
            transform: translateX(
                -21px
            ); // Faking left alignment of text A instead of the graphic
        }

        .mobile-actions {
            padding-top: 0;
            top: 0;
            right: 0;
            display: none;
            position: absolute;

            @media (max-width: 370px) {
                &:before {
                    content: "";
                    height: 1px;
                    background: black;
                    width: 150%;
                    bottom: 5px;
                    left: -100%;
                    position: absolute;
                    z-index: 10;
                }
            }

            @media (max-width: 700px) {
                display: block;
            }

            .hamburger-container {
                width: 4rem;
                height: 4rem;
                position: relative;
                background: var(--blue-900);
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 5px;
                z-index: 20;
                margin: 0;

                &.open {
                    background: var(--blue-200);
                }

                &:hover {
                    cursor: pointer;
                    background: var(--blue-200);

                    .nav-icon {
                        span {
                            background: var(--blue-600);
                        }
                    }
                }
            }
            .nav-icon {
                width: 28px;
                height: 28px;
                position: relative;
                transform: rotate(0deg);
                transition: 150ms ease-in-out;
                cursor: pointer;
            }

            .nav-icon span {
                display: block;
                position: absolute;
                height: 3px;
                width: 100%;
                background: var(--blue-200);
                border-radius: 9px;
                opacity: 1;
                left: 0;
                transform: rotate(0deg);
                transition: 150ms ease-in-out;
            }

            .nav-icon span:nth-child(1) {
                top: 0px;
                transform-origin: left center;
            }

            .nav-icon span:nth-child(2) {
                top: 9px;
                transform-origin: left center;
            }

            .nav-icon span:nth-child(3) {
                top: 18px;
                transform-origin: left center;
            }

            .nav-icon.open span:nth-child(1) {
                transform: rotate(45deg);
                top: 3px;
                left: 4px;
            }

            .nav-icon.open span:nth-child(2) {
                width: 0%;
                opacity: 0;
            }

            .nav-icon.open span:nth-child(3) {
                transform: rotate(-45deg);
                top: 20px;
                left: 4px;
            }

            .nav-icon {
                &.open {
                    span {
                        background: var(--blue-900);
                    }
                }
            }
        }

        .mobile-menu {
            background: var(--background-color);
            height: 100%;
            width: 100%;
            top: 4em;
            left: 0;
            position: fixed;
            z-index: 100;
            padding: 1em 1.5rem;

            @media (min-width: 700px) {
                display: none;
            }
        }

        .mobile-content {
            font-size: 1.5em;
            font-weight: 700;
            display: flex;
            flex-direction: column;
            gap: 1em;

            h2 {
                color: black;
            }

            .nav-link {
                padding: 0.7em;
                padding-right: 1em;
                padding-top: 1em;
                padding-bottom: 1em;
                background: var(--blue-200);
                display: flex;
                justify-content: space-between;
                width: 100%;
                text-decoration: none;
                letter-spacing: 0;

                .Button {
                    width: 100%;
                    background-color: var(--green-200);
                    text-transform: capitalize;
                }

                .arrow {
                    font-weight: 500;
                    font-size: 0.9em;
                    transform: translateX(-1em);
                    transition: 100ms ease-in-out all;

                    &.animate {
                        transform: translateX(3.5em);
                        transition: 400ms ease-in-out all;
                    }
                }

                &:hover {
                    background: var(--blue-200);
                }
            }
        }
    }
</style>
