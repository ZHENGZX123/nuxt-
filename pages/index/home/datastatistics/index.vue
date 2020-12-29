<template>

    <div>
       <a-button @click='testApi'>测试</a-button>
    </div>
</template>
<script>
    import {
        getTaskPage
    } from '@/api/user'
    export default {
        methods: {
            testApi() {
                let param = {}
                getTaskPage(param).then((data) => {})
            }
        }
    }
</script>