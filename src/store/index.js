import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios' 
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios)

const state = {
  memberData: [],
  newPost: [],
  loginUserName: '',
  isFormActive: false,
  editPostData: {}
}
const getters = {
  getPostList: state => state.newPost, //文章列表
  getPostFormStatus: state => state.isFormActive, // 輸入文章表單狀態
  getLoginUserName: state => state.loginUserName, //使用者名稱
  getMemberData: state => state.memberData, // 會員資料(帳號、密碼)
  getEditPostData: state => state.editPostData // 編輯資料暫存
  
}
const actions = {
  ADD_USER_DATA (context, userInfo) {
    Vue.axios.post('http://localhost:3000/contents', {
      account: userInfo.account,
      password: userInfo.password
    }).then((res) => {
      const userData = res.data;
      context.commit('addUserData', userData);
    })
  },
  ADD_NEW_POST (context, newPost) {
    Vue.axios.post('http://localhost:4000/article', {
      title: newPost.title,
      content: newPost.content,
      name: newPost.name,
      time: newPost.time,
      comment: []
    }).then((res) => {
      context.commit('addNewPost', res.data);
    })
  },
  DELETE_POST (context, postId) {
    Vue.axios.delete(`http://localhost:4000/article/${postId.apiPostId}`).then(() => {
      context.commit('deletePost', postId.dataId);
    })
  },
  EDIT_POST (context, newPostData) {
    Vue.axios.patch(`http://localhost:4000/article/${newPostData.apiPostId}`, {
      title: newPostData.title,
      content: newPostData.content,
      time: newPostData.time
    }).then(() => {
      context.commit('editPost', newPostData);
    })
  },
  ADD_COMMENT (context, comment) {
    Vue.axios.patch(`http://localhost:4000/article/${comment.apiPostId}`, {
        comment: comment.postComment
    }).then(() => {
      context.commit('addPostComment', comment);
    })
  }
}
const mutations = {
  addUserData (state, userData) {
    state.memberData.push(userData);
  },
  addNewPost(state, newPost) {
    state.newPost.push(newPost);
  },
  getLoginUserName (state, userName) {
    localStorage.setItem('userName', userName);
    state.loginUserName = userName;
  },
  getUserName (state) {
    state.loginUserName = localStorage.getItem('userName');
  },
  changeFormStatus (state) {
    state.isFormActive = !state.isFormActive;
  },
  closePostForm (state) {
    state.isFormActive = false;
  },
  deletePost (state, deletePostId) {
    state.newPost.splice(deletePostId, 1);
  },
  editPost (state, postData) {
    console.log(state.newPost[postData.dataId]);
    state.newPost[postData.dataId] = {
      ...state.newPost[postData.dataId],
      ...postData
    }
    console.log(state.newPost[postData.dataId]);
    // state.newPost.splice(postData.dataId, 1);
    // state.newPost.splice(postData.dataId, 0, postData);
  },
  editDataSave(state, editData) {
    state.editPostData = {
      ...state.editPostData,
      ...editData
    }
  },
  clearPostData(state) {
    state.editPostData = '';
  },
  addPostComment(state, comment) {
    state.newPost[comment.dataId].comment = {
      ...state.newPost[comment.dataId].comment,
      ...comment.postComment
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})