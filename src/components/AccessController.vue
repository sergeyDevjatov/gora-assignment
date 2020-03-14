<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters({
                isAuthorized: 'isAuthorized',
            }),
        },
        watch: {
            isAuthorized: {
                immediate: true,
                handler(isAuthorized, lastIsAuthorized) {
                    if(isAuthorized === lastIsAuthorized) {
                        return;
                    }
                    this.checkAccessAndRedirectIfNeedTo(isAuthorized)
                },
            },
            $route() {
                this.checkAccessAndRedirectIfNeedTo();
            },
        },
        methods: {
            async checkAccessAndRedirectIfNeedTo(isAuthorized) {
                try {
                    await this.$router.push({
                        name: (isAuthorized ?? this.isAuthorized)
                            ? 'main'
                            : 'login',
                    });
                } catch (error) {

                }
            },
        },
        render() {
            return this.$slots.default && this.$slots.default[0];
        },
    };
</script>