<template>
  <div class="container">
    <form class="md-layout" @submit.prevent="validateUser">

      <section class="card">
        <div class="double_item">
          <md-field :class="getValidationClass('firstName')">
            <label for="first-name">First Name</label>
            <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName"
                      :disabled="sending"/>
            <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
            <span class="md-error" v-else-if="!$v.form.firstName.minLength">Invalid first name</span>
          </md-field>


          <md-field :class="getValidationClass('lastName')">
            <label for="last-name">Last Name</label>
            <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName"
                      :disabled="sending"/>
            <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
            <span class="md-error" v-else-if="!$v.form.lastName.minLength">Invalid last name</span>
          </md-field>
        </div>

        <div class="double_item">
          <md-field :class="getValidationClass('gender')">
            <label>Gender</label>
            <md-select name="gender" v-model="form.gender" md-dense :disabled="sending">
              <md-option value="M">Male</md-option>
              <md-option value="F">Female</md-option>
            </md-select>
            <span class="md-error">The gender is required</span>
          </md-field>

          <md-field :class="getValidationClass('age')">
            <label for="age">Age</label>
            <md-input type="number" id="age" name="age" autocomplete="age" v-model="form.age" :disabled="sending"/>
            <span class="md-error" v-if="!$v.form.age.required">The age is required</span>
            <span class="md-error" v-else-if="!$v.form.age.maxlength">Invalid age</span>
          </md-field>
        </div>

        <md-field :class="getValidationClass('nickName')">
          <label for="nick-name">Nick name</label>
          <md-input name="nick-name" id="nick-name" autocomplete="nick-name" v-model="form.nickName"
                    :disabled="sending"/>
          <span class="md-error" v-if="!$v.form.nickName.required">Nick name is required</span>
          <span class="md-error" v-else-if="!$v.form.nickName.minLength">Invalid nick name</span>
        </md-field>

        <md-field :class="getValidationClass('email')">
          <label for="email">Email</label>
          <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"
                    :disabled="sending"/>
          <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
          <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
        </md-field>

        <md-field :class="getValidationClass('password')">
            <label>Password toggle</label>
            <md-input v-model="form.password" type="password" autocomplete="password" ></md-input>
          <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
          <span class="md-error" v-else-if="!$v.form.password.minLength">Invalid password</span>
        </md-field>

        <md-progress-bar md-mode="indeterminate" v-if="sending"/>

        <md-button type="submit" class="md-accent" :disabled="sending">Create user</md-button>

        <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
      </section>

    </form>
  </div>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'Registration',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        email: null,
        nickName: null,
        password: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        age: {
          required,
          maxLength: maxLength(10)
        },
        gender: {
          required
        },
        email: {
          required,
          email
        },
        nickName: {
          required,
          minLength: minLength(3)
        },
        password: {
          required,
          minLength: minLength(6)
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
        this.form.firstName = null;
        this.form.lastName = null;
        this.form.age = null;
        this.form.gender = null;
        this.form.email = null;
        this.form.nickName = null;
      },
      saveUser() {
        this.sending = true;
        this.userSaved = true;

        window.setTimeout(() => {
          this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
          this.userSaved = false;
          this.sending = false;
          this.clearForm()
        }, 1500)
      },
      validateUser() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.saveUser()
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

  .double_item {
    display: flex;
    flex-direction: row;
  }

  .double_item div:first-child {
    margin-right: 10px;
  }

  .double_item div:last-child {
    width: 50%;
    margin-left: 10px;
  }

  .card {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    -webkit-box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
    -moz-box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
  }
</style>
