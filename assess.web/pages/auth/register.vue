<template>
    <div>
        <div class="max-w-xl mx-auto mt-32 flex flex-col gap-8 items-center">
            <p class="text-xl mb-6 font-semibold">Register Account</p>
            <div class="flex flex-col gap-2 w-full">
                <label for="name" class="uppercase font-semibold">Name</label>
                <input v-model="user.name" type="text" class="border py-1 px-2 border-slate-300 rounded-md">
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label for="name" class="uppercase font-semibold">email</label>
                <input v-model="user.email" type="text" class="border py-1 px-2 border-slate-300 rounded-md">
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label for="name" class="uppercase font-semibold">email</label>
                <select v-model="user.role" name="" id="" class="border py-1 px-2 border-slate-300 rounded-md">
                    <option value="">SELECT ROLE</option>
                    <option value="user">USER</option>
                    <option value="agent">AGENT</option>
                </select>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label for="name" class="uppercase font-semibold">password</label>
                <input v-model="user.password" type="text" class="border py-1 px-2 border-slate-300 rounded-md">
            </div>
            <div @click="register()"
                class="bg-orange-500 cursor-pointer w-full text-white font-semibold py-1 text-center rounded-md">
                {{ loading ? 'loading...' : 'Register' }}
            </div>
        </div>
    </div>
</template>
<script>
import { push } from "notivue";
export default {
    data() {
        return {
            user: {
                email: "",
                name: "",
                password: "",
                role: ""
            },
            loading: false
        }
    },
    methods: {
       async register() {
            if (!this.user.name) {
                push.error('invalid name')
                return
            }
            if (!this.user.email) {
                push.error('invalid email')
                return
            }
            if (!this.user.role) {
                push.error('invalid role')
                return
            }
            if (!this.user.password) {
                push.error('invalid password')
                return
            }
            this.loading=true
            const response =await this.$apiFetch('/auth/register', {
                method: "POST",
                body: this.user
            })
            console.log(response)
            if (response.success) {
                push.success('registered successfully')
                useRouter().push('/auth/login')
            }
            else {
                push.error(response.message)
            }
            this.loading=false
        }
    }
}
</script>