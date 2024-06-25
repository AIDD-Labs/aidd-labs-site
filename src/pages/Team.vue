<script>
    import {mapState} from "vuex";
    import MaxWidth from "../components/global/MaxWidth.vue";
    import LightBox from "@/components/global/Lightbox.vue";

    export default {
        name: "Team",
        components: {
            MaxWidth,
            LightBox,
        },
        data() {
            return {
                isLoaded: false,
            };
        },
        computed: {
            ...mapState({
                members: state => state.members,
                memberMetadata: state => state.memberMetadata,
                contents: state => state.contents,
                recentPosts: state => [...state.posts.slice(0, 3)],
            }),
            currentMembers() {
                const seniorityMap = {
                    "Professor":0,
                    "Associate Professor":0,
                    "Assistant Professor":0,
                    "Postdoctoral Fellow":1,
                    "Postdoctoral Researcher":1,
                    "PhD Researcher":2,
                    "Masters Researcher":3,
                    "Undergraduate Researcher":4
                }
                return this.memberMetadata.current.sort((a,b) => {
                    return seniorityMap[this.members[a].meta.title] - seniorityMap[this.members[b].meta.title];
                })
            },
            alumniMembers () {
                return this.memberMetadata.alumni.sort((a,b) => {
                    return this.members[b].meta.yearDeparted - this.members[a].meta.yearDeparted;
                })
            }
        },

        methods: {},
        mounted() {
            this.isLoaded = true;
        },
    };
</script>

<template>
    <SEO
        meta-title="Team"
        meta-description="About our diverse group of scientists and engineers."
    />
    <MaxWidth class="team-page container" size="m" v-if="isLoaded">
        <div class="team__about">
            <h1>Team</h1>
            Our team is a group of disaster analysts with multiple
            backgrounds&mdash;including engineering, data science, and urban planning. We strive to conduct convergent
            research, blending our knowledge of data and statistics on disasters and/or
            the built environment with an understanding of the social and natural systems
            that surround them. Therefore, our team members employ multiple methods
            bridging multiple disciplines.
        </div>
        <div class="team__members">
            <h2>Current members</h2>
            <MembersGrid
                :data="currentMembers" />
        </div>
        <div class="team__alumni">
            <h2>Alumni</h2>
            <div v-for="alumni in alumniMembers" :key="alumni">
                <Link :to="members[alumni].path">
                    {{ members[alumni].meta.name }}
                </Link>, '{{ members[alumni].meta.yearDeparted?.slice(2) }} - now at 
                <Link v-if="members[alumni].meta.affiliationLink" :to="members[alumni].meta.affliationLink">{{ members[alumni].meta.affiliation }}</Link>
                <span v-else>{{ members[alumni].meta.affiliation }}</span>
                <br />
            </div>
        </div>
        <div class="team__opportunities">
            <h2>Opportunities</h2>
            <p>
                <b>Interested in joining our team?</b> <br /><br />
                <b
                    >If you'd like to pursue a PhD in AIDD labs, please consider applying
                    to Civil & Environmental Engineering program at the University of
                    Michigan.</b
                >
                Please indicate in your application that you're interested in working with
                Professor Loos to ensure she is sent your application for review. We are
                open to folks from multiple disciplines, including engineering, geography, geoinformatics,
                urban planning, computer science, geology, among many more. 
                <br /><br />
                You are also more than welcome to email Professor Loos with 
                “Prospective PhD student:” at the beginning of the subject line before applying. Please include your CV, a
                description of your research interests and how they align with AIDD labs
                research, what you're hoping to gain from a PhD, and any other relevant
                material. While Professor Loos would like to be able to respond to
                all inquiries, you may not receive a personal response given the number of
                emails received each year.
                <br /><br />
                <b
                    >If you'd like to be a postdoc at AIDD labs, we are always looking for
                    talented individuals to contribute to our team through skill sharing,
                    mentorship, and conducting research.</b
                >
                If you are interested in joining our team as a postdoc, please email
                Professor Loos with “Prospective Postdoc: " at the beginning of the subject line. Please also include
                your CV and the ways you believe you can contribute to AIDD labs.
                <br /><br />
                <b
                    >If you'd like to collaborate or partner with AIDD labs, especially as
                    a community organization or as a user of disaster information, please
                    email Professor Loos with a description of your ideas and she'll
                    respond as soon as she can.
                </b>
                <br />
            </p>

   <!-- Gallery items -->
