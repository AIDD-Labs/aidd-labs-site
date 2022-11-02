<script>
    import {mapState} from "vuex";
    import Work from "@/components/Work.vue";
    import LightBox from "@/components/global/Lightbox.vue";

    export default {
        name: "Index",
        components: {
            Work,
            LightBox,
        },
        data() {
            return {
                isLoaded: false,
                aboutState: 'mission',
                lightbox: {
                    images: {
                    thumbnails: ["home-approach.jpg"],
                    large: ["home-approach.jpg"]
                },
                captions: ["The AIDD labs approach"],
                thumbnailsPath: "/img/",
                largePath: "/img/"
                }
            };
        },
        computed: {
            ...mapState({
                recentPosts: state => [...state.posts.slice(0, 3)],
            }),
            aboutContent () {
                const aboutContentHash = {
                    mission: `
                        <p> The AIDD (Actionable Information for Disasters and Development) labs’ mission is to leverage data and information to prioritize populations in need before, during, and after disasters. 
                            Led by Dr. Sabine Loos and housed at the University of Michigan, AIDD labs aims to continuously improve upon (and in some cases, break down) current disaster data 
                            by integrating voices of communities and organizations who have historically been excluded from design,
                            by developing approaches that can be used in data-scarce regions, and
                            by understanding past applications to better design future information systems.
                        <p> Our lab website is under construction, but please explore our research and approach here. If you are interested in joining our lab, please see our 
                            <a href="http://disasterdata.engin.umich.edu/team">Team</a> page.</p>`,
                    research: `
                        <p> Our research takes multiple forms, both to understand our current information systems and to design new systems that reduce risk to those most vulnerable.  
                            Our projects range from evaluating why people contribute to crowdsourced hazard information to developing statistical methods to estimate disaster impacts. 
                            We consider various aspects of disaster information, whether it be the hazard, its physical impacts, its social impacts, or a combination of the three. 
                            Some of our research areas include: </p> 
                        <ul>
                            <li> Rapidly estimating post-disaster building damage </li>
                            <li> Conducting user needs assessments for disaster information </li>
                            <li> Surveying and modeling post-disaster recovery </li>
                            <li> Designing user and equity-centered risk information </li>
                            <li> Evaluating differences in crowdsourced hazard data responses </li>
                        </ul>
                        `,
                    approach: `
                        <p> AIDD labs designs information by first understanding what the needs are for that information—either by engaging with those living in communities at risk or those responding to and managing those risks.
                            We then develop approaches to address these needs by leveraging statistical learning, crowdsourcing, remote sensing, among other techniques. 
                            Importantly, we consider the implications of the information we design through evaluating the effects of data-driven decisions and continued engagement with our users. </p>
                        <p> Our general approach to our research integrates the many disciplines needed to develop more holistic disaster information, blending engineering, the earth sciences, the social sciences, and information systems. 
                            We also include the opinions of users as much as possible to improve our data development, especially those who have historically been excluded from disaster data development and decision making.</p>`
                }
                return aboutContentHash[this.aboutState]
            }
        },

        methods: {
            handleClick (e) {
                console.log('HANDLE CLICK', e.target.value);
                this.aboutState = e.target.value;
            }
        },
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <section class="hero">
        <div class="hero-content">
            <h1 class="hero-title">
                Designing disaster and development information for <em>action</em>.
            </h1>
        </div>
    </section>
        <MaxWidth class="grid-container" size = "xl">
        <div class="main">
            <h1>ABOUT</h1>
            <div class="about">
                <div class="about-text">
                    <div v-html="aboutContent"></div>
                <div class="btn-toolbar" role="toolbar">
                    <button @click="handleClick" value="mission" :class="{ primary: aboutState === 'mission' }">Our Mission</button>
                    <button @click="handleClick" value="research" :class="{ primary: aboutState === 'research' }">Our Research</button>
                    <button @click="handleClick" value="approach" :class="{ primary: aboutState === 'approach' }">Our Approach</button>
                </div>
                </div>
                <div class="about-img">
                    <!-- <img src="/img/home-approach.png" alt="AIDD labs approach diagram showing flows from users to decisions to data"> -->
                    <LightBox
                        :thumbnails="lightbox.images.thumbnails"
                        :largeImages="lightbox.images.large"
                        :thumbnailsPath="lightbox.thumbnailsPath"
                        :largePath="lightbox.largePath"
                        :captions="lightbox.captions"
                        class="lightBox"
                    />
                </div>
            </div>
            <h1>Partners & Funders</h1>
            <div class="partners">
                <div class="partners__photo-banner">
                    <a class="first" target="_blank" rel="noopener noreferrer" href="https://earthquake.usgs.gov/"><img src="/img/partner-usgs.png" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://hazards.colorado.edu/"><img src="/img/partner-nhc.png" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.data4sdgs.org/"><img src="/img/partner-GPSDD.jpg" /></a>
                    <a href="#"><img src="/img/partner-tfscb.png" /></a>
                    <a href="#"><img src="/img/partner-WBibrd.png" /></a>
                    <a href="#"><img src="/img/partner-kwpf.png" /></a>
                    <a href="#"><img src="/img/partner-UKaid.jpg" /></a>
                    <a href="#"><img src="/img/partner-irishAid.png" /></a>
                    <!-- Below is the width of 1400 px -->
                    <a target="_blank" rel="noopener noreferrer" href="https://earthquake.usgs.gov/"><img src="/img/partner-usgs.png" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://hazards.colorado.edu/"><img src="/img/partner-nhc.png" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.data4sdgs.org/"><img src="/img/partner-GPSDD.jpg" /></a>
                    <a href="#"><img src="/img/partner-tfscb.png" /></a>
                    <a href="#"><img src="/img/partner-WBibrd.png" /></a>
                </div>
            </div>
            <!-- <div class="FeedItem">
                <div class="FeedItem__image" src="/img/partner-tfscb.png"></div>
            </div> -->
        </div>
    </MaxWidth>
</template>

<style lang="scss" >
    @import "./../styles/globals";
    body, html {
    height: 100%;
}
// HERO STUFF
    .hero{
        position: relative;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .hero::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("/img/home-hero-1.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        filter: brightness(80%);
    }
    .hero-content{
        position: absolute;
        color: white;
        text-align: left;
        width: 50vw; // 10% of the width
        left: 10%;
        top: 60%;
        // transform: translate(0%, -50%);
    }
    .hero-title{
        font-family: 'DM Sans';
        font-size: 3rem;
        font-weight: 300;
        margin-bottom: 0;
    }
// buttons
.show {
  display: block;
}

// BODY
.grid-container {
        display: flex;
        justify-content: center;
        padding: 20px 10px 50px 10px;
        height: auto;
        overflow: hidden;
    }
    .main{
        width: 75%;
        display: flex;
        flex-direction: column;
    }
    .about{ 
        display: flex;
        margin: 10px;
    }
    .about-text{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end; // keep things aligned to the bottom so the bottoms don't jump around
    }

    .about-img{ grid-area: about-img;
        display: block;
        width: 50%;
        height: auto;
        justify-content: center;
        padding-left: 1rem;
    }
    .light-box {
        &__thumbnail {
        margin: 10px;
        width: 100%;
        }
        & img {
        max-width: 100%;
        }
    }

    .partners {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        // https://stackoverflow.com/questions/52134961/first-img-of-bannermover-does-not-follow-directly-after-last-img-of-bannermove
        &__photo-banner {
            height: 75px;
            margin-top: 10px;
            // width: 100%;
            width: 1425px;
            & img {
            display: inline-block;
            height: 75px;
            // height: auto;
            padding-right: 50px;
            width: auto;
            // width: 250px;
            }
        }
        &__photo-banner {
            & img {
                transition: all 0.5s ease;
            }
        }
        & .first {
	        animation: bannermove 50s linear infinite;
        }
    }

// KEY FRAME ANIMATIONS
    
    // }
    @keyframes bannermove {
        0% {margin-left: 0%;}
        100% {
            // margin-left: -200%;
            margin-left: -1795px; //we did this by trial and error lol
        }
        
    }
    .news{
        display: flex;
        flex-direction:row;
        margin: 10px;
    }
    .news-featured{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
    }
    .news-latest{
        display: flex;
        flex-direction: column;
        width: 50%;
    }
    .img-fullwidth{
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 70%;
        }
    .ul.partnerlogos {
        margin: 0;
        padding: 0;
        white-space: nowrap;
        width: 1000px;
        overflow-x: auto;
        background-color: transparent;
    }
    .ul.partnerlogos li{
        display: inline;
        width: 150px;
        height: 150px;
    }
    .index {
        &__label {
            text-align: center;

            &--recent {
                text-align: center;
            }
        }

        &__feed {
            display: none;
            gap: 2em;
            height: 600px;
            margin-bottom: 2em;

            & > div {
                flex: 1;
                overflow: hidden;
                display: flex;
                justify-content: end;
                border: 1px solid;
            }
        }

        .FeedItem {
            display: flex;
            flex-direction: column;
            display: flex;

            &__image {
                height: 100%;
                border-bottom: 1px solid;
                padding: 1em;
            }

            &__description {
                padding: 1em;
            }

            img {
                height: 100%;
                object-fit: cover;
            }
        }

        &__recents {
            display: flex;
            justify-content: center;

            h2 {
                position: relative;
                line-height: 1;
            }
        }

        &__posts,
        &__work {
            text-align: center;
            margin-bottom: 4em;
        }
    }
</style>
