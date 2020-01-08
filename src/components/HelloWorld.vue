<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Select Country
        <a class="float-right" @click.prevent="logout" href="#">Logout</a>
      </div>
      <div class="card-body">
        <input
          type="text"
          name="country"
          placeholder="Search for country. . ."
          v-model="q_country"
          class="form-control"
          @keyup.enter="getCountry"
          autocomplete="off"
        />
        <small class="text-danger float-left" v-if="error">{{error}}</small>
        <small class="text-primary float-left" v-if="loading">Searching ...</small>
        <br />
        <strong>Matching Countries:</strong>
        <ul class="list-group">
          <li
            v-for="(country,index) in country_list"
            :key="index"
            class="list-group-item"
            @click="currency=country.currencies[0].code"
          >
            <span class="float-left">{{country.name}}</span>
            <!-- <router-link :to="{name:'convert',params:{currency_code:country.currencies[0].code}}">
              <span class="float-left">{{country.name}}</span>
            </router-link>-->
            <span class="float-right badge badge-danger ml-1">{{country.currencies[0].symbol}}</span>
            <span
              class="float-right badge badge-success"
              :title="country.currencies[0].name"
            >{{country.currencies[0].code}}</span>
            <br />
            <span class="float-left">
              <small>Currency : {{country.currencies[0].name}}</small>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <convert ref="convert" :currency="currency"></convert>
  </div>
</template>
<script>
import convert from "@/components/convert";
export default {
  components: { convert },
  created() {},
  data() {
    return {
      currency: "",
      country_list: "",
      q_country: "",
      loading: "",
      error: ""
    };
  },
  methods: {
    getCountry() {
      this.currency = "";
      this.country_list = "";
      this.error = "";
      this.loading = true;

      this.$axios
        .get("https://restcountries.eu/rest/v2/name/" + this.q_country)
        .then(resp => {
          this.country_list = resp.data;
          this.error = "";
          this.loading = false;
        })
        .catch(err => {
          try {
            if (err.response.data) {
              this.error = err.response.data.message;
              this.loading = false;
              return;
            }
          } catch (e) {
            this.error = "Check your network connectivity";
          }
          this.loading = false;
        });
    },
    logout() {
      localStorage.removeItem("jwt");
    }
  }
};
</script>
<style scoped>
</style>