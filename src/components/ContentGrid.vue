<script>
    import {mapState} from "vuex";
    export default {
        name: "ContentGrid",
        components: {},
        props: {
            data: {
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
                content: state => state.content,
            }),
        },
        methods: {},
        mounted() {},
    };
</script>
<template>
    <div class="content-grid" v-if="data">
        <template v-for="content in data" :key="content.slug">
            <ContentCard :article="content" />
        </template>
    </div>
</template>
<style lang="scss">
    .content-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(100px, 1fr));
        gap: 1.5em;
        row-gap: 3em;
        flex: 1;
        //align-items: flex-start;

        @media (max-width: 1100px) {
            grid-template-columns: repeat(3, minmax(100px, 1fr));
            gap: 1em;
        }

        @media (max-width: 900px) {
            grid-template-columns: repeat(2, minmax(100px, 1fr));
        }

        @media (max-width: 600px) {
            grid-template-columns: minmax(100px, 1fr);
        }
    }
</style>
