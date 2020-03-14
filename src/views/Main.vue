<template>
    <div
            class="main"
    >
        <div
                class="main-content"
        >
            <main-content
            />
        </div>
    </div>
</template>

<script>
    import MainContent from '@/components/MainContent';

    export default {
        components: {
            MainContent,
        },
    }
</script>

<style scoped>
    h1 {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }

    button {
        margin-left: auto;
    }

    .main {
        padding: 35px 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .main-content {
        max-width: 450px;

        width: 80%;
    }
</style>