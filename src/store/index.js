import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            posts: [],
            postsById: {},
            members: [],
            membersById: {},
            contents: [],
            infoDensity: "low",
            themeColor: typeof window !== 'undefined' && localStorage.getItem("mz____") ? JSON.parse(localStorage.getItem("mz____"))["theme"] : "light",
            localStorageKey: "sb____",
            mode: "dev" //TODO: update this bb with .env from main.js
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
                postsById[post.id] = post
            })

            state.posts = sortedPosts;
            state.postsById = postsById
        },

        loadMembers(state, {members}) {
            let membersById = {};

            members.forEach(member => {
                membersById[member.id] = member
            });

            state.members = [...members];
            state.membersById = membersById
            console.log('STATE', state);
        },

        loadContents(state, {contents}) {
            let sortedContents = [...contents];


            let recentDate = arr => new Date(arr[arr.length - 1]);
            sortedContents = sortedContents.sort((a, b) => {
                return recentDate(b.meta.date) - recentDate(a.meta.date);
            });

            state.contents = sortedContents; // might want to add content by tag
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
        }
    },

    actions: {
        loadPosts({commit}, posts) {
            commit("loadPosts", {
                posts: posts,
            });
        },

        loadMembers({commit}, members) {
            commit("loadMembers", {
                members: members
            });
        },

        loadContents({commit}, contents) {
            commit("loadContents", {
                contents: contents,
            });
        },

        setThemeColor({commit}, theme) {
            if (!["light", "dark"].includes(theme)) {
                return;
            }
            commit("setThemeColor", theme);
        },

        setMode({commit}, mode) {
            commit("setMode", mode)
        },
    },
});

export default store;
