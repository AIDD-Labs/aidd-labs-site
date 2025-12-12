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
          nsf: {
            meta: {
              name: "National Science Foundation",
              img: "/img/partner-nsf.png",
              url: "https://new.nsf.gov/funding/opportunities/hdbe-humans-disasters-built-environment"
            }
          },
          hot: {
            meta: {
              name: "Humanitarian OpenStreetMap Team",
              img: "/img/partner-hot-osm.png",
              url: "https://www.hotosm.org/"
            }
          },
          suri: {
            meta: {
              name: "Stanford Urban Resilience Initiative",
              img: "/img/partner-suri.png",
              url: "https://urbanresilience.stanford.edu/"
            }
          },
          kll: {
            meta: {
              name: "Kathmandu Living Labs",
              img: "/img/partner-kll.png",
              url: "https://kathmandulivinglabs.org/"
            }
          },
          guycarp: {
            meta: {
              name: "Guy Carpenter",
              img: "/img/partner-guycarp.png",
              url: "https://www.guycarp.com/"
            }
          },
          cac: {
            meta: {
              name: "Climate Adaptation Center",
              img: "/img/partner-cac.png",
              url: "https://www.theclimateadaptationcenter.org/"
            }
          },
          eos: {
            meta: {
              name: "Earth Observatory of Singapore",
              img: "/img/partner-eos.png",
              url: "https://earthobservatory.sg/"
            }
          },
          nasaJPL: {
            meta: {
              name: "NASA JPL Aria",
              img: "/img/partner-nasa-jpl.png",
              url: "https://aria.jpl.nasa.gov/"
            }
          },
          nasa: {
            meta: {
              name: "NASA",
              img: "/img/partner-nasa.png",
              url: "https://science.nasa.gov/earth/"
            }
          },
          gpsdd: {
            meta: {
              name: "Global Partnership for Sustainable Development Data",
              img: "/img/partner-gpsdd.png",
              url: "https://www.data4sdgs.org/"
            }
          },
          gfdrr: {
            meta: {
              name: "Global Facility for Disaster Reduction and Recovery",
              img: "/img/partner-gfdrr.png",
              url: "https://www.gfdrr.org/en"
            }
          },
          taf: {
            meta: {
              name: "The Asia Foundation",
              img: "/img/partner-taf.png",
              url: "https://asiafoundation.org/"
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
          umISR: {
            meta: {
              name: "University of Michigan Institute for Social Research",
              img: "/img/partner-um-isr.png",
              url: "https://isr.umich.edu/"
            }
          },    
          umCOE: {
            meta: {
              name: "University of Michigan College of Engineering",
              img: "/img/partner-um-coe.png",
              url: "https://www.engin.umich.edu/about/"
            }
          },
          MIDAS: {
            meta: {
              name: "University of Michigan College of Engineering",
              img: "/img/partner-midas.png",
              url: "https://midas.umich.edu/"
            }
          },
          NDRRMA: {
            meta: {
              name: "National Disaster Risk Reduction and Management Authority",
              img: "/img/partner-NDRRMA.png",
              url: "https://bipad.gov.np/"
            }
          }, 
          icimod: {
            meta: {
              name: "ICIMOD",
              img: "/img/partner-ICIMOD.png",
              url: ""
            }
          },  
          huc: {
            meta: {
              name: "HUC",
              img: "/img/partner-HUC.png",
              url: ""
            }
          }, 
          drfi: {
            meta: {
              name: "DRFI",
              img: "/img/partner-drfi.png",
              url: ""
            }
          },     
          UoT: {
            meta: {
              name: "University of Toronto",
              img: "/img/partner-UoT.png",
              url: ""
            }
          },        
          UJL: {
            meta: {
              name: "Urban Justice League",
              img: "/img/partner-urbanjusticeleague.png",
              url: ""
            }
          }, 
          plan8: {
            meta: {
              name: "Plan 8",
              img: "/img/partner-plan8.png",
              url: ""
            }
          },    
          ssBAHA: {
            meta: {
              name: "Social Science Baha",
              img: "/img/partner-ss-baha.png",
              url: ""
            }
          },     
          sshrc: {
            meta: {
              name: "SSHRC",
              img: "/img/partner-SSHRC.png",
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