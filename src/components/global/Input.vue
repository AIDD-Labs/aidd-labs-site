<script>
    export default {
        name: "Input",
        components: {},
        emit: ["selected"],
        props: {
            placeholder: {
                type: String,
                default: "search",
            },
            size: {
                type: String,
                default: "m",
            },
            type: {
                type: String,
            },
            value: {
                type: [String, Boolean, Number],
                required: true,
            }
        },
        data() {
            return {};
        },
        computed: {

        },
    };
</script>

<template>
    <label class="Input">
        <input :type="type" :placeholder="placeholder" @change="$emit('input', $event.target.checked)" v-model="value" />
        <span><slot /></span>
    </label>
</template>

<style lang="scss">
    .Input {
        display: flex;
        gap: 0.5em;
        align-items: baseline;

        input {
            padding: 0.5rem 0.75rem;
            outline: none;
            border-radius: 0px;
            border: 1px solid lightgrey;
            border-radius: 1px;

            &::placeholder {
                font-family: "Vulf Mono", serif;
            }
        }
    }
</style>
