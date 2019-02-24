<template>
  <div class="header-wrap">
    <div class="header">
      <h1 class="header-title" @click="toLoginPage()">留言板</h1>
      <nav class="header-nav-login">
        <router-link
          to="signup"
          v-if="$route.name !=='all'"
          :class="$route.name === 'signup' ? 'activeLink' : ''"
        >註冊
        </router-link>
        <router-link
          to="login"
          v-if="$route.name !=='all'"
          :class="$route.name === 'login' ? 'activeLink' : ''"
        >登入
        </router-link>
        <button v-if="$route.name === 'all'" @click="changeFormStatus"  class="btn-post">發文</button>
        <postArticle v-if="formActive" />
        <div
          v-if="$route.name !== 'signup' && $route.name !== 'login'"
          class="userName"
        >
        使用者 : {{ userName }}
        </div>
        <button
          v-if="$route.name !== 'signup' && $route.name !== 'login'"
          @click="logout()"
          class="btn-logout"
        >
          登出
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import postArticle from './postArticle.vue';
export default {
  components: {
    postArticle
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      formActive: 'isFormActive',
      userName(state) {
        if (state.loginUserName === '') {
          this.$store.commit('getUserName');
        }
        return state.loginUserName;
      }
    })
  },
  methods: {
    toLoginPage() {
      if (localStorage.getItem('token') !== 'isLogin') {
        this.$router.push('/login');
      } else {
        this.$router.push('/');
        console.log(localStorage.getItem('token'));
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      this.$router.push('/login');
    },
    changeFormStatus() {
      this.$store.commit('changeFormStatus');
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-wrap {
    background-color: #2A7DAD;
    .header {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      .header-title {
        margin: 10px 30px;
        color: #FFF;
        cursor: pointer;
      }
      .header-nav-login {
        padding: 0 60px;
        .activeLink {
          background-color: #409ED4;
        }
        .userName {
          display: inline-block;
          font-weight: 600;
          color: #FFF;
        }
        a {
          display: inline-block;
          padding: 21px 20px 20px;
          text-decoration: none;
          color: #FFF;
        }
        .btn-post {
          background-color: #3397CE;
          width: 80px;
          height: 37px;
          margin-right: 20px;
          border: none;
          border-radius: 4px;
          color: #FFF;
          font-size: 14px;
          transition: background-color 1s;
          &:hover {
            background-color: #86BEDE;
            cursor: pointer;
            transition: background-color 1s;
          }
        }
        .btn-logout {
          background: transparent;
          padding: 21px 20px;
          border: none;
          font-size: 15px;
          color: #FFF;
          cursor: pointer;
          transition: background-color 1s;
          &:hover {
            background-color: #409ED4;
            transition: background-color 1s;
          }
        }
      }
    }
  }
</style>