<div id="gallery">
    <div><img src="/img/team-2024-FullLab.jpg"/><a href="#lightbox-1"></a></div>
    <div><img src="/img/team-2024-SummerKickOff-2.jpg"/><a href="#lightbox-2"></a></div>
    <div><img src="/img/team-2022-Retreat.jpeg"/><a href="#lightbox-3"></a></div>
    <div><img src="/img/team-2024-chitwan-drone.jpg"/><a href="#lightbox-4"></a></div>
    <div><img src="/img/team-2024-chitwan-group.jpg"/><a href="#lightbox-5"></a></div>
    <div><img src="/img/team-2022-usgs-goodbye.jpeg"/><a href="#lightbox-6"></a></div>
    <div><img src="/img/team-2023-Kanako-1.jpg"/><a href="#lightbox-7"></a></div>
    <!-- <div><img src="/img/team-usgs.png"/><a href="#lightbox-8"></a></div> -->
    <!-- <div><img src="/img/team-2024-sabine-major.jpg"/><a href="#lightbox-9"></a></div> -->
    <!-- <div><img src="/img/team-2023-nhw.jpg"/><a href="#lightbox-10"></a></div> -->
    <!-- <div><img src="/img/team-2023-nepal.jpg"/><a href="#lightbox-11"></a></div> -->
    <!-- <div><img src="/img/team-2024-chitwan-river.jpg"/><a href="#lightbox-12"></a></div> -->
    <!-- <div><img src="/img/team-2024-majorPresentation.jpg"/><a href="#lightbox-13"></a></div> -->
    <!-- <div><img src="/img/team-2024-simoneApil.jpg"/><a href="#lightbox-14"></a></div> -->
    <!-- <div><img src="/img/team-2024-maggie-FL.jpg"/><a href="#lightbox-15"></a></div> -->
    <!-- <div><img src="/img/team-2024-brad.jpg"/><a href="#lightbox-16"></a></div> -->
    <!-- <div><img src="/img/proj-2023-landslide.jpg"/><a href="#lightbox-17"></a></div> -->
    <!-- <div><img src="/img/team-2023-nhwMacias.jpg"/><a href="#lightbox-18"></a></div>  -->
</div>

<!-- <div class="lightbox" id="lightbox-1">
  <div class="content"><img src="/img/team-2024-FullLab.jpg"/>
    <div class="caption">Full team at breakfast in Nepal</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-2">
  <div class="content"><img src="/img/team-2024-SummerKickOff-2.jpg"/>
    <div class="caption">AIDD labs after our summer retreat at the Botanical Gardens. Pictured L to R: Apil K C, Sabine Loos, Shriya Kethireddy, Christin Salley, Simone Curtis, Major Zeng.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-3">
  <div class="content"><img src="/img/team-2022-retreat.jpeg"/>
    <div class="caption">Painting pumpkins at research workshop and retreat</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-4">
  <div class="content"><img src="/img/team-2024-chitwan-drone.jpg"/>
    <div class="caption">Brad Bottoms and Apil KC managing a drone session. </div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-5">
  <div class="content"><img src="/img/team-2024-chitwan-group.jpg"/>
    <div class="caption">Team on field trip to visit Chitwan Nepal to study flooding.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-6">
  <div class="content"><img src="/img/team-2022-usgs-goodbye.jpeg"/>
    <div class="caption">USGS team. Pictured L to R: Marísa Macías, Eli Knodel, Maddie Karr, Sabine Loos.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-7">
  <div class="content"><img src="/img/team-2023-Kanako-1.jpg"/>
    <div class="caption">AIDD labs getting ice cream after work. Pictured clockwise: Sabine Loos, Marísa Macías, David Wald, Alex Brunson, Eli Knodel, Maddie Karr.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-8">
  <div class="content"><img src="/img/team-usgs.png"/>
    <div class="caption">Group outing to get ice cream!</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-9">
  <div class="content"><img src="/img/team-2024-sabine-major.jpg"/>
    <div class="caption">Sabine and Major</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-10">
  <div class="content"><img src="/img/team-2023-nhw.jpg"/>
    <div class="caption">Team at the Natural Hazards Workshop 2023</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-11">
  <div class="content"><img src="/img/team-2023-nepal.jpg"/>
    <div class="caption">Team in field trip to NSET in Nepal in 2023.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-12">
  <div class="content"><img src="/img/team-2024-chitwan-river.jpg"/>
    <div class="caption"> Field visit to Chitwan flooding.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-13">
  <div class="content"><img src="/img/team-2024-majorPresentation.jpg"/>
    <div class="caption">Major presenting on disaster risk modeling.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-14">
  <div class="content"><img src="/img/team-2024-simoneApil.jpg"/>
    <div class="caption">Simone and Apil at a group outing to BaraSinghe Brewery.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-15">
  <div class="content"><img src="/img/team-2024-maggie-FL.jpg"/>
    <div class="caption">Maggie at a user needs session at the Field Lab.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-16">
  <div class="content"><img src="/img/team-2024-brad.jpg"/>
    <div class="caption">Brad speaking at the 2024 Field Lab.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-17">
  <div class="content"><img src="/img/proj-2023-landslide.jpg"/>
    <div class="caption">Landslides and roads in Nepal.</div><a class="close" href="#gallery"></a>
  </div>
