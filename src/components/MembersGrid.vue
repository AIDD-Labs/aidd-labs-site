<script>
    import {mapState} from "vuex";
    import MaxWidth from "../components/global/MaxWidth.vue";
    import LightBox from "@/components/global/Lightbox.vue";

    export default {
        name: "MembersGrid",
        props: {
            data: {
                type: Array,
                required: true
            },
            variant: {
                default: "l",
                validator(value) {
                    return ["m", "l"].includes(value);
                },
            },
        },
        data() {
            return {
                isLoaded: false,
                lightbox: {
                    images: {
                        thumbnails: ["team-usgs.png"],
                        large: ["team-usgs.png"],
                    },
                    captions: [
                        "AIDD labs getting ice cream after work. Pictured clockwise: Sabine Loos, Marísa Macías, David Wald, Alex Brunson, Eli Knodel, Maddie Karr.",
                    ],
                    thumbnailsPath: "/img/",
                    largePath: "/img/",
                },
            };
        },
        computed: {
            ...mapState({
                members: state => state.members,
            })
        },
        methods: {},
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <div class="members-grid" v-if="isLoaded" :class="`size-${variant}`">
        <div v-for="member in data" :key="member" class="member">
            <AuthorBlock :author="members[member].meta.slug" orientation="memberGrid" />
        </div>
    </div>
</template>

<style lang="scss">
    .members-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        row-gap: 30px;
        justify-items: start;
        width: 100%;
        align-items: start;
        column-gap: 30px;

        @media (max-width: 800px) {
            grid-template-columns: 1fr 1fr;
        }

        &.size {
            &-m {
                display: flex;
                gap: 3em;
                flex-wrap: wrap;
                font-size: 0.75em;

                .member {
                    max-width: 140px;
                }

                h3 {
                    margin-bottom: 0.25em;
                }
            }
        }
    }
</style>
