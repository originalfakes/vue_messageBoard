<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  background-color: #00324E;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
}
#app,
button {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body,
textarea {
  font-family: Roboto,Helvetica Neue,Helvetica,Arial,PingFang TC,黑體-繁,Heiti TC,蘋果儷中黑,Apple LiGothic Medium,微軟正黑體,Microsoft JhengHei,sans-serif;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
</style>
