<template>
  <div>
    <navbar />
    <postForm v-if="getPostFormStatus" />
    <div v-if="$route.name === 'all'" class="container">
      <div class="post_article_container clearfix">
        <div class="postListHeader">文章</div>
        <div class="post_article">
          <ul>
            <li :key="index" v-for="(data, index) in getPostList" class="post_article_list">
              <div class="post_article_name">{{ data.name }}</div>
              <div class="post_article_date">{{ data.time }}</div>
              <div v-if="data.name === getLoginUserName" ref="moreFunc" class="more-icon" @click.stop="getMoreFunc(index)">
                <i class="fa fa-ellipsis-h"></i>
              </div>
              <div v-if="moreFuncStatus && index === moreListIndex" class="more_func">
                <ul>
                  <li class="more_func_edit" @click="editPost(index)">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    <span class="edit_func">編輯貼文</span>
                  </li>
                  <li class="more_func_delete" @click="deletePost(index)">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                    <span class="edit_delete">刪除貼文</span>
                  </li>
                </ul>
              </div>
              <h3 class="post_article_title">{{ data.title}}</h3>
              <div class="post_article_content">{{ data.content }}</div>
              <div class="comment_func">
                <div class="click_thumb">
                  <i class="fa fa-thumbs-o-up"></i>
                </div>
                <div class="comment_msg" @click="leaveMsgFunc(index)">
                  <i class="fa fa-commenting-o"></i>
                </div>
              </div>
              <div
                v-show="leaveMsgStatus && leaveMsgIndex === index"
                :key="commentIndex"
                 v-for="(commentMsg, commentIndex) in data.comment"
                class="comment_list"
              >
                <div class="comment">
                  <div>{{ commentMsg }}</div>
                </div>
              </div>
              <div v-show="leaveMsgStatus && index === leaveMsgIndex" class="leave_msg_column">
                <div class="author_name">{{ getLoginUserName }}</div>
                <input
                  v-model="comment"
                  @keyup.enter="leaveMsg(index)"
                  type="text"
                  class="msg_content"
                  ref="leavemsg"
                  placeholder="留言 ..."
                >
              </div>
              
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue';
import postForm from '@/components/postArticle.vue';
import { mapGetters } from 'vuex';
export default {
  components:{
    navbar,
    postForm
  },
  data () {
    return {
      moreFuncStatus: false,
      moreListIndex: '',
      leaveMsgIndex: '',
      comment: '',
      commentSave: [
      ],
      leaveMsgStatus: false
    }
  },
  watch: {
    moreFuncStatus(bool) {
      window.removeEventListener('click', this.handleClickEvent);
      if(bool) {
        window.addEventListener('click', this.handleClickEvent);
      }
    }
  },
  created() {
    this.axios.get('http://localhost:4000/article').then((res) => {
      this.$store.state.newPost = res.data;
      for(let i=0; i<res.data.length; i++) {
        const commentObj = {
          "comment": res.data[i].comment,
          "name": res.data[i].name
        };
        this.commentSave.push(commentObj);
      }
    });
    console.log(this.commentSave);
  },
  computed: {
    ...mapGetters([
      'getPostList',
      'getPostFormStatus',
      'getLoginUserName'
    ])
  },
  methods: {
    getMoreFunc(index) {
      this.moreListIndex = index;
      this.moreFuncStatus = !this.moreFuncStatus;
    },
    leaveMsgFunc(index) {
      this.leaveMsgIndex = index;
      this.leaveMsgStatus = !this.leaveMsgStatus;
      this.$refs.leavemsg[index].focus();
    },
    handleClickEvent(e) {
      if(!this.$refs.moreFunc !== e.target) {
        this.moreFuncStatus = false;
      }
    },
    editPost(index) {
      const editData = {
        postTitle: this.getPostList[index].title,
        postContent: this.getPostList[index].content,
        apiPostId: this.getPostList[index].id,
        dataId: index
      }
      this.$store.commit('changeFormStatus');
      this.$store.commit('editDataSave', editData);
    },
    deletePost(index) {
      const targetId = {
        apiPostId: this.getPostList[index].id,  //api裡的ID
        dataId: index  //存放在state裡的索引值
      }
      this.$store.dispatch('DELETE_POST', targetId);
    },
    leaveMsg(index) {
      this.commentSave[index].comment.push(this.comment);
      const data = {
        dataId: index,
        apiPostId: this.getPostList[index].id,
        postComment: this.commentSave[index].comment,
        commentName: this.commentSave[index].name
      }
      this.$store.dispatch('ADD_COMMENT', data);
      this.comment = '';
      this.leaveMsgStatus = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 43px 0;
    .post_article_container {
      background-color: #FAFAFA;
      width: 720px;
      margin: 0 auto;
      border-radius: 4px;
      .postListHeader {
        width: 623px;
        padding: 20px 0;
        margin: 0 67px;
        text-align: left;
        border-bottom: 1px solid #DEDEDE;
      }
      .post_article {
        margin-top: 20px;
        ul {
          padding: 0;
          margin: 0;
          list-style-type: none;
          .post_article_list {
            position: relative;
            margin: 10px 30px 10px 66px;
            padding-bottom: 10px;
            text-align: left;
            border-bottom: 1px solid #DEDEDE;
            .post_article_name {
              display: inline-block;
              color: #2A7DAD;
              opacity: .8;
              font-weight: 600;
            }
            .post_article_date {
              display: inline-block;
              opacity: .35;
            }
            .more-icon {
              float: right;
              color: #1D2129;
              opacity: .7;
              font-size: 16px;
              &:hover {
                cursor: pointer;
              }
            }
            .more_func {
              position: absolute;
              top: 13px;
              right: 0;
              border: 1px solid rgba(0, 0, 0, .15);
              border-radius: 3px;
              box-shadow: 0 3px 8px rgba(0, 0, 0, .3);
              .more_func_edit,
              .more_func_delete {
                padding: 10px 20px;
                &:hover {
                  cursor: pointer;
                  opacity: .8;
                  background-color: #2A7DAD;
                  color: #FFF;
                }
                .fa {
                  font-size: 14px;
                  width: 14px;
                }
              }
            }
            .post_article_title {
              opacity: .85;
              color: #4F4F4F;
            }
            .post_article_content {
              opacity: .5;
            }
            .comment_func {
              margin-top: 16px;
              .click_thumb,
              .comment_msg {
                display: inline-block;
                margin: 0 8px;
                font-size: 18px;
                color: #2A7DAD;
                &:hover {
                  cursor: pointer;
                  color: #065380;
                }
              }
            }
            .comment_list {
              margin: 10px 0;
              line-height: 24px;
              .comment {
                min-width: 100px;
                display: inline-block;
                padding: 0 10px;
                border-radius: 16px;
              }
            }
            .leave_msg_column {
              display: flex;
              align-items: center;
              margin-top: 10px;
              .author_name {
                color: #4F4F4F;
                font-size: 18px;
                margin-right: 14px;
              }
              .msg_content {
                width: 290px;
                height: 26px;
                padding-left: 10px;
                background-color: #f2f3f5;
                border: 1px solid #ccd0d5;
                border-radius: 16px;
                &:focus {
                  outline: none;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

