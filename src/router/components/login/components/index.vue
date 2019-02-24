<template>
  <div class="container">
    <div class="loginForm-container">
      <div class="loginForm">
        <h1 class="loginForm-title">登入</h1>
        <div class="loginForm-breakLine"></div>
        <form class="loginForm_form">
          <label class="formGroup">
            <div class="formGroup-acc">帳號</div>
              <input
                v-model="userAcc"
                ref="accInput"
                type="text" 
                class="input-acc" 
                placeholder="請輸入帳號"
              >
          </label>
          <label class="formGroup">
            <div class="formGroup-psw">密碼</div>
              <input
                v-model="userPsw"
                type="password" 
                class="input-psw" 
                placeholder="請輸入密碼"
              >
          </label>
          <div v-if="errorInput" class="login_error">帳號或密碼輸入錯誤</div>
          <router-link to="/signup" class="noAccount">還沒有帳號?</router-link>
          <button
            @click.prevent="login()"
            :class="!userAcc || !userPsw ? 'btn-disable' : ''"
            type="submit"
            class="btn-login"
          >登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  beforeRouteEnter: (to, from, next) => {
    if (localStorage.getItem('token') === 'isLogin') {
      next('/');
    }
    next();
  },
  data () {
    return {
      userAcc: '',
      userPsw: '',
      errorInput: false
    }
  },
  created() {
    this.axios.get('http://localhost:3000/contents').then((res) => {
      this.$store.state.memberData = res.data;
    });
  },
  mounted() {
    this.$refs.accInput.focus();
  },
  computed: {
    ...mapGetters({
      userInfo: 'getMemberData'
    })
  },
  methods: {
    login() {
      if (!this.userAcc || !this.userPsw) {
        return;
      }
      this.$store.commit('getLoginUserName', this.userAcc);
      this.userInfo.forEach((data) => {
        if (this.userAcc === data.account || this.userPsw === data.password) {
          localStorage.setItem('token', 'isLogin');
          this.$router.push('./');
        } 
        else {
          this.errorInput = true;
          this.userAcc = '';
          this.userPsw = '';
          this.$refs.accInput.focus();
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    background-color: #00324E;
    padding: 50px 0;
    .loginForm-container {
      background-color: #FFF;
      width: 480px;
      margin: 0 auto;
      border-radius: 4px;
      .loginForm {
        padding: 30px 50px 70px;
        text-align: center;
        .loginForm-title {
          font-weight: 400;
        }
        .loginForm-breakLine {
          margin: 10px 0;
          border-top: 1px solid #E9E9E9;
        }
        .loginForm_form {
          margin-top: 20px;
          text-align: left;
          .formGroup {
            display: block;
            margin-bottom: 14px;
          }
          .formGroup-acc, 
          .formGroup-psw {
            margin-bottom: 16px;
            font-size: 16px;
            color: #323232;
          }
          .input-acc,
          .input-psw {
            width: 100%;
            height: 40px;
            padding-left: 10px;
            border: 1px solid #dfdfdf;
            border-radius: 4px;
          }
          .login_error {
            margin-bottom: 10px;
            font-size: 13px;
            color: #BD494A;
          }
          .noAccount {
            float: right;
            color: #6DBCE8;
            text-decoration: none;
            font-size: 14px;
            transition: color 1s;
            &:hover {
              color: #0685CC;
              transition: color 1s;
            }
          }
          .btn-login {
            background-color: #3397CF;
            width: 100%;
            height: 38px;
            margin-top: 20px;
            text-align: center;
            color: #FFF;
            font-size: 14px;
            border-radius: 4px;
            border: 1px solid transparent;
            cursor: pointer;
            opacity: .5;
            transition: opacity 1.5s;
            &:hover {
              background-color: #2A7DAD;
              opacity: 1;
              transition: opacity 1.5s;
            }
          }
          .btn-login.btn-disable {
            cursor: default;
          }
        }
      }
    }
  }
</style>


