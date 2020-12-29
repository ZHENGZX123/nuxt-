// 中间件 middle/ route.js
export default function({ isHMR, app, store, route, params, error, redirect }) {
    if (isHMR) return

    if (route.fullPath == '/') { //重定向页面
        return redirect('/home/datastatistics')
    }
}