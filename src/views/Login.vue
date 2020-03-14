<template>
    <form
            @submit.prevent="submitHandler"
            action="#"
    >
        <div
                class="fields"
        >
            <label>
                E-mail:
                <input
                        @invalid="emailValidityChecked = true"
                        v-model="email"
                        ref="emailInput"
                        type="email"
                        autocomplete="username"
                        name="email"
                        required
                        :pattern="emailPattern.source"
                        :data-invalid="!!emailError"
                        :data-tried="triedToLogin"
                        :data-validity-checked="emailValidityChecked"
                />
            </label>
            <label>
                Password:
                <input
                        v-model="password"
                        type="password"
                        autocomplete="current-password"
                        name="password"
                />
            </label>
            <p
                    v-if="authenticationError"
                    class="error"
            >
                {{authenticationError}}
            </p>

            <button>
                Log in
            </button>
        </div>
    </form>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        data() {
            return {
                emailPattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                email: '',
                password: '',
                emailError: null,
                triedToLogin: false,
                emailValidityChecked: false,
            };
        },
        watch: {
            email: {
                immediate: true,
                async handler() {
                    this.emailError = null;

                    await this.$nextTick();

                    if (!this.$refs.emailInput.validity || this.$refs.emailInput.validity.valid) {
                        this.checkEmailValidity();
                    }
                },
            },
        },
        mounted() {
            window.addEventListener('beforeunload', this.beforeWindowUnloadHandler);

            this.email = this.savedEmail;
        },
        computed: {
            ...mapGetters({
                savedEmail: 'savedEmail',
                authenticationError: 'authenticationError',
            }),
        },
        methods: {
            ...mapActions({
                authorize: 'authorize',
                updateSavedEmail: 'updateSavedEmail',
            }),
            submitHandler() {
                this.triedToLogin = true;

                if(this.emailError) {
                    return;
                }

                this.authorize({
                    email: this.email,
                    password: this.password,
                });
                if(!this.authenticationError) {
                    this.updateSavedEmail({
                        email: this.email,
                    });
                }
            },
            beforeWindowUnloadHandler() {
                this.updateSavedEmail({
                    email: this.email,
                });
            },
            checkEmailValidity() {
                console.log(this.emailPattern.test(this.email))
                this.emailError = this.emailPattern.test(this.email)
                    ? null
                    : 'Invalid email';
            },
        },
    }
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;

        align-items: center;

        padding: 35px 25px;
    }

    .fields {
        display: flex;
        flex-direction: column;
    }

    label {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    }

    input {
        margin-left: 30px;

        background: #ffffff;

        color: #222222;

        padding: 5px;
        border: 1px solid #aaaaaa;
        border-radius: 5px;

        box-shadow: none;
        outline: none;
    }

    input:invalid[data-validity-checked], input[data-invalid][data-tried] {
        border: 1px solid rgba(255, 0, 0, 0.5);
        box-shadow: 0 0 2px 0 red;
    }

    .error {
        color: darkred;

        align-self: center;
    }

    button {
        cursor: pointer;
        padding: 5px 25px;

        border: 1px solid royalblue;
        background: cornflowerblue;
        color: #ffffff;

        border-radius: 5px;

        font-size: 16px;
        align-self: flex-end;
    }

    label + label {
        margin-top: 10px;
    }

    label + button {
        margin-top: 25px;
    }
</style>