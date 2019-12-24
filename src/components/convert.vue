<template>
<div class="container">
    <div class="card">  
    <div class="card-header">Converting from 
        <span class="text-success">{{this.$route.params.currency_code}}</span>
        to<span class="text-success"> INR</span> 
    </div>      
    <div class='card-body'>
        <span class="" v-if='loading'> Fetching current rate...</span>
        <span v-else>1 {{src_currency}} equals
        <h2>{{rate}} INR</h2></span>       
        
    </div>
    </div>
</div>
</template>

<script>
export default {
data(){
        return {src_currency:this.$route.params.currency_code,
        rate:0,
        loading:false
        }

},
created(){
    this.loading=true
    this.$axios.get('https://free.currconv.com/api/v7/convert?q='+this.src_currency+'_INR&apiKey=6a14acdb221dfbd55fe5&compact=ultra')
    .then(resp=>{this.rate=resp.data[this.src_currency+'_INR']
    this.loading=false
        
    })
   .catch(err=>{this.rate=''
    this.loading=false
   })
}    
}
</script>