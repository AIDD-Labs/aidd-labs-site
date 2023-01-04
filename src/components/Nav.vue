<script>
    export default {
        name: "Nav",
        components: {},
        props: {},
        data() {
            return {};
        },
        computed: {
            pageType() {
                return this.$route.fullPath.includes("/posts/") ? "post" : "other";
            },
            navClass() {
                return {
                    nav: true,
                    "nav--home": this.$route.name === "Index",
                };
            },
        },
    };
</script>

<template>
    <MaxWidth size="m" :class="navClass">
        <div class="nav__left">
            <Link to="/" no-decoration>
                <Logo />
                <div class="meta">
                    Dr. Sabine Loos <span>/ University of Michigan</span>
                </div>
            </Link>
        </div>
        <div class="nav__right">
            <!--
            TODO: implement all routes: ['team','posts', 'projects', 'content', 'events']
            -->
            <Link v-for="item in ['content', 'team']" :key="item" :to="`/${item}`">
                {{ item }}
            </Link>
            <Link to="/contact" is-button>
                Work with us!
            </Link>
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

            .meta {
                font-size: .925em;
                border-top: 1px solid rgba(255, 255, 255, 0.4);
                padding-top: 0.75em;
                margin-top: 0.35em;
                padding-right: 1em;

                span {
                    opacity: 0.75;
                    margin-left: 0.5em;
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

            a {
                text-decoration: none;
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
    }

    [theme="dark"] {
        .nav {
            .sabine-logo {
                .black-name {
                    opacity: 0;
                }
            }
        }
    }
</style>
