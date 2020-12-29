export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: '智慧路灯杆',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        'ant-design-vue/dist/antd.css', //ant 
        '~/css/ant.css',
        '~/css/styles.css'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '@/plugins/antd-ui',
        //'@/plugins/axios'
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],
    router: {
        middleware: 'route'
    },
    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [],
    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend(config, { isClient }) { //vue完整版
            config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
        }
    },
}