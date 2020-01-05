<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Sign-up</div>
      <div class="card-body">
        <div class="form-group">
          <input
            type="text"
            placeholder="Like ALice,Bob or John"
            v-model="auth.name"
            class="form-control form-control-sm m-1"
          />
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
          <button class="btn btn-sm btn-primary m-1 float-left" @click="try_signup">Create</button>
          <span class="float-left m-1 text-muted" v-if="creating">Please wait...</span>
          <span class="float-left m-1 text-danger" v-if="error">{{error}}</span>
        </div>
      </div>
      <router-link to="login">I already have an account</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creating: false,
      error: "",
      auth: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    try_signup() {
      this.error = "";
      this.creating = true;
      this.$axios
        .post(this.API_URL + "register", {
          name: this.auth.name,
          email: this.auth.email,
          password: this.auth.password
        })
        .then(resp => {
          this.creating = false;
          this.$router.push({
            name: "login",
            params: {
              greet: "Enter your Username and password"
            }
          });
        })
        .catch(err => {
          this.creating = false;
          try {
            if (err.response.data) {
              this.error = err.response.data.message;
            }
          } catch (err) {
            this.error = "Check your Network Connection";
          }
        });
    }
  }
};
</script>