</div>
<div class="lightbox" id="lightbox-18">
  <div class="content"><img src="/img/team-2023-nhwMacias.jpg"/>
    <div class="caption">Marisa presenting her work at the Natural Hazards Workshop.</div><a class="close" href="#gallery"></a>
  </div>
</div>  -->
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    .team-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 5em;
        padding-top: 4em;
        gap: 2em;

        > div:not(:last-child) {
            margin-bottom: 1rem;
        }
    }

// gallery items
    * {
        box-sizing: border-box;
        }

    body {
        margin: 5px;
        position: relative;
    }

    #gallery {
        display: grid;
        height: calc(100vh - 10px);
        grid-template: repeat(6, 1fr)/repeat(6, 1fr);
        grid-gap: 0.5em;
        padding-top: 20px
    }
    @media (max-width: 800px) {
    #gallery {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        justify-content: center;
    }
    #gallery > div {
        width: 48%;
        margin: 1%;
    }
    }
    @media (max-width: 800px) and (max-width: 350px) {
    #gallery > div {
        width: 98%;
    }
    }
    #gallery > div:nth-child(6n+1) {
        grid-column: span 2;
        grid-row: span 2;
    }
    #gallery > div:nth-child(2) {
        grid-column: span 3;
        grid-row: span 3;
    }
    #gallery > div:nth-child(4) {
        grid-column: span 1;
        grid-row: span 2;
    }
    #gallery > div > a {
        opacity: 0;
        position: absolute;
        color: #000;
        background-color: #000;
        padding: 2rem;
        mix-blend-mode: difference;
        width: 100%;
        height: 100%;
        transition: all ease 1s;
    }
    #gallery > div > img {
        width: 100%;
        min-height: 100%;
        transition: all ease 1s;
    }
    #gallery > div:hover img {
        filter: blur(4px);
    }
    #gallery > div:hover a {
        opacity: 1;
    }
    #gallery > div {
        overflow: hidden;
        position: relative;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 20px 0 rgba(0, 0, 0, 0.19);
    }
    #gallery div,
    #gallery a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }

    [id^=lightbox-] {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(168, 185, 241, 0.4);
        display: flex;
        opacity: 0;
        transition: opacity 450ms ease-in-out;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }
    [id^=lightbox-]:target {
        opacity: 1;
        pointer-events: inherit;
    }
    [id^=lightbox-]:target img {
        filter: blur(0);
    }
    [id^=lightbox-] .content {
        max-width: 90%;
        position: relative;
        color: #000;
    }
    [id^=lightbox-] .content:hover > a.close {
        opacity: 1;
        transform: scale(1, 1);
    }
    [id^=lightbox-] .content:hover > .caption {
        opacity: 1;
        transform: translateY(-3px);
    }
    [id^=lightbox-] .content:hover > .caption::after {
        opacity: 1;
    }
    [id^=lightbox-] .content > * {
        transition: all 450ms ease-in-out;
    }
    [id^=lightbox-] .caption {
        display: block;
        margin: 0;
        padding: 1em;
        position: absolute;
        bottom: 0;
        width: 100%;
        transform: translateY(50%);
        font-size: 1.2em;
        opacity: 0;
    }
    [id^=lightbox-] .caption::after {
        content: " ";
        background-color: rgba(168, 185, 241, 0.6);
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        transition: all 350ms ease-in-out 250ms;
        opacity: 0;
        transform-origin: bottom;
        mix-blend-mode: soft-light;
    }
    [id^=lightbox-] img {
        max-height: 90vh;
        max-width: 100%;
        margin: 0;
        padding: 0;
        filter: blur(50px);
    }
    [id^=lightbox-] a.close {
        width: 2em;
        height: 2em;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(0, 0);
        opacity: 0;
        transform-origin: right top;
        text-decoration: none;
        color: #000;
        }
        [id^=lightbox-] a.close::after {
        content: "X";
    }
</style>
