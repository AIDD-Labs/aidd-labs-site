<script>
    import {mapState} from "vuex";
    export default {
        name: "JoinTheLabBlock",
        components: {},
        props: {},
        emits: [],
        data() {
            return {};
        },
        computed: {
            teamPhotoAltDestription() {
                return "Group of ~30 adults of all ages and genders, standing together on a patio with a red chair in the foreground.";
            },
        },
        methods: {},
        mounted() {},
    };
</script>
<template>
    <div class="join-the-lab-block">
        <h2>We’re hiring!</h2>
        <p>
            Are you interested in Lorem ipsum dolor sit amet, consectetur adipiscing elit
            ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel
            fringilla est ullamcorper eget nulla facilisi etiam dignissim diam qui.
        </p>
        <p>
            If you’re interested in this position, please consider applying to the MS or
            PhD program at the University of Michigan. If you would like to discuss
            opportunities before applying, please email Dr. Sabine Loos at
            <Link to="mailto:sloos@umich.edu">sloos@umich.edu</Link>, including
            information about yourself, why you’re interested in this lab specifically,
            and what you’re looking for in a MS or PhD program.
        </p>
        <p>
            JOIN THE LAB Do you want to volunteer for the Work and Play Lab? Michael
            Inzlicht accepts new student volunteers from time to time. Interested students
            should be prepared to volunteer for 8-10 hours per week. To join the lab,
            please complete a lab application and submit it with a transcript (unofficial
            copies are OK) to Dr. Inzlicht’s mailbox in the Psychology office, or slipped
            under the door of the lab, in room SY162 of the Science Building.
        </p>
        <Link is-button to="http://michaelinzlicht.com/information-for-students">
            Learn More
        </Link>
        <div class="images">
            <div class="bio-image-container">
            <img src="/img/team-stanford-reception.png" alt="" />
        </div>
        <div class="bio-image-container">
            <img src="/img/team-usgs.png" :alt="teamPhotoAltDestription" />
        </div>
        </div>
    </div>
</template>
<style lang="scss">
    .join-the-lab-block {
        .images {
            display: flex;
            flex-direction: column;
            gap: 2em;
        }
    }
</style>
