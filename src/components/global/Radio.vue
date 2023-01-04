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
    <label :for="value" class="radio">
        <input
            type="radio"
            :name="name"
            :value="value"
            :id="value"
            @change="changeEventHandler"
        />
        <span><slot /></span>
    </label>
</template>

<style lang="scss">
    @import "./../../styles/globals.scss";
    .radio {
        display: flex;
        gap: 0.5em;
        align-items: baseline;

        input[type="radio"] {
            appearance: none; // removes native appearance
            background-color: #fff;
            font: inherit;
            color: currentColor;
            width: 1.15em;
            height: 1.15em;
            border-radius: 50%;
            border: 0.15em solid black;
            transform: translateY(0.1em);
            display: inline-flex;

            margin: 0;
        }

        input[type="radio"]::before {
            content: "";
            width: 0.85em;
            height: 0.85em;
            border-radius: 50%;
            // position: relative;
            transform: scale(0);
            box-shadow: inset 0em 1em var(--purple-blue-300);
            transition: 120ms transform ease-in-out;
        }

        input[type="radio"]:checked::before {
            transform: scale(1);
        }

        input[type="radio"]:focus {
            box-shadow: inset 0em 1em var(--purple-blue-400);
        }

        span {
            line-height: 1;
            white-space: nowrap;
        }
    }
</style>
