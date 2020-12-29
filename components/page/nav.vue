<template>
  <a-layout-sider v-model="iscollapsed" :trigger="null" collapsible collapsedWidth="0">
    <div class="nav_logo_box flex_a" v-if="menuIcontype">
      <img class="nav_logo_img" :src="menuIcon" alt />
    </div>

    <a-menu class="nav_scroller" theme="dark" mode="inline" @click="handleClick" @openChange="openChange"
      :selected-keys="selectedKeys" :open-keys="openKeys">
      <template v-for="item in menudata">
        <a-menu-item v-if="!item.children" :key="item.linkURL">
          <nuxt-link :to="{ path: item.linkURL }">
            <img style="width: 14px;height: 14px;margin-right:5px " :src="item.menuIcon" alt />
            <span>{{ item.menuName }}</span>
          </nuxt-link>
        </a-menu-item>
        <sub-menu v-else :key="item.id" :menu-info="item"></sub-menu>
      </template>
</a-menu>
</a-layout-sider>
</template>
<script>
    import {
        Menu
    } from "ant-design-vue/lib";
    import json from "./testnav.json";
    const SubMenu = {
        template: `
          <a-sub-menu :key="menuInfo.menuName" v-bind="$props" v-on="$listeners">
            <span slot="title">
             <img style='width: 14px;height: 14px;margin-right:5px ' :src="menuInfo.menuIcon" alt /><span>{{ menuInfo.menuName }}</span>
            </span>
            <template v-for="item in menuInfo.children">
              <a-menu-item v-if="!item.children" :key="item.linkURL">
             <nuxt-link  :to="item.linkURL" >
               <img style='width: 14px;height: 14px;margin-right:5px ' :src="item.menuIcon" alt />
                      <span>{{item.menuName}}</span>
                    </nuxt-link >
              </a-menu-item>
              <sub-menu v-else :key="item.menuName" :menu-info="item" />
            </template>
          </a-sub-menu>
        `,
        name: "SubMenu",
        // must add isSubMenu: true
        isSubMenu: true,
        menuIcon: "",
        menuIcontype: false,
        props: {
            ...Menu.SubMenu.props,
            menuInfo: {
                type: Object,
                default: () => ({})
            }
        }
    };

    export default {
        name: "isnav",
        data() {
            return {
                menuIcon: "",
                isSubMenu: true,
                menuIcontype: false,
                menudata: [], //树数据
                selectedKeys: [],
                openKeys: []
            };
        },
        components: {
            "sub-menu": SubMenu
        },

        mounted() {
            this.getMenuList();
            this.menuIcontype = false;
            if (localStorage.getItem("auth"))
                this.menuIcon = JSON.parse(localStorage.getItem("auth")).customerLogo;
            this.menuIcontype = true;
        },
        methods: {
            handleClick(e) {
                this.selectedKeys = [e.key];
            },
            /* 获取面包屑 */
            getBreads(val) {
                let list = []
                for (let j = 0; j < this.menudata.length; j++) {
                    const element = this.menudata[j];
                    for (let i = 0; i < element.children.length; i++) {
                        if (element.children[i].linkURL == val) {
                            list.push(element.menuName)
                            list.push(element.children[i].menuName)
                            this.$store.commit('bread/setBreaks', list)
                            break
                        }
                    }

                }

            },
            openChange(e) {
                this.openKeys = e;
                localStorage.setItem("navOpenId", JSON.stringify(e));
            },
            async getMenuList() {
                let host = window.location.host;
                let url = window.location.href.replace(/^http:\/\/[^/]+/, "");
                if (host.indexOf("localhost") >= 0 || host.indexOf("192.168.3.49") >= 0 || host.indexOf(
                        "192.168.3.167") >= 0) {
                    this.menudata = this.toTree(json.navlist);
                } else {
                    if (JSON.parse(localStorage.getItem("auth"))) {
                        let navlist = JSON.parse(localStorage.getItem("auth")).navlist;
                        navlist = navlist.filter(item => item.menuType <= 3000);
                        for (let i = 0; i < navlist.length; i++) {
                            if (navlist[i].linkURL == url) {
                                this.selectedKeys = navlist[i].linkURL
                            }
                        }
                        this.menudata = this.toTree(navlist);
                        this.getBreads(this.selectedKeys)
                    }
                }
            },
            toTree(data) {
                let result = [];
                if (!Array.isArray(data)) {
                    return result;
                }
                data.forEach(item => {
                    delete item.children;
                });
                let map = {};
                data.forEach(item => {
                    map[item.menuId] = item;
                });
                data.forEach(item => {
                    let parent = map[item.parentId];
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item);
                    } else {
                        result.push(item);
                    }
                });
                return result;
            }
        },

        props: {
            iscollapsed: Boolean
        },
        /* 监听路由编号 */
        watch: {
            $route: function(val, oldval) {

                this.getBreads(val.path)
            },
        },
    };
</script>
<style scoped>
    .nav_scroller {
        height: 100vh;
        padding-bottom: 60px;
        overflow: scroll;
        /* max-height: 1009px; */
    }
    
    .nav_scroller::-webkit-scrollbar {
        display: none;
    }
    
    .nav_logo_img {
        width: 120px;
        height: 42px;
        margin: 0 auto;
    }
    
    .nav_logo_box {
        width: 100%;
        height: 42px;
        margin-top: 16px;
        justify-content: center;
        margin-bottom: 16px;
    }
</style>