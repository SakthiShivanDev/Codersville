<template>
    <div>
        <div class="max-w-xl mx-auto mt-32 flex flex-col gap-8 items-center">
            <p class="text-xl mb-6 font-semibold">Login to Account</p>

            <div class="flex flex-col gap-2 w-full">
                <label for="name" class="uppercase font-semibold">email</label>
                <input v-model="user.email" type="text" class="border py-1 px-2 border-slate-300 rounded-md">
            </div>
            <!-- <div class="flex flex-col gap-2 w-full">
                <label for="name" class="uppercase font-semibold">email</label>
                <select v-model="user.role" name="" id="" class="border py-1 px-2 border-slate-300 rounded-md">
                    <option value="">SELECT ROLE</option>
                    <option value="user">USER</option>
                    <option value="agent">AGENT</option>
                </select>
            </div> -->
            <div class="flex flex-col gap-2 w-full">
                <label for="name" class="uppercase font-semibold">password</label>
                <input v-model="user.password" type="text" class="border py-1 px-2 border-slate-300 rounded-md">
            </div>
            <div @click="login()"
                class="bg-orange-500 cursor-pointer w-full text-white font-semibold py-1 text-center rounded-md">
                {{ loading ? 'loading...' : 'Login' }}
            </div>
        </div>
    </div>
</template>
<script>
import { push } from "notivue";
// import { signIn } from useAuth()

export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            loading: false
        }
    },
    methods: {
        async login() {
            if (!this.user.email) {
                push.error('invalid email')
                return
            }
            if (!this.user.password) {
                push.error('invalid password')
                return
            }
            this.loading = true
            await useAuth().signIn(this.user, { callbackUrl: '/' })
            this.loading = false
        }
    }
}
</script>