<template>
  <div class="container m-1" v-if="currency">
    <div class="card">
      <div class="card-header">
        <h1 class="text-success">{{currency}}</h1>Converting to
        <span class="text-success">INR</span>
      </div>
      <div class="card-body">
        <span class v-if="loading">Fetching currency rate...</span>
        <span v-if="!loading">{{info}}</span>
        <span class="text-danger" v-if="error">
          {{error}}
          <br />
          <button class="btn btn-sm btn-primary" @click="convert">Retry</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currency"],
  data() {
    return {
      rate: 0,
      info: "",
      loading: false,
      error: ""
    };
  },
  methods: {
    convert() {
      this.loading = true;
      this.error = "";
      this.info = "";
      this.$axios
        .post(
          this.API_URL + "convert",
          { from: this.currency },
          {
            headers: {
              authorization: this.jwt
            }
          }
        )
        .then(resp => {
          this.rate = resp.data.rate[this.currency + "_INR"];
          this.info = `1 ${this.currency} equals ${this.rate} INR`;
          this.loading = false;
          this.error = "";
        })
        .catch(err => {
          this.rate = "";
          this.loading = false;
          this.error = "Exchange rate cant be fetched";
          this.info = "";
        });
    }
  },
  watch: {
    currency: function(newval, oldval) {
      this.convert();
    }
  }
};
</script>