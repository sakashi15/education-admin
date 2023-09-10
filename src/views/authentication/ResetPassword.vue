<template>
  <b-overlay :show="isLoading" rounded="sm">
  <div
    id="login"
    style="min-height: calc(100vh - 20px)"
    class="fill-height d-flex align-items-center justify-content-center"
    tag="section"
  >
    <b-row class="justify-content-center no-gutters">
      <b-col lg="12" md="12" class="d-flex align-items-center">
        <b-card no-body>
          <b-row class="no-gutters">
            <b-col lg="7" class="bg-primary d-md-flex align-items-center justify-content-center">
              <div class="d-flex align-items-center text-right">
                <div class="p-5">
                  <div>
                    <h2 class="display-5 text-white fw-medium">
                      برنامج بسيط لمتابعة سير المؤسسات التربوية بالولاية

                    </h2>
                    <p class="mt-4 text-white op-5 font-weight-normal">
                      مديرية التربية - ولاية بشار
                    </p>
                    <b-button
                      size="lg"
                      variant="info"
                      class="mt-4 text-capitalize"
                      >إكتشف اكثر</b-button
                    >
                  </div>
                </div>
              </div>
            </b-col>
            <b-col lg="5">
              <div class="p-4 text-right">
                <br>
                <br>
                <img src="@/assets/images/logo.png" height="80" width="90"/>
                <h2 class="font-weight-bold mt-4 mb-4">تسجيل الدخول</h2>

                <b-alert
                    variant="success"
                    class="d-flex align-items-center bt-alert"
                    show
                    dismissible
                    fade
                    v-if="showSuccess"
                >
                  <span class="mr-4 text-right">تمت العملية بنجاح</span>
                </b-alert>
                <b-alert
                    variant="danger"
                    class="d-flex align-items-center bt-alert text-right"
                    show
                    dismissible
                    fade
                    v-if="showError"
                >
                  <b-col class="mr-4">
                    <div v-for="(errorArray, idx) in error.errors" :key="idx">
                      <div v-for="(allErrors, idx) in errorArray" :key="idx">
                        <span class="text-danger text-right">{{ allErrors}} </span>
                      </div>
                    </div>
                    <div v-if="showErrorInvalid">
                      <span class="text-danger text-right">{{ error.message }} </span>
                    </div>
                  </b-col>
                </b-alert>

                <b-form @submit.prevent="submit">
                  <b-form-group>
                    <b-form-input
                        id="txt-pwd"
                        type="password"
                        placeholder="ادخل كلمة المرور"
                        class="mb-3"
                        v-model="$v.form.pwd.$model"
                        :state="validateState('pwd')"
                    ></b-form-input>
                    <b-form-invalid-feedback id="txt-pwd"
                    >هذا الحقل اجباري</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <b-form-group>
                    <b-form-input
                      id="txt-cpwd"
                      type="password"
                      placeholder="اعد ادخال كلمة المرور"
                      class="mb-3"
                      v-model="$v.form.cpwd.$model"
                      :state="validateState('cpwd')"
                    ></b-form-input>
                    <b-form-invalid-feedback id="txt-pwd"
                      >هذا الحقل اجباري</b-form-invalid-feedback
                    >
                  </b-form-group>

                  <b-button
                    type="submit"
                    variant="primary"
                    :disabled="$v.form.$invalid"
                    size="lg"
                    block
                    class="mt-4"
                    >اعادة كلمة المرور</b-button
                  >
                </b-form>
               <br>
               <br>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
  </b-overlay>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "BoxedLogin",
  mixins: [validationMixin],
  data: () => ({
    form: {
      pwd: "",
      cpwd: "",
      id: "",
    },
    showError: false,
    showSuccess: false,
    showErrorInvalid: false,
    isLoading: false
  }),
  computed: {},
  mounted() {
    this.form.id = this.$route.query.id
    this.$store.commit("SET_DIRECTION", "rtl");
    document.documentElement.setAttribute("dir", "rtl");
  },
  validations: {
    form: {
      cpwd: {
        required,
        minLength: minLength(4),
      },
      pwd: {
        required,
        minLength: minLength(4),
      },
    },
  },
  methods: {
    validateState(username) {
      const { $dirty, $error } = this.$v.form[username];
      return $dirty ? !$error : null;
    },
    submit() {
      if(this.form.pwd === this.form.cpwd) {
        this.showError = false
        this.showSuccess = false
        this.isLoading = true
        this.$http.post("admin/reset-password", {
          id: this.form.id,
          password: this.form.pwd,
        })
            .then(response => {
              this.isLoading = false
              if(response.status === 200){
                this.$router.push({ path: "/" });
              }else{
                this.showError = true
              }
            })
            .catch(error => {
              this.showSuccess = false
              this.error = error.response.data
              if(this.error.errors === undefined){
                this.showErrorInvalid = true
              }
              console.log(error)
              this.showError = true
            });
      }

    },

  },

};
</script>
