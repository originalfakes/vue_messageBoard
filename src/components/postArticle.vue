<template>
  <div class="modal" method="get">
    <form class="postForm">
      <h1 class="postForm_name">發文</h1> 
      <div class="postForm_closeBtn" @click="changeFormStatus">
        <i class="fa fa-close"></i>
      </div>
      <textarea v-model.trim="getPostTitle" class="postForm_title" placeholder="標題" ref="titleFocus"></textarea>
      <textarea v-model.trim="getPostContent" class="postForm_content" placeholder="內容"></textarea>
      <div v-if="!errorFormInput" class="errorType">標題與內容不可為空</div>
      <div class="postForm_btn">
        <button @click.prevent="postArticle" class="btn-send">送出</button>
        <button @click.prevent="changeFormStatus" class="btn-cancel">取消</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      getPostTitle: '',
      getPostContent: '',
      errorFormInput: true
    }
  },
  mounted() {
    this.$refs.titleFocus.focus();
    if(this.getEditPostData.postTitle && this.getEditPostData.postContent) {
      this.getPostTitle = this.getEditPostData.postTitle;
      this.getPostContent = this.getEditPostData.postContent;
    }
  },
  computed: {
    ...mapGetters([
      'getEditPostData',
      'getLoginUserName'
    ])
  },
  methods: {
    postArticle() {
      if (!this.getPostTitle || !this.getPostContent) {
        this.errorFormInput = false;
        return;
      }
      this.errorFormInput = true;
      const time = new Date();
      const getTime = `．${time.getMonth() + 1}月${time.getDate()}日${time.getHours()}:${time.getMinutes()}`;
      // const newPostData = {
      //   title: this.getPostTitle,
      //   content: this.getPostContent,
      //   name: this.getLoginUserName,
      //   time: getTime,
      //   apiPostId: this.getEditPostData.apiPostId,
      //   dataId: this.getEditPostData.dataId,
      //   comment: []
      // };
      const editPostData = {
        title: this.getPostTitle,
        content: this.getPostContent,
        name: this.getLoginUserName,
        time: getTime,
        apiPostId: this.getEditPostData.apiPostId,
        dataId: this.getEditPostData.dataId
      };
      const newPostData = {
        ...editPostData,
        comment: []
      }
      // 編輯貼文
      if(this.getEditPostData.postTitle && this.getEditPostData.postContent)
      {
        this.$store.dispatch('EDIT_POST', editPostData).then(() => {
          this.getPostTitle = '';
          this.getPostContent = '';
          this.changeFormStatus();
        });
      }
      // 新增貼文
      else {
        this.$store.dispatch('ADD_NEW_POST', newPostData).then(() => {
        this.getPostTitle = '';
        this.getPostContent = '';
        this.changeFormStatus();
        })
      }
    },
    changeFormStatus() {
      this.$emit('clearPost');
      this.$store.commit('changeFormStatus');
    }
  },
  beforeDestroy() {
    this.$store.commit('clearPostData');
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    z-index: 1;
    padding-top: 86px;
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background: rgba(0,0,0,.5);
    animation: animationTop .4s;
    .postForm {
      position: relative;
      background: #FFF;
      width: 720px;
      height: 310px;
      margin: 0 auto;
      .postForm_name {
        padding-top: 16px;
        color: #979763;
      }
      .postForm_closeBtn {
        position: absolute;
        top: 0px;
        right: 5px;
        font-size: 26px;
        color: #C4C4C4;
        &:hover {
          cursor: pointer;
          color: #3397CF;
        }
      }
      .postForm_title,
      .postForm_content {
        display: block;
        margin: 0 auto;
        width: 400px;
        height: 40px;
        border: none;
        outline: none;
      }
      .postForm_title {
        font-size: 25px;
        font-weight: 500;
      }
      .postForm_content {
        margin-top: 30px;
        font-size: 18px;
      }
      .errorType {
        text-align: left;
        margin: 10px 0 10px 160px;
        font-size: 13px;
        color: #BD494A;
      }
      .postForm_btn {
        display: flex;
        margin-left: 138px;
        .btn-send,
        .btn-cancel {
          width: 80px;
          height: 37px;
          margin: 16px 0 0 20px;
          border: none;
          border-radius: 4px;
          color: #FFF;
          font-size: 14px;
          transition: background-color 1s;
        }
        .btn-send {
          background-color: #3397CE;
          &:hover {
            background-color: #86BEDE;
            cursor: pointer;
            transition: background-color 1s;
          }
        }
        .btn-cancel {
          background-color: #D43646;
          &:hover {
            background-color: #F36473;
            cursor: pointer;
            transition: background-color 1s;
          }
        }
      }
    }
  }
  @keyframes animationTop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1;}
  }
</style>
