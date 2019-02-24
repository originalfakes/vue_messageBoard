import Vue from 'vue'
import Router from 'vue-router'
import signup from './components/signup'
import login from './components/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'all',
      component: (resolve) => {
        require.ensure(['./components'], () => {
          resolve(require('./components'));
        });
      },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token') !== 'isLogin') {
          if(to.path ==='/') {
            next('/login');
          }
        }
        next();
      },
      children: [
        signup,
        login
      ]
    },
    {
      path: '*',
      redirect: '/',
    }
  ]
});
