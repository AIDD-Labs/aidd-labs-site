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
                lightbox: {
                    images: {
                        thumbnails: ["team-2024-SummerKickOff-2.jpg","team-2023-Kanako-1.jpg","team-2022-retreat.jpeg","team-2022-usgs-goodbye.jpeg"],
                        large: ["team-2024-SummerKickOff-2.jpg","team-2023-Kanako-1.jpg","team-2022-retreat.jpeg","team-2022-usgs-goodbye.jpeg"],
                    },
                    captions: [
                        "AIDD labs after our summer retreat at the Botanical Gardens. Pictured L to R: Apil K C, Sabine Loos, Shriya Kethireddy, Christin Salley, Simone Curtis, Major Zeng.",
                        "AIDD labs getting ice cream after work. Pictured clockwise: Sabine Loos, Marísa Macías, David Wald, Alex Brunson, Eli Knodel, Maddie Karr.",
                    ],
                    thumbnailsPath: "/img/",
                    largePath: "/img/",
                },
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
                    >If you’d like to pursue a PhD in AIDD labs, please consider applying
                    to Civil & Environmental Engineering program at the University of
                    Michigan.</b
                >
                Please indicate in your application that you’re interested in working with
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
                    >If you’d like to be a postdoc at AIDD labs, we are always looking for
                    talented individuals to contribute to our team through skill sharing,
                    mentorship, and conducting research.</b
                >
                If you are interested in joining our team as a postdoc, please email
                Professor Loos with “Prospective Postdoc: " at the beginning of the subject line. Please also include
                your CV and the ways you believe you can contribute to AIDD labs.
                <br /><br />
                <b
                    >If you’d like to collaborate or partner with AIDD labs, especially as
                    a community organization or as a user of disaster information, please
                    email Professor Loos with a description of your ideas and she’ll
                    respond as soon as she can.
                </b>
                <br />
            </p>
            <!-- <div class="img-fullwidth"><img src="/img/team-usgs.png" alt="AIDD team USGS"></div> -->
            <div class="gallery">
                <LightBox
                :thumbnails="lightbox.images.thumbnails"
                :largeImages="lightbox.images.large"
                :thumbnailsPath="lightbox.thumbnailsPath"
                :largePath="lightbox.largePath"
                :captions="lightbox.captions"
                class="light-box"
            />
            </div>
            <!-- <LightBox
                :thumbnails="lightbox.images.thumbnails"
                :largeImages="lightbox.images.large"
                :thumbnailsPath="lightbox.thumbnailsPath"
                :largePath="lightbox.largePath"
                :captions="lightbox.captions"
                class="light-box"
            /> -->
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
    .gallery {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: flex-start;
        justify-content: space-between;
        gap: 20px;
        column-gap: 100px;
        flex-grow: 1;
        flex-basis: 125px;
        max-width: 100%;
        row-gap: 10px;
    }
    .gallery img {
        width: 100%;
        max-width: 50%;
    }
    .light-box {
        &__thumbnail {
            border-radius: 8px;
            max-width: 60%;
        }
    }
</style>
