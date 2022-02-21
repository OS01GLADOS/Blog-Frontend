<script>
export default{
    name: "deleteBlogVue",
    methods:{
        getCookie(cName){
            const name = cName + "=";
            const cDecoded = decodeURIComponent(document.cookie); 
            const cArr = cDecoded.split('; ');
            let res;
            cArr.forEach(val => {
                if (val.indexOf(name) === 0) res = val.substring(name.length);
                    })
                return res
        },
        async handleSubmit(){
            const token = this.getCookie('VueBlog')
            const requestOptions = {
                    method: "DELETE",
                    headers: {
                        'Authorization':' Bearer '+ token
                        },
            }
            fetch("http://127.0.0.1:8000/api/posts/"+this.$route.params.id+"/", requestOptions)
            .then(async response =>{
                if (response.status != 204){
                    const error = ('there was an error while deleting') || response.status
                    return Promise.reject(error)}
                    this.$router.push({name: 'Home'})
                })
                .catch(error => {
                    this.errorMessage = error
                    console.error('There was an errror!', error)
                })
        },
    }
}
</script>

<template>
    <h1>Are you sure?</h1>
    <p>delete blog {{$route.params.id}} </p>
    <form @submit.prevent="handleSubmit"> 
        <input class="btn btn-primary mt-2" type=submit value="Yes, delete blog ">
        <input class="btn btn-primary mt-2" type=dismiss value="back">
    </form>
</template>