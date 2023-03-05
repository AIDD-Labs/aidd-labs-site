<script>
    import {mapState} from "vuex";
    import MaxWidth from "../components/global/MaxWidth.vue";
    import LightBox from "@/components/global/Lightbox.vue";

    export default {
        name: "MembersGrid",
        props: {
            exclude: {
                type: Array,
                required: false,
            },
            order: {
                type: Array,
                default: [
                    "sabine-loos",
                    "madeline-karr",
                    "marisa-macias",
                    "elijah-knodel",
                ],
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
            }),
            filteredMembers() {
                if (this.exclude) {
                    return this.order.filter(member => !this.exclude.includes(member));
                } else {
                    return this.order;
                }
            },
        },

        methods: {},
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <div class="members-grid" v-if="isLoaded">
        <div v-for="member in filteredMembers" :key="member" class="member">
            <AuthorBlock :author="members[member].meta.slug" orientation="memberGrid" />
        </div>
    </div>
</template>

<style lang="scss">
    .members-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        row-gap: 30px;
        justify-items: start;
        width: 100%;
        align-items: start;
        column-gap: 30px;
    }
</style>
