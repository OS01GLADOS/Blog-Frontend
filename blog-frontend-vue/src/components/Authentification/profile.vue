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
            url:'http://127.0.0.1:8000/api/profiles/'
        }
    },
    methods: {
        async onMount(){
            const token = this.getCookie('VueBlog')
            const requestOptions = {
                method: "GET",
                 headers: {
                    'Authentication': 'beaver '+token
                 }
            }
            fetch(this.url, requestOptions)
            .then(async response =>{
                const data = await response.json()
                if (!response.ok){
                    const error = (data && data.message) || response.status
                    return Promise.reject(error)}
                console.log( data.results);
            })
            .catch(error => {
                this.errorMessage = error
                console.error('There was an errror!', error)
                })
        },
        //function from https://www.tabnine.com/academy/javascript/how-to-get-cookies/
         getCookie(cName) {
            const name = cName + "=";
            const cDecoded = decodeURIComponent(document.cookie); //to be careful
            const cArr = cDecoded.split('; ');
            let res;
            cArr.forEach(val => {
                if (val.indexOf(name) === 0) res = val.substring(name.length);
            })
            return res
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