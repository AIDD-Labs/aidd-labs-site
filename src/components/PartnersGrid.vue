<script>
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
        isLoaded: false,
        allPartners: {
          gpsdd: {
            meta: {
              name: "Global Partnership for Sustainable Development Data",
              img: "/img/partner-gpsdd.png",
              url: "https://www.data4sdgs.org/"
            }
          },
          irishAid: {
            meta: {
              name: "IrishAid",
              img: "/img/partner-irishAid.png",
              url: ""
            }
          },
          kwpf: {
            meta: {
              name: "Korea-World Bank Group Partnership Facility",
              img: "/img/partner-kwpf.png",
              url: ""
            }
          },
          nhc: {
            meta: {
              name: "Natural Hazards Center",
              img: "/img/partner-nhc.png",
              url: "https://hazards.colorado.edu/"
            }
          },
          tfscb: {
            meta: {
              name: "Trust Fund for Statistical Capabity Building",
              img: "/img/partner-tfscb.png",
              url: ""
            }
          },
          usgs: {
            meta: {
              name: "USGS",
              img: "/img/partner-usgs.png",
              url: "https://earthquake.usgs.gov/"
            }
          }
        }
      };
    },
    computed: {},
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
        :href="allPartners[partner]?.meta?.url">
        <img :src="allPartners[partner]?.meta?.img"/>
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