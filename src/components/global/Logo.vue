<script>
    export default {
        name: "Logo",
        components: {},
        props: {},
        data() {
            return {
                isHovered: false,
                shadowFill: "#00e101",
                gradientTransformDeg: 90,
            };
        },
        computed: {
            src () {
                return this.$route.name === "Index"
                    ? "/img/logo-light.png"
                    : "/img/logo-dark.png"
            }
        },
        methods: {},
    };
</script>

<template>
    <div class="logo-img">
            <img :src="src" alt="AIDD labs logo">
    </div>
</template>

<style lang="scss">
    .ssabine-logo {
        position: relative;
        display: inline-block;


    }
</style>
