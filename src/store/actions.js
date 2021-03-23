export const increment = ({
  commit,
  state
}, news) => {
  commit('INCREMENT', news)
}