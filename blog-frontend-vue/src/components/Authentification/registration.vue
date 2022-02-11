<script>
import CustomInput from "./customInput.vue"

export default {
    name: 'registration',
    components: { CustomInput },
    data(){
        return{
            inputs:[
                    {
                        label: "Username",
                        value: "",
                        type: "input"
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
    methods:{
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
    <h1>Registration</h1>
    <form @submit.prevent="handleSubmit">
        <CustomInput 
            v-for="(input ,i) in inputs"
            :key="i"
            v-model="input.value"
            :label="input.label"
            :type="input.type"
        />
        <input class="btn btn-primary mt-2" type=submit value="Create account">
    </form>
</template>