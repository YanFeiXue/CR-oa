// 定义所需的 mutations
const mutations = {
  INCREMENT(state, news) {
    state['news'] = news
  },
  SET_INTERFACE(state, interfaceList) {
    state['interfaceList'] = interfaceList
  },
  SET_PROCESS(state, processList) {
    state['processList'] = processList
  },
  SET_ROUTERNAME(state, routerName) {
    state['routerName'] = routerName
  },
  SET_PROCESSUPLOAD(state, processUpload) {
    state['processUpload'] = processUpload
  },
  SET_LEASEFORM(state, leaseForm) {
    state['yizhangtongForm'] = leaseForm
  },
  SET_ISCHECKLEASEFORM(state, isCheckLeaseForm) {
    state['isCheckLeaseForm'] = isCheckLeaseForm
  },

  SET_LEASEID(state, leaseId) {
    state['leaseId'] = leaseId
  },
  SET_SESSIONDATA(state, sessionData) {
    state['sessionData'] = sessionData
  },
  SET_INCOMELIST(state, incomeList) {
    state['incomeList'] = incomeList
  },
  SET_STATELIST(state, stateList) {
    state['stateList'] = stateList
  },
  SET_FILETOUPLOADLIST(state, fileToUploadList) {
    state['fileToUploadList'] = fileToUploadList
  },
  SET_PRODUCTDIFF(state, productDiff) {
    state['productDiff'] = productDiff
  },
  SET_STATEINDEX(state, stateIndex) {
    state['stateIndex'] = stateIndex
  },
  SET_ATTACHMENTINDEX(state, attachmentIndex) {
    state['attachmentIndex'] = attachmentIndex
  },
  SET_PRODUCT(state, product) {
    state['product'] = product
  },
  SET_ACTIVEINDEX(state, activeIndex) {
    state['activeIndex'] = activeIndex
  },
  SET_DICS(state, dics) {
    state['dics'] = dics
  },
  SET_AREA(state, area) {
    state['area'] = area
  }
}

export default mutations
