import Vue from 'vue';
import Vuex from 'vuex';

import PBKDF2 from 'crypto-js/pbkdf2';
import WordArray from 'crypto-js/lib-typedarrays';

import Cookies from 'js-cookie';

import rightCredentials from './rightCredentials';

Vue.use(Vuex);

const SAVED_EMAIL_STORAGE_KEY = 'gora-assignment.saved_email';

function hashCredentials(data) {
    return PBKDF2(data, 'salt_salt_salt', {
        keySize: 128 / 32,
    }).toString();
}

export default new Vuex.Store({
    state: {
        authToken: Cookies.get('auth_token') ?? null,
        authenticationError: null,
        savedEmail: sessionStorage.getItem(SAVED_EMAIL_STORAGE_KEY) ?? null,
    },
    actions: {
        authorize({ dispatch, commit }, {
            email,
            password,
        }) {
            const isRightCredentials = email === rightCredentials.email &&
                hashCredentials(password) === rightCredentials.password;

            if(!isRightCredentials) {
                commit('setAuthenticationError', {
                    error: 'wrong-credentials',
                });
                return;
            }

            commit('setAuthenticationError', {
                error: null,
            });

            const authToken = hashCredentials(WordArray.random(128 / 8));

            dispatch('updateAuthToken', {
                authToken,
            });
        },
        updateAuthToken({ commit }, { authToken }) {
            if(!authToken) {
                Cookies.remove('auth_token');
            } else {
                Cookies.set('auth_token', authToken, {
                    expires: 28,
                    path: '',
                });
            }

            commit('setAuthToken', {
                authToken: authToken || null,
            });
        },
        logOut({ dispatch }) {
            dispatch('updateAuthToken', {
                authToken: null,
            });
        },
        updateSavedEmail({ commit }, {
            email,
        }) {
            if(!email) {
                sessionStorage.removeItem(SAVED_EMAIL_STORAGE_KEY);
            } else {
                sessionStorage.setItem(SAVED_EMAIL_STORAGE_KEY, email);
            }
            commit('setSavedEmail', {
                email: email || null,
            });
        },
    },
    mutations: {
        setAuthToken(state, {
            authToken,
        }) {
            state.authToken = authToken;
        },
        setAuthenticationError(state, {
            error,
        }) {
            state.authenticationError = error;
        },
        setSavedEmail(state, {
            email,
        }) {
            state.savedEmail = email;
        }
    },
    getters: {
        isAuthorized(state) {
            return !!state.authToken;
        },
        authenticationError(state) {
            return state.authenticationError;
        },
        savedEmail(state) {
            return state.savedEmail;
        },
    },
});