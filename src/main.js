import {ViteSSG} from "vite-ssg";
import {createRouter, createWebHistory} from "vue-router";
import {createHead} from "@vueuse/head";
import {v4 as uuidv4} from "uuid";
import App from "./App.vue";
import routes from "~pages";
import store from "./store/";
import utils from "./scripts/utils.js";
import Post from "@/pages/Post.vue";
import Member from "@/pages/Member.vue";
import Project from '@/pages/Project.vue';

export const createApp = ViteSSG(
    // the root component
    App,
    // vue-router options
    {routes},
    // function to have custom setups
    ({app, router, routes, isClient, initialState}) => {
        app.component("Post", Post);
        app.component("Member", Member);
        app.component("Project", Project);

        app.mixin({
            methods: utils.filters,
        });

        const layouts = import.meta.globEager("./layouts/**/*.vue");
        for (const path in layouts) {
            let componentConfig = layouts[path];
            const componentName = componentConfig.default.name;
            app.component(componentName, componentConfig.default || componentConfig);
        }

        const components = import.meta.globEager("./components/**/*.vue");
        for (const component in components) {
            let componentConfig = components[component];
            const componentName = componentConfig.default.name;
            app.component(componentName, componentConfig.default || componentConfig);
            // automatically register all components
        }

        let mode = import.meta.env.VITE_STAGE;


        let members = {};
        let markdownMembers = import.meta.globEager("./pages/team/**/*.md");
        for (const member in markdownMembers) {
            let componentConfig = markdownMembers[member];

            let metaProps = {
                id: uuidv4(),
                path: `/team/${componentConfig.slug}`,
                meta: {
                    ...componentConfig,
                },
            };

            members[metaProps.meta.slug] = metaProps;
        }

        let partners = {};
        let markdownPartners = import.meta.globEager("./pages/partners/**/*.md");
        for (const partner in markdownPartners) {
            let metaProps = {
                id: uuidv4(),
                meta: {
                    ...markdownPartners[partner],
                },
            };

            partners[metaProps.meta.slug] = metaProps;
        }

        let mdContentRoutes = [];
        let markdownContents = import.meta.globEager("./pages/content/**/index.md");
        for (const content in markdownContents) {
            let componentConfig = markdownContents[content];

            let metaProps = {
                id: uuidv4(),
                path: `/content/${componentConfig.slug}`,
                meta: {
                    ...componentConfig,
                },
            };

            mdContentRoutes.push(metaProps);
        }

        let mdProjectRoutes = [];
        let markdownProjects = import.meta.globEager("./pages/projects/**/index.md");
        for (const project in markdownProjects) {
            let componentConfig = markdownProjects[project];

            let metaProps = {
                id: uuidv4(),
                path: `/projects/${componentConfig.slug}`,
                meta: {
                    ...componentConfig,
                },
            };

            mdProjectRoutes.push(metaProps);
        }

        app.use(store);

        if (import.meta.env.SSR) {
            initialState.store = store.state;
        } else {
            if (!initialState.store) {
                initialState.store = store.state;
            } else {
                store.replaceState(initialState.store);
            }
        }

        router.beforeEach((to, from, next) => {
            // perform the (user-implemented) store action to fill the store's state
            if (!store.getters.ready) {
                store.dispatch("loadMembers", members);
                store.dispatch("loadPartners", partners);
                store.dispatch("loadContents", mdContentRoutes);
                store.dispatch("loadProjects", mdProjectRoutes)
                store.dispatch("setMode", mode);
            }

            next();
        });
    },
    {
        // transformState(state) {
        //     console.log("CAT", import.meta.env.SSR, state)
        //     return import.meta.env.SSR ? devalue(state) : state;
        // },
    }
);
