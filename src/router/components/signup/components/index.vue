<template>
  <div class="container">
    <div class="signupForm-container">
      <div class="signupForm">
        <h1 class="signupForm-title">註冊</h1>
          <div class="signupForm-breakLine"></div>
            <form class="signupForm_form">
              <label class="formGroup">
                <div class="formGroup-acc">帳號</div>
                <input
                  v-model.trim="accText"
                  ref="accInput"
                  type="text" 
                  class="input-acc" 
                  placeholder="請輸入帳號"
                >
              </label>
              <label class="formGroup">
                <div class="formGroup-psw">密碼</div>
                <input
                  v-if="pswShow"
                  v-model.trim="pswText"
                  type="text"
                  class="input-psw"
                  placeholder="請輸入密碼"
                >
                <input
                  v-else
                  v-model="pswText"
                  type="password"
                  class="input-psw"
                  placeholder="請輸入密碼"
                >
              </label>
              <div class="showPsw">
                <input type="checkbox" v-model="pswShow">
                <span>顯示密碼</span>
              </div>
              <button
                @click.prevent="signup()"
                class="btn-signup"
              >
                立即註冊
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
      pswShow: false,
      pswText: '',
      accText: '',
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
    signup() {
      if (!this.accText || !this.pswText) {
        alert('請輸入帳號、密碼!!');
        return;
      }
      for (let i=0; i<this.userInfo.length; i++) {
        if (this.accText === this.userInfo[i].account) {
          alert('此帳號重複了!!');
          this.accText = '';
          this.pswText = '';
          this.$refs.accInput.focus();
          return;
        }
      }
      const userInfo = {
        account: this.accText,
        password: this.pswText
      };
      this.$store.dispatch('ADD_USER_DATA', userInfo).then(() => {
        this.accText = '';
        this.pswText = '';
      })
      alert('註冊成功');
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    background-color: #00324E;
    padding: 50px 0;
    .signupForm-container {
      background-color: #FFF;
      width: 460px;
      margin: 0 auto;
      border-radius: 4px;
      .signupForm {
        padding: 30px 50px;
        text-align: center;
        .signupForm-title {
          font-weight: 400;
          }
        .signupForm-breakLine {
          margin: 10px 0;
          border-top: 1px solid #E9E9E9;
        }
        .signupForm_form {
          margin-top: 20px;
          text-align: left;
        }
        .formGroup,
        .showPsw {
          display: block;
          margin-bottom: 20px;
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
        .showPsw {
          font-size: 13px;
        }
        .btn-signup {
          background-color: #3397CF;
          width: 100%;
          height: 40px;
          margin-bottom: 20px;
          color: #FFF;
          border: none;
          border-radius: 4px;
          opacity: .5;
          transition: opacity 1s;
          cursor: pointer;
          &:hover {
            opacity: 1;
            transition: opacity 1s;
          }
        }
      }
    }
  }
</style>