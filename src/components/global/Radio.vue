<script>
    export default {
        name: "Radio",
        props: {
            value: {
                type: String,
            },
            name: {
                type: String,
            },
        },
        methods: {
            changeEventHandler(evt) {
                this.$emit("radioChange", evt.target.value);
            },
        },
    };
</script>

<template>
    <label>
        <input
            type="radio"
            :value="value"
            :name="name"
            @change="changeEventHandler"
            :id="value"
        />
        <slot />
    </label>
</template>

<style lang="scss">
    @import "./../../styles/globals.scss";
    
</style>
