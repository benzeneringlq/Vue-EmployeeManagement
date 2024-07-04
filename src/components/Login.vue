<script setup>
import { ref, reactive } from "vue";
import { useGlobalData } from "../global.js";
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router'
const globaldata = useGlobalData()
const toast = useToast();

const form = ref(null)
const registerBtn = ref(null)
const loginBtn = ref(null)
const isRegister = ref(false),
    user = reactive({
        username: '',
        password: '',
        email: '',
    })
const nameRules = ([
    v => !!v || '请输入用户名',
    v => (v && v.length <= 12) || '长度应该小于12',
])
const passwordRules = ([
    v => !!v || '请输入密码',
    v => (v && v.length <= 16) || '长度应该小于16',
])
const emailRules = ref([
    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '请输入有效邮箱'
])
const router = useRouter()

async function login() {
    const { valid } = await form.value.validate()

    if (!valid) {
        toast.error("表单不合法")
        return
    }
    let result = await globaldata.login(user)
    if (result == "success") {
        toast.success("登陆成功")
        router.push('/Entry');
    }
    else {
        toast.error("登陆失败:" + result)
    }
}
async function register() {
    const { valid } = await form.value.validate()

    if (!valid) {
        toast.error("表单不合法")
        return
    }
    let result = await globaldata.register(user)
    if (result == "success") {
        toast.success("注册成功")
    }
    else {
        toast.error("注册失败")
    }
}
function submit() {
    if (!isRegister.value) {
        loginBtn.click()
    }
    else {
        register.click()
    }
}
function reset() {
    console.log(form)
    form.value.reset()
}

</script>
<template>
    <v-card width="1000" height="600">
        <v-sheet class="mx-auto v-flex fill-height" width="300">
            <v-form ref="form" @submit.prevent="submit">
                <v-text-field autofocus v-model="user.username" :rules="nameRules" label="用户名" required></v-text-field>

                <v-text-field v-model="user.password" :rules="passwordRules" label="密码" required
                    type="password"></v-text-field>
                <v-text-field v-if="isRegister" v-model="user.email" :rules="emailRules" label="电子邮箱"
                    required></v-text-field>

                <v-switch v-model="isRegister" color="primary" label="注册" value=true hide-details></v-switch>
                <div class="d-flex flex-column">
                    <v-btn autofocus v-if="!isRegister" ref="loginBtn" class="mt-4" color="#21a675" block @click="login"
                        type="submit">
                        登录
                    </v-btn>

                    <v-btn v-if="isRegister" ref="registerBtn" class="mt-4" color="#f0ada0" block @click="register"
                        type="submit">
                        注册
                    </v-btn>

                    <v-btn class="mt-4" color="warning" block @click="reset">
                        重置表单
                    </v-btn>
                </div>
            </v-form>
        </v-sheet>
    </v-card>
</template>