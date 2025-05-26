<template>
   <div class="p-4">
    <div>
        <div class="flex justify-between">
            <div>{{ user.name }}({{ user.role }})</div>
            <div class="bg-orange-500 rounded-md w-fit px-4 py-1 text-white">
                Add Ticket
            </div>
        </div>
        <div>
            <div v-for="ticket in tickets">
                {{ tickets }}
            </div>
        </div>
    </div>
    <div>
        <div class="bg-black/70 inset-0 h-screen">
            <div>

            </div>
        </div>
    </div>
   </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: 'sidebase-auth'
})
</script>
<script lang="ts">

export default{
    data(){
        return {
            user:{
                name:"",
                role:""
            },
            tickets:[],
            model:true,
        }
    },
    mounted(){
        this.user=useAuth().data.value.user
        this.getTickets()
    },
    methods:{
        async getTickets(){
            const response=await this.$apiFetch('/tickets')
            this.tickets=response.tickets??[]
        },
        openModel(){
            this.model=true
        }
    }
}
</script>