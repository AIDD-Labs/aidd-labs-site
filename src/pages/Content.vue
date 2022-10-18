<script>
    import {mapState} from "vuex";
    import MaxWidth from "../components/global/MaxWidth.vue";

    export default {
        name: "Content",
        components: { MaxWidth },
        data() {
            return {
                isLoaded: false,
            };
        },
        computed: {
            ...mapState({
                contents: state => state.contents,
            }),
        },

        methods: {},
        mounted() {
            this.isLoaded = true;
            console.log('CONTENTS', this.contents);
        },
    };
</script>

<template>
    <MaxWidth class="team container" size = "xl">
        <div class="team__about">
            <h1>Team</h1>
            Our team is a group of disaster analysts with multiple backgrounds—including humanitarian engineering, civil engineering, statistics--and we're looking to grow.
            We strive to conduct convergent research, blending our knowledge of data and statistics on disasters and/or the built environment with an understanding of the social and natural systems that surround them. 
            Therefore, our team members employ multiple methods bridging multiple disciplines. 
        </div>
        <div class="team__members">
            <h2>Current members</h2>
            <div class="members">
                <div
                    v-for="content in contents"
                    :key="content.slug"
                    class="member">
                        <a :href="content.meta.url" target="_blank" class="member">
                            <img :src="content.meta.thumbnailurl">                         
                        </a>
                </div>
            </div>
        </div>
    </MaxWidth>
</template>

<style lang="scss" >
    @import "./../styles/globals"; 
    .team {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 12.5% 2rem;

        > div:not(:last-child) {
            margin-bottom: 1rem;
        }
    }
    .img-fullwidth{
        display: block;
        margin-left: auto;
        margin-right: auto;
        height: auto;
        max-width: 50%;
    }
    .members {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        row-gap: 30px;
        justify-items: start;
        width: 100%;
    }
    .member {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        & img {
            width: 200px;
            aspect-ratio: 2/3;
        }
    }
</style>