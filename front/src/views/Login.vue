<template>
  <div class="container">
    <form class="md-layout" @submit.prevent="validateUser">

      <md-field md-clearable :class="getValidationClass('email')">
        <label>Email</label>
        <md-input v-model="form.email"></md-input>
        <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
      </md-field>

      <md-field :class="getValidationClass('password')">
        <label>Password</label>
        <md-input v-model="form.password" type="password" autocomplete="password"></md-input>
        <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
      </md-field>

      <md-button type="submit"  class="md-raised md-accent login_btn" :disabled="sending">sign in</md-button>

    </form>
  </div>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {
    required,
    email,
  } from 'vuelidate/lib/validators'

  export default {
    name: 'Login',
    mixins: [validationMixin],
    data: () => ({
      form: {
        email: null,
        password: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        password: {
          required
        },
        email: {
          required,
          email
        }
      }
    },
    methods: {
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName];

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm() {
        this.$v.$reset();
        this.form.password = null;
        this.form.email = null;
      },
      login() {
        this.sending = true;

        window.setTimeout(() => {
          this.clearForm();
          this.sending = false;
        }, 1500)
      },

      validateUser() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.login();
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    margin: 30px auto;
    width: 90%;
  }

  .login_btn {
    margin: 0 auto;
  }

</style>
