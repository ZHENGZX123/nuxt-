<template>
  <div class="container">
    <a-layout id="components-layout-demo-custom-trigger">
        <isnav :iscollapsed="collapsed"></isnav>
        <a-layout class='layout_scroller' >
          <ishead class="head" @tocollapsed="getcollapsed"></ishead>
          <a-layout-content>
            <Nuxt  class="content" v-if="isRouterShow" ></Nuxt>
          </a-layout-content>
        </a-layout>
      </a-layout>
  </div>
</template>

<script>
    import isnav from "@/components/page/nav";
    import ishead from "@/components/page/header";
    export default {
        components: {
            isnav,
            ishead,
        },
        data() {
            return {
                collapsed: false,
                isRouterShow: true,
            }
        },
        mounted() {
            //禁止页面滑动
            let m = function(e) {
                e.preventDefault();
            };
            document.body.style.overflow = 'hidden';
            document.addEventListener("touchmove", m, {
                passive: false
            });
        },
        methods: {
            getcollapsed(val) {
                this.collapsed = val;
            },
            async reload() {
                this.isRouterShow = false;
                await this.$nextTick()
                this.isRouterShow = true;
            },
        },
    }
</script>

<style>
    .container {
        margin: 0 auto;
        min-height: 100vh;
    }
    
    .layout_scroller {
        height: 100vh;
    }
    
    .head {
        display: flex;
        flex-direction: row;
        height: 5vh;
    }
    
    .content {
        background-color: #ffffff;
        margin: 10px;
        height: 92vh;
        overflow-y: scroll;
    }
    
    .content::-webkit-scrollbar {
        display: none;
    }
</style>