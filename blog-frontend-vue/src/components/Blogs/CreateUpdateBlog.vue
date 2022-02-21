<script>
import customInputVue from "../Authentification/customInput.vue"

export default {
    name: 'registration',
    components: { customInputVue },
    data(){
        return{
            inputs:[
                {
                    label: "Title",
                    value: "",
                    type: "text"
                },
                {
                    label: "Content",
                    value: "",
                    type: "textarea"
                },
            ],
            submit_label:'',
            url: '',
            method: ''
        }
    },
    async mounted(){
        await this.set_submit_value()
    },
    methods:{
        async onMount(){
            const token = this.getCookie('VueBlog')
            const requestOptions = {
                method: "GET",
                headers: {
                        'Authorization':' Bearer '+ token
                        },
            }
            fetch("http://127.0.0.1:8000/api/posts/"+ this.$route.params.id, requestOptions)
                .then(async response => {
                    const data = await response.json()
                    if (!response.ok){
                            const error = (data && data.message) || response.status
                            return Promise.reject(error)
                        }
                    this.inputs[0].value = data.title
                    this.inputs[1].value = data.content
                    console.log(this.item)
                })
                .catch(error => {
                    this.errorMessage = error
                    console.error('There was an errror!', error)
                })
        },
        async set_submit_value(){
            if (this.$route.query.new === 'True'){
                this.submit_label = "Create blog"
                this.url = "http://127.0.0.1:8000/api/posts/"
                this.method = "POST"
            }
            else{
                this.submit_label = "Update blog"
                this.url = "http://127.0.0.1:8000/api/posts/"+this.$route.params.id+ "/"
                this.onMount()
                this.method = "PUT"
            }
        },
        async handleSubmit(){
            let form = new FormData()
            form.append('title', this.inputs[0].value)
            form.append('content', this.inputs[1].value)
            const token = this.getCookie('VueBlog')
            const requestOptions = {
                    method: this.method,
                    headers: {
                        'Authorization':' Bearer '+ token
                        },
                    body: form
            }
            fetch(this.url, requestOptions)
            .then(async response =>{
                const data = await response.json()
                if (!response.ok){
                    const error = (data && data.message) || response.status
                    return Promise.reject(error)}
                    this.$router.push({name: 'Home'})
                })
                .catch(error => {
                    this.errorMessage = error
                    console.error('There was an errror!', error)
                })
        },
        getCookie(cName){
            const name = cName + "=";
            const cDecoded = decodeURIComponent(document.cookie); 
            const cArr = cDecoded.split('; ');
            let res;
            cArr.forEach(val => {
                if (val.indexOf(name) === 0) res = val.substring(name.length);
                    })
                return res
        }
        
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <customInputVue
            v-for="(input ,i) in inputs"
            :key="i"
            v-model="input.value"
            :label="input.label"
            :type="input.type"
        />
        <input class="btn btn-primary mt-2" type=submit :value="submit_label">
    </form>
</template>