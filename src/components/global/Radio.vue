<script>
    export default {
      name: "Radio",
      props: {
        value: {
            type: String
        },
        name: {
          type: String
        }
      },
      methods: {
        changeEventHandler(evt) {
            this.$emit('radioChange', evt.target.value)
        }
      }
    };
</script>

<template>
  <label :for="value" class="radio">
    <input
        type="radio"
        :name="this.name"
        :value="value"
        :id="value"
        @change="changeEventHandler" />
    <span><slot /></span>
  </label>
</template>

<style lang="scss">
    input[type="radio"]:checked:after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #ffa500;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }
</style>
