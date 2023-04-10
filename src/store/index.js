import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            posts: [],
            postsById: {},
            members: {},
            contents: [],
            projects: [],
            memberMetadata: {
                current: [],
                alumni: [],
                external: []
            },
            contentMetadata: {
                types: [],
                topics: []
            },
            projectMetadata: {
                locations: [],
                methods: [],
                topics: []
            },
            infoDensity: "low",
            themeColor:
                typeof window !== "undefined" && localStorage.getItem("sb____")
                    ? JSON.parse(localStorage.getItem("sb____"))["theme"]
                    : "light",
            localStorageKey: "sb____",
            siteMetadata: {
                title: `AIDD Labs`,
                description: `The AIDD (Actionable Information for Disasters and Development) labs’ mission is to leverage data and information to prioritize populations in need before, during, and after disasters.`,
                author: `Sabine Loos`,
                siteUrl: "https://disasterdata.engin.umich.edu",
                url: "disasterdata.engin.umich.edu",
                ogImage: `https://disasterdata.engin.umich.edu/metas/og-image-aidd-default.png`,
                twitterImage: ``,
                keywords: `university of michigan, aidd labs, Sabine Loos, Sabine Loos, civil, environmental, engineering, disaster, relief, data, data visualization`,
                twitterUrl: "https://twitter.com/sab_loos",
                githubUrl: "https://github.com/sabineloos",
                researchGateUrl: "https://www.researchgate.net/profile/Sabine-Loos",
                googleScholarUrl:
                    "https://scholar.google.com/citations?user=WEt_N8AAAAAJ&hl=en",
                michCivilUrl: "https://cee.engin.umich.edu",
                sabineLoosUrl: "https://sabineloos.com"
            },
        };
    },

    mutations: {
        loadPosts(state, {posts}) {
            let sortedPosts = [...posts];

            let recentDate = arr => new Date(arr[arr.length - 1]);
            sortedPosts = sortedPosts.sort((a, b) => {
                return recentDate(b.meta.date) - recentDate(a.meta.date);
            });

            let postsById = {};
            sortedPosts.forEach(post => {
                postsById[post.id] = post;
            });

            state.posts = sortedPosts;
            state.postsById = postsById;
        },

        loadMembers(state, {members}) {
            state.members = members;
        },

        setMemberMetadata(state, {members}) {
            const memberMetadata = Object.values(members).reduce((acc, member) => {
                const { type = "current" } = member.meta;
                acc[type] = [ ...(acc[type] || []), member.meta.slug ];
                
                return acc;
            }, {});

            state.memberMetadata = memberMetadata
        },

        loadContents(state, {contents}) {
            let sortedContents = [...contents];

            sortedContents = sortedContents.sort((a, b) => {
                return new Date(b.meta.date) - new Date(a.meta.date);
            });

            state.contents = sortedContents; // might want to add content by topic
        },

        setContentMetadata(state, {contents}) {
            const contentMetadata = contents.reduce((acc, content) => {
                const { topics, type } = content.meta;
                const concatenatedTopics = acc.topics.concat(topics);

                !acc.types.includes(type) && acc.types.push(type);
                const uniqueTopics = concatenatedTopics.filter((topic, idx) => concatenatedTopics.indexOf(topic) === idx);
                
                acc.topics = uniqueTopics;

                return acc;
            }, { types: [], topics: [] });

            state.contentMetadata = contentMetadata;
        },

        loadProjects(state, {projects}) {
            let sortedProjects = [...projects];

            sortedProjects = sortedProjects.sort((a, b) => {
                const astart = a.meta.date.trim().split("-")[0]
                const bstart = b.meta.date.trim().split("-")[0]
                return new Date(bstart) - new Date(astart);
            });

            state.projects = sortedProjects; 
        },

        setProjectMetadata(state, {projects}) {
            const projectMetadata = projects.reduce((acc, project) => {
                const { methods, locations, topics } = project.meta;
                const concatenatedMethods = acc.methods.concat(methods);
                const concatenatedLocations = acc.locations.concat(locations);
                const concatenatedTopic = acc.topics.concat(topics);

                const uniqueMethods = concatenatedMethods.filter((method, idx) => concatenatedMethods.indexOf(method) === idx);
                const uniqueLocations = concatenatedLocations.filter((location, idx) => concatenatedLocations.indexOf(location) === idx);
                const uniqueTopic = concatenatedTopic.filter((topics, idx) => concatenatedTopic.indexOf(topics) === idx);

                acc.methods = uniqueMethods;
                acc.locations = uniqueLocations;
                acc.topics = uniqueTopic;

                return acc;
            }, { locations: [], methods: [], topics: []});

            state.projectMetadata = projectMetadata;
        },

        setInfoDensity(state, density) {
            state.infoDensity = density;
        },
        setThemeColor(state, theme) {
            // state.themeColor = theme;
            // let storage = localStorage.getItem("mz____") ? JSON.parse(localStorage.getItem("mz____")) : {theme};
            // localStorage.setItem(state.localStorageKey, JSON.stringify({theme}));
        },
        setMode(state, mode) {
            state.mode = mode;
        },
    },

    actions: {
        loadPosts({commit}, posts) {
            commit("loadPosts", {
                posts: posts,
            });
        },

        loadMembers({commit}, members) {
            commit("loadMembers", {
                members: members,
            });
            commit("setMemberMetadata", {
                members: members
            });
        },

        loadContents({commit}, contents) {
            commit("loadContents", {
                contents: contents,
            });
            commit("setContentMetadata", {
                contents: contents
            });
        },

        loadProjects({commit}, projects) {
            commit("loadProjects", {
                projects: projects
            });
            commit("setProjectMetadata", {
                projects: projects
            })
        },

        setThemeColor({commit}, theme) {
            if (!["light", "dark"].includes(theme)) {
                return;
            }
            commit("setThemeColor", theme);
        },

        setMode({commit}, mode) {
            commit("setMode", mode);
        },
    },
});

export default store;
