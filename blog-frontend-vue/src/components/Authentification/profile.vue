<script>
import customInputVue from "./customInput.vue"

export default{
    name: 'Profile',
    components: {customInputVue},
    async mounted(){
        await this.onMount()
    },
    data() {
        return {
            item:{
                username: 'dump username',
                email: 'example@dump.mail',
                registration_date: 'Jan 01, 1987'
            },
            inputs:[
                {
                    label: "Username",
                    value: "",
                    type: "text"
                },
                {
                    label: "Email",
                    value: "",
                    type: "email"
                },
                {
                    label: "Password",
                    value: "",
                    type: "password"
                },
                {
                    label: "Repeat password",
                    value: "",
                    type: "password"
                },
            ],
            url:''
        }
    },
    methods: {
        async onMount(){
            
        },
        handleSubmit(){
            if (this.inputs[2].value === this.inputs[3].value){
                alert('submitted: '+this.inputs[0].value + ' '+ this.inputs[1].value+ ' '+ this.inputs[2].value+ ' '+ this.inputs[3].value)
            }
            else{
                alert('passwords are not the same')
            }
        }
    }
}
</script>



<template>
    <div>
        <h1>User Profile: {{item.username}}</h1>
        <!-- some info -->
            <h4>Username: {{item.username}}</h4>
            <h4>email: {{item.email}}</h4>
            <p>registration date: {{item.registration_date}}</p>
        <div>
            <h1>Change User Info</h1>
            <form @submit.prevent="handleSubmit">
                <customInputVue
                    v-for="(input ,i) in inputs"
                    :key="i"
                    v-model="input.value"
                    :label="input.label"
                    :type="input.type"
                />
                <input class="btn btn-primary mt-2" type=submit value="Submit changes">
            </form>
        </div>
    </div>
</template>