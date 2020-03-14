<template>
    <h1>
        Main

        <button
                @click.stop="logOutButtonClickHandler"
        >
            Log out
        </button>
    </h1>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        methods: {
            ...mapActions({
                logOut: 'logOut',
            }),
            logOutButtonClickHandler() {
                this.logOut();
            },
        },
    }
</script>

<style scoped>
    h1 {
        margin: 0;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    }

    button {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: 0.5em;
        padding: 0;
        text-decoration: underline;
    }
</style>