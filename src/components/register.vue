<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Sign-up</div>
      <div class="card-body">
        <div class="form-group">
          <input
            type="text"
            placeholder="Like ALice,Bob or John"
            v-model="$v.auth.name.$model"
            class="form-control form-control-sm m-1"
            @input="reset_errors"
          />

          <span v-if="$v.auth.name.$dirty">
            <span
              class="badge badge-danger m-1 float-right"
              v-if="!$v.auth.name.required||!$v.auth.name.minLength"
            >a valid name required</span>
          </span>
          <span
            class="badge badge-warning text-dark m-1 float-left"
            v-if="errors.name"
          >{{errors.name[0]}}</span>

          <input
            type="email"
            placeholder="email address"
            v-model="$v.auth.email.$model"
            class="form-control form-control-sm m-1"
            @input="reset_errors"
          />
          <span v-if="$v.auth.email.$dirty">
            <span
              class="badge badge-danger m-1 float-right"
              v-if="!$v.auth.email.required ||!$v.auth.email.email"
            >We need an email !</span>
          </span>
          <span
            class="badge badge-warning m-1 float-left text-dark"
            v-if="errors.email"
          >{{errors.email[0]}}</span>

          <input
            type="password"
            placeholder="*******"
            v-model="$v.auth.password.$model"
            class="form-control form-control-sm m-1"
            @input="reset_errors"
          />
          <span v-if="$v.auth.password.$dirty">
            <span
              class="badge badge-danger m-1 float-right"
              v-if="!$v.auth.password.required||!$v.auth.password.minLength"
            >We expect a bulletproof secret !</span>
          </span>

          <span
            class="badge badge-warning m-1 float-left text-dark"
            v-if="errors.password"
          >{{errors.password[0]}}</span>

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
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      creating: false,
      error: "",
      auth: {
        name: "",
        email: "",
        password: ""
      },
      errors: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  validations: {
    auth: {
      name: { required, minLength: minLength(3) },
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    reset_errors() {
      this.errors.name = "";
      this.errors.email = "";
      this.errors.password = "";
      this.error = "";
    },
    try_signup() {
      this.reset_errors;
      if (this.$v.$anyError || !this.$v.$dirty) {
        this.error = "Please fill out the form correctly";
        return;
      }
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
              let data = err.response.data;
              this.errors.name = data.errors.name || "";
              this.errors.email = data.errors.email || "";
              this.errors.password = data.errors.password || "";
            }
          } catch (err) {
            this.error = "Check your Network Connection";
          }
        });
    }
  }
};
</script>