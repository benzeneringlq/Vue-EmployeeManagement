<template>
    <v-sheet class="mx-auto" width="300">
        <v-form ref="form" @submit.prevent="submit">
            <v-text-field autofocus v-model="username" :rules="nameRules" label="用户名" required></v-text-field>

            <v-text-field v-model="password" :rules="passwordRules" label="密码" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="电子邮箱" required></v-text-field>

            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']"
                label="Option"></v-checkbox>

            <div class="d-flex flex-column">
                <v-btn ref="loginButton" class="mt-4" color="#21a675" block @click="login" type="submit">
                    登录
                </v-btn>

                <v-btn class="mt-4" color="#f0ada0" block @click="register">
                    注册
                </v-btn>

                <v-btn class="mt-4" color="warning" block @click="reset">
                    重置表单
                </v-btn>
            </div>
        </v-form>
    </v-sheet>
</template>

<script>
import axios from 'axios'
export default {
    name: "LoginView",
    data: () => ({
        username: '',
        password: '',
        email: '',
        nameRules: [
            v => !!v || '请输入用户名',
            v => (v && v.length <= 12) || '长度应该小于12',
        ],
        passwordRules: [
            v => !!v || '请输入密码',
            v => (v && v.length <= 16) || '长度应该小于16',
        ],
        checkbox: false,
        emailRules: [
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '请输入有效邮箱'
        ]
    }),


    methods: {
        submit() {
            // this.login();
            this.$refs.loginButton.$el.click();
        },
        login() {
            let username = this.username;
            let password = this.password;
            if (username == "admin") {
                this.$router.push('/admin');
            }
            else {
                this.$router.push('/home');
            }
        },
        async register() {
            let username = this.username;
            // let password = this.password;
            let password = "*********";
            let email = this.email;
            axios
                .post(
                    "/api/user/addUser",
                    {
                        username,
                        password,
                        email
                    },
                    {}
                )
                .then((response) => {
                    console.log(response);
                });
        },

        reset() {
            this.$refs.form.reset()
        },
    }
}
</script>