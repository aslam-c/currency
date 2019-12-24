<template>
    <div class="container">
        <div class="card">
            <div class="card-header">Select Country</div>
            <div class="card-body">
                <input type="text" name="country" placeholder="Search for country. . ." v-model='q_country' class="form-control" @keyup.enter='getCountry' autocomplete="off">
                <small class="text-danger float-left" v-if='error'>{{error}}</small>
                <br><strong>Matching Countries:</strong>
                <ul class="list-group">
                    <li v-for='(country,index) in country_list' :key='index' class="list-group-item">
                        <router-link :to="{name:'convert',params:{currency_code:country.currencies[0].code}}"><span class="float-left">{{country.name}}</span></router-link>
                        <span class="float-right badge badge-danger ml-1">{{country.currencies[0].symbol}}</span>
                        <span class="float-right badge badge-success" :title='country.currencies[0].name'>{{country.currencies[0].code}}</span> 
                        
                    </li>    
                </ul>  
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return {country_list:''
        ,q_country:'',
        error:''
        }
    },
    methods:{
        getCountry(){
            this.country_list=''
            this.error=''

            this.$axios.get('https://restcountries.eu/rest/v2/name/'+this.q_country)
            .then(resp=>{this.country_list=resp.data
                this.error=''
            })
            .catch(err=>{
                try{
                if(err.response.data){
                    this.error=err.response.data.message
                    
                    return;
                }
                }
                catch(e){
                    this.error='Check your network connectivity'
                }
            })    
       }
    }

    
}
</script>
<style scoped>

</style>