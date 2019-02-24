export default {
  path: '/signup',
  name: 'signup',
  component: (resolve) => {
    require.ensure(['./components'], () => {
      resolve(require('./components'));
    });
  }
}