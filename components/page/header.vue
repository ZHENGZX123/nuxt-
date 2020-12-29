<template>
  <a-layout-header  class="layout_header">
    <a-breadcrumb class="bread" style="margin-left:-40px;">
      <a-breadcrumb-item v-for="(item, index) in $store.state.bread.breadList" :key="index">
        <span :class="index == $store.state.bread.breadList.length - 1 ? 'color1' : 'color2'">{{
          item
        }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-breadcrumb class="bread">
      <a-breadcrumb-item>
        <div class="bread" v-if="!addtype" style="margin-right: -40px;">
          <div class="head_r"></div>
          <div class="head_r" @click="backhome()">返回首页</div>
          <div class="head_r ">
            <img :src="user.customerLogo?user.customerLogo:require('../../assets/nav_img/user.png')" alt class="head_r_img" />
            {{ user.realName }}
          </div>
        </div>
        <div class="bread" v-if="addtype">
          <a-button class=" head_btn" style="width: 68px;" type='primary' @click="backlast()">返回</a-button>
        </div>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </a-layout-header>
</template>
<script>
    export default {
        name: "isheader",
        data() {
            return {
                iscollapsed: false,
                title: [],
                user: {
                    customerLogo: ''
                },
                oldval: '',
                addtype: false,
            };
        },
        methods: {
            /* 返回上一级 */
            backlast() {
                this.$router.push(this.oldval);
            },
            /* 返回首页 */
            backhome() {
                let aa = window.location.href.split("/#");
                let bb = aa[0].split("/auth");
                window.location.href = bb[0] + "/#/home";
            },


        },
        /* 获取用户信息 */
        mounted() {
            if (localStorage.getItem("auth"))
                this.user = JSON.parse(localStorage.getItem("auth"));
        },
        /* 监听路由编号 */
        watch: {
            $route: function(val, oldval) {
                this.oldval = oldval
                if (val.path.search("/add") == 0) {
                    this.addtype = true;
                } else {
                    this.addtype = false;
                }
            },
        },
    };
</script>
<style scoped>
    .bread {
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    
    .layout_header {
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        flex-direction: row;
    }
    
    .color1 {
        color: #333;
    }
    
    .color2 {
        color: #999;
    }
    
    .head_r {
        margin-right: 10px;
        cursor: pointer;
    }
    
    .head_r_img {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 10px;
    }
    
    .head_btn {
        margin-top: 4px;
    }
</style>