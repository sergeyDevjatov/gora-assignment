<template>
    <div id="app">
        <header>
            <router-view
                    name="header"
            >
            </router-view>
        </header>
        <access-controller>
            <router-view/>
        </access-controller>
    </div>
</template>

<script>
    import AccessController from "./components/AccessController";
    export default {
        components: {AccessController}
    }
</script>

<style>
    html, body, #app {
        width: 100%;
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: Arial, sans-serif;
    }
</style>

<style scoped>
    header {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background: #222222;
        padding: 15px 25px;
        color: #ffffff;
    }
</style>