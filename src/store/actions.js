export const increment = ({
  commit,
  state
}, news) => {
  commit('INCREMENT', news)
}
export const set_interface = ({
  commit,
  state
}, interfaceList) => {
  commit('SET_INTERFACE', interfaceList)
}
export const set_process = ({
  commit,
  state
}, processList) => {
  commit('SET_PROCESS', processList)
}
