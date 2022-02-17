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
        async set_submit_value(){
            if (this.$route.query.newBlog){
                this.submit_label = "Create blog"
                this.url = "http://127.0.0.1:8000/api/posts/"
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