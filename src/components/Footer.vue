<script>
    import {mapState} from "vuex";
    export default {
        name: "Footer",
        components: {},
        props: {},
        data() {
            return {
                links: [
                    {
                        label: "LinkedIn",
                        url: "https://www.linkedin.com/in/margueriteroth/",
                    },
                    {
                        label: "Instagram",
                        url: "https://instagram.com/marguer.ite/",
                    },
                    {
                        label: "Github",
                        url: "https://github.com/margueriteroth/",
                    },
                ],
            };
        },
        computed: {
            ...mapState({
                infoDensity: state => state.infoDensity,
                themeColor: state => state.themeColor,
            }),
        },
        // methods: {
        //     toggleInfoDensity() {
        //         let density = this.infoDensity == "low" ? "high" : "low";
        //         this.$store.dispatch("setInfoDensity", density);
        //     },
        //     toggleThemeColor() {
        //         let theme = this.themeColor == "light" ? "dark" : "light";
        //         this.$store.dispatch("setThemeColor", theme);
        //     },
        // },
    };
</script>

<template>
    <MaxWidth class="footer-container" size="xl">
        <div class="contact">
            <div class="img-logo">
                <img src="/src/assets/img/logo-light.png" alt="AIDD labs logo"> 
            </div>
            <div class="contacttext">
                <p>Send us an email <a href="mailto:sloos@umich.edu" class="footer" target="_blank" rel="noopener noreferrer">sloos [at] umich [dot] edu</a> 
                <br>
                We are looking for new team members and partners!
                <br><br>
                <a href="https://goo.gl/maps/9JHpZbNSBSz7ajgr8" class="footer" target="_blank" rel="noopener noreferrer">Office Address: GG Brown, 2350 Hayward St, Ann Arbor, MI 48109</a>
                
                <form action="https://www.researchgate.net/profile/Sabine-Loos" method="get" target="_blank">
                    <button class="footer">Check out our recent articles</button>
                </form>
                
                © Sabine Loos 2022
                </p>
            </div>
        </div>
        <div class="social"> 
            <h3>Follow us</h3>
            <p>
                <a href="https://twitter.com/sab_loos" class="footer" target="_blank" rel="noopener noreferrer">Twitter</a> 
                <br>
                <a href="https://github.com/sabineloos" class="footer" target="_blank" rel="noopener noreferrer">Github</a>
                <br>
                <a href="https://www.researchgate.net/profile/Sabine-Loos" class="footer" target="_blank" rel="noopener noreferrer">Researchgate</a>
                <br>
                <a href="https://scholar.google.com/citations?user=WEt_N8AAAAAJ&hl=en" class="footer" target="_blank" rel="noopener noreferrer">Google Scholar</a>
            </p>
        </div>
        <div class="related"> 
            <h3>Related</h3>
            <p>
                <a href="https://datartathon.com/" class="footer" target="_blank" rel="noopener noreferrer">DAT/Artathon</a> 
                <br>
                <a href="https://cee.engin.umich.edu/" class="footer" target="_blank" rel="noopener noreferrer">University of Michigan Civil & Environmental Engineering</a>
            </p>
        </div>
    </MaxWidth>
</template>

<style lang="scss">
    @import "./../styles/globals.scss";
        .footer-container {
            display: grid;
            grid-template-columns: 40% 10% 1fr;
            grid-template-areas: 'contact social related';
            grid-gap: 1rem;
            width: 100%;
            background: var(--blue-500);
            padding: 2rem 12.5%;
            color: white;
            font-size: 0.9rem;
        }
        .contact {
            grid-area: contact;
            display: flex;
            flex-direction: column;
        }
        .img-logo{
            width: 175px;
        }
        .contacttext{
            margin: 10px;
        }
        .social {
            grid-area: social;
            display: flex;
            flex-direction: column;
            grid-gap: 0px;
            padding-top: 10px;
        }
        .related {
            grid-area: related;
            display: flex;
            flex-direction: column;
            grid-gap: 0px;
            padding-top: 10px;
        }
</style>
