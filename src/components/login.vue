<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Sign-in</div>
      <div class="card-body">
        <span class="badge badge-success" v-if="$route.params.greet">{{$route.params.greet}}</span>
        <span class="badge badge-danger" v-if="$route.params.warning">{{$route.params.warning}}</span>
        <div class="form-group">
          <input
            type="email"
            placeholder="email address"
            v-model="auth.email"
            class="form-control form-control-sm m-1"
          />
          <input
            type="password"
            placeholder="*******"
            v-model="auth.password"
            class="form-control form-control-sm m-1"
          />
          <button class="btn btn-sm btn-primary m-1 float-left" @click="try_signin">Login</button>
          <span class="float-left m-1 text-muted" v-if="logging">Please wait...</span>
          <span class="float-left m-1 text-danger" v-if="error">{{error}}</span>
        </div>
      </div>
      <router-link to="register">I dont have an account</router-link>
    </div>
  </div>
</template>

<script>
import HelloWorldVue from "./HelloWorld.vue";
export default {
  data() {
    return {
      logging: false,
      error: "",
      auth: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    try_signin() {
      this.error = "";
      this.logging = true;
      this.$axios
        .post(this.API_URL + "login", {
          email: this.auth.email,
          password: this.auth.password
        })
        .then(resp => {
          this.logging = false;
          let jwt = resp.data.jwt;
          localStorage.setItem("jwt", JSON.stringify(jwt));

          //push him to root
          this.$router.push("/");
        })
        .catch(err => {
          this.logging = false;
          try {
            if (err.response.data) {
              this.error = err.response.data.errors;
            }
          } catch (err) {
            this.error = "Please check your network connection";
          }
        });
    }
  }
};
</script>