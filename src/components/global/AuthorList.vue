<script>
    import {mapState} from "vuex";

    // Shows several authors/members (issue #24).
    //  - variant "compact": overlapping avatars + "Name, Name & N others" (content/project cards, sidebars)
    //  - variant "full":    every author as a linked landscape AuthorBlock, wrapping onto new lines (post headers)
    export default {
        name: "AuthorList",
        props: {
            authors: {
                type: Array,
                default: () => [],
            },
            variant: {
                type: String,
                default: "compact",
                validator: v => ["compact", "full"].includes(v),
            },
            // compact: how many avatars/names to show before "& N others"
            max: {
                type: Number,
                default: 3,
            },
            // compact: text shown before the names, e.g. "With"
            label: {
                type: String,
                default: "",
            },
        },
        computed: {
            ...mapState({
                members: state => state.members,
            }),
            // only slugs that have a team page (avoids crashes on typos / removed members)
            validAuthors() {
                return [...new Set(this.authors || [])].filter(slug => this.members?.[slug]);
            },
            shown() {
                return this.validAuthors.slice(0, this.max);
            },
            hiddenCount() {
                return Math.max(0, this.validAuthors.length - this.max);
            },
            namesText() {
                const names = this.shown.map(s => this.members[s].meta.name);
                if (this.hiddenCount) {
                    return `${names.join(", ")} & ${this.hiddenCount} other${this.hiddenCount > 1 ? "s" : ""}`;
                }
                if (names.length <= 1) return names.join("");
                return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
            },
            fullNames() {
                return this.validAuthors.map(s => this.members[s].meta.name).join(", ");
            },
        },
    };
</script>
<template>
    <div v-if="validAuthors.length && variant === 'compact'" class="author-list author-list--compact" :title="fullNames">
        <div class="avatars">
            <div
                v-for="(slug, i) in shown"
                :key="slug"
                class="avatar"
                :style="{ zIndex: shown.length - i }"
            >
                <img v-if="members[slug].meta.img" :src="members[slug].meta.img" :alt="members[slug].meta.name" />
                <span v-else class="initials">{{ members[slug].meta.name?.charAt(0) }}</span>
            </div>
            <div v-if="hiddenCount" class="avatar avatar--more">+{{ hiddenCount }}</div>
        </div>
        <div class="names"><span v-if="label" class="label">{{ label }}&nbsp;</span>{{ namesText }}</div>
    </div>
    <div v-else-if="validAuthors.length && variant === 'full'" class="author-list author-list--full">
        <AuthorBlock v-for="slug in validAuthors" :key="slug" :author="slug" orientation="landscape" />
    </div>
</template>
<style lang="scss">
    .author-list--compact {
        display: flex;
        align-items: center;
        gap: 0.6em;
        font-size: 0.8em;

        .avatars {
            display: flex;
            flex-shrink: 0;
        }

        .avatar {
            position: relative;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid var(--bg-color, #fdf8ec);
            background: antiquewhite;
            display: flex;
            align-items: center;
            justify-content: center;

            & + .avatar {
                margin-left: -10px;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }

            &--more {
                font-size: 0.75em;
                font-weight: 600;
                background: var(--blue-200, #dbe4ff);
            }
        }

        .names {
            font-weight: 600;
            line-height: 1.25;

            .label {
                font-weight: 400;
                opacity: 0.7;
            }
        }
    }

    .author-list--full {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75em 1.5em;
    }
</style>
<style lang="scss">
    // co-author line under the primary author's portrait in post/news sidebars
    .author-list.co-authors {
        margin: 0 0 1.5em;
        max-width: 16rem;
    }
</style>
