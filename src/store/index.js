import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            posts: [],
            postsById: {},
            members: {},
            contents: [],
            projects: [],
            contentMetadata: {
                types: [],
                tags: []
            },
            projectMetadata: {
                tags: [],
                methods: []
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
                image: `https://disasterdata.engin.umich.edu/images/metas/og-image-aidd-default.png`,
                twitterImage: ``,
                keywords: `university of michigan, aidd labs, Sabine Loos, Sabine Loos, civil, environmental, engineering, disaster, relief, data, data visualization`,
                twitterUrl: "https://twitter.com/sab_loos",
                githubUrl: "https://github.com/sabineloos",
                researchGateUrl: "https://www.researchgate.net/profile/Sabine-Loos",
                googleScholarUrl:
                    "https://scholar.google.com/citations?user=WEt_N8AAAAAJ&hl=en",
                michCivilUrl: "https://cee.engin.umich.edu",
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

        loadContents(state, {contents}) {
            let sortedContents = [...contents];

            let recentDate = arr => new Date(arr[arr.length - 1]);
            sortedContents = sortedContents.sort((a, b) => {
                return recentDate(b.meta.date) - recentDate(a.meta.date);
            });

            state.contents = sortedContents; // might want to add content by tag
        },

        setContentMetadata(state, {contents}) {
            const contentMetadata = contents.reduce((acc, content) => {
                const { tags, type } = content.meta;
                const concatenatedTags = acc.tags.concat(tags);

                !acc.types.includes(type) && acc.types.push(type);
                const uniqueTags = concatenatedTags.filter((tag, idx) => concatenatedTags.indexOf(tag) === idx);
                
                acc.tags = uniqueTags;

                return acc;
            }, { types: [], tags: [] });

            state.contentMetadata = contentMetadata;
        },

        loadProjects(state, {projects}) {
            state.projects = projects;
        },

        setProjectMetadata(state, {projects}) {
            const projectMetadata = projects.reduce((acc, project) => {
                const { methods, tags } = project.meta;
                const concatenatedMethods = acc.methods.concat(methods);
                const concatenatedTags = acc.tags.concat(tags);

                const uniqueMethods = concatenatedMethods.filter((method, idx) => concatenatedMethods.indexOf(method) === idx);
                const uniqueTags = concatenatedTags.filter((tag, idx) => concatenatedTags.indexOf(tag) === idx);

                acc.methods = uniqueMethods;
                acc.tags = uniqueTags;

                return acc;
            }, { tags: [], methods: [] });

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
