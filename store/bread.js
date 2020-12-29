export const state = () => ({
    breadList: [] //面包屑数据
})
export const mutations = {
    setBreaks(state, value) {
        state.breadList = value
    }
}