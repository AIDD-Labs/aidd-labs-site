<script>
  import {mapState} from "vuex";
  export default {
    name: "PartnersGrid",
    props: {
      partners: {
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
          allPartners: state => state.partners,
      })
    },
    mounted() {
      this.isLoaded = true;
    },
  };
</script>

<template>
  <div class="partners-grid" v-if="isLoaded">
    <div v-for="partner in partners" :key="partner" class="partner">
      <Link
        class="first"
        target="_blank"
        rel="noopener noreferrer"
        :href="allPartners[partner].meta.url">
        <img :src="allPartners[partner].meta.img"/>
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