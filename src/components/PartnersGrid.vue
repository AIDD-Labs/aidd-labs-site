<script>
    import {mapState} from "vuex";

    export default {
        name: "PartnersGrid",
        props: {
            data: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                isLoaded: false
            };
        },
        computed: {
            ...mapState({
                partners: state => state.partners,
            })
        },
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <div class="partners-grid" v-if="isLoaded">
        <div v-for="partner in data" :key="partner" class="partner">
            <Link
                class="first"
                target="_blank"
                rel="noopener noreferrer"
                :href="partners[partner].meta.url">
                <img :src="partners[partner].meta.img"/>
            </Link>
        </div>
    </div>
</template>

<style lang="scss">
    .partners-grid {
        display: flex;
        gap: 2.5em;
        width: 100%;
        justify-content: start;
        
        @media (max-width: 800px) {
            display: grid;
            gap: 2em;
            grid-template-columns: minmax(100px, 1fr);
        }

        & .partner {
            height: 75px;

            & a {
                height: 100%;

                & img {
                    height: 100%
                }
            }
        }
    }
</style>