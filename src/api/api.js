import service from './catchErr'
const kaer = 'http://www.carcredit.com.cn/carcreditNews/selectNewsTheFirstFour'
// const port = 'https://ccbs.carcredit.com.cn'
// const port = 'http://192.168.10.47:8123'
// const port = 'http://192.168.10.32:8124'
// const port = 'http://192.168.10.28:8123'
// const port = 'http://192.168.10.110'
// const port = 'https://prerelease.carcredit.com.cn'
const port = ''
const salesappBase = '/salesapp'
const leaseBase = '/lease'
const ossBase = '/oss'


// 判断角色
export const checkLogin = params => service.post(port + salesappBase + `/login/checkLogin`, params).then(res => res.data)
// 短信验证 登录
export const checkAppAuthCode = params => service.post(port + salesappBase + `/login/checkAppAuthCode`, params).then(res => res.data)
// 发送验证码
export const sendSms = params => service.post(port + salesappBase + `/login/sendSms`, params).then(res => res.data)
// 获取预审批结果
export const getPreAudits = params => service.post(port + salesappBase + `/reject/getPreAudits`, params).then(res => res.data)
// 获取归档状态列表
export const getFileReturnCustomers = params => service.post(port + salesappBase + `/lease/getFileReturnCustomers`, params).then(res => res.data)
// 获取还款列表
export const getDealerLoanDataDetail = params => service.post(port + salesappBase + `/lease/getDealerLoanDataDetail`, params).then(res => res.data)
// 获取申请状态
export const getOrderList = params => service.post(port + salesappBase + `/lease/getOrderList`, params).then(res => res.data)
// 流程备注
export const getAllTaskMsgList = params => service.post(port + salesappBase + `/lease/getAllTaskMsgList`, params).then(res => res.data)
// 影像件
export const selectAllFileNodeDir = params => service.post(port + salesappBase + `/attachment/selectAllFileNodeDir`, params).then(res => res.data)
// 查看进件申请
export const showLeaseForm = params => service.post(port + salesappBase + `/lease/showLeaseForm`, params).then(res => res.data)
// 查看进件byId
export const getFileListById = params => service.post(port + salesappBase + `/attachment/getFileListById`, params).then(res => res.data)
// 获取平台使用费(%)
export const getAllDictionarie = params => service.post(port + salesappBase + `/appdealer/getAllDictionarie`, params).then(res => res.data)
// 获取地址
export const getAllAreas = params => service.post(port + salesappBase + `/appdealer/getAllAreas`, params).then(res => res.data)
// 查询不同产品_字段
export const getProductInput = params => service.post(port + salesappBase + `/lease/getProductInput`, params).then(res => res.data)
// 首页工作台
export const Workbench = params => service.post(port + salesappBase + `/Workbench/Workbench`, params).then(res => res.data)
// 复制
export const getSignUrl = params => service.post(port + salesappBase + `/reject/getSignUrl`, params).then(res => res.data)
// 获取日志
export const getRecordList = params => service.post(port + salesappBase + `/DailyRecord/getRecordList`, params).then(res => res.data)
// 写日报
export const dailyReportSave = params => service.post(port + salesappBase + `/DailyReport/save`, params).then(res => res.data)
// 查询日报，周报内容
export const getReportByIdAndType = params => service.post(port + salesappBase + `/DailyRecord/getReportByIdAndType`, params).then(res => res.data)
// 写日报评论
export const dailyReportCommentSave = params => service.post(port + salesappBase + `/DailyReportComment/save`, params).then(res => res.data)
// 写周报
export const weeklyReportSave = params => service.post(port + salesappBase + `/WeeklyReport/save`, params).then(res => res.data)
// 上传附件
export const uploadAttachment = params => service.post(port + salesappBase + `/salesapp/uploadAttachment`, params).then(res => res.data)
// 查看oss文件
export const getStsToken = params => service.post(port + ossBase + `/getStsToken`, params).then(res => res.data)
// 计算器专业
export const financialCalculatePro = params => service.post(port + salesappBase + `/financialCalculatePro`, params).then(res => res.data)
// 计算器我司
export const financialCalculateCarCredit = params => service.post(port + salesappBase + `/financialCalculateCarCredit`, params).then(res => res.data)
// 推动进件
export const getDealerStatus = params => service.post(port + salesappBase + `/statistics/getDealerStatus`, params).then(res => res.data)
// 推动放款
export const getFinanceStatus = params => service.post(port + salesappBase + `/statistics/getFinanceStatus`, params).then(res => res.data)
// 获取产品列表
export const getProductList = params => service.post(port + salesappBase + `/getProductList`, params).then(res => res.data)
// 修改推动进件放款状态
export const saveDataStatus = params => service.post(port + salesappBase + `/statistics/saveDataStatus`, params).then(res => res.data)
// 获取权限按钮
export const getLimitsOfAuthority = params => service.post(port + leaseBase + `/role/getLimitsOfAuthority`, params).then(res => res.data)








const authcenter = 'authcenter'
const lease = 'lease'
const dealer = 'appdealer'
const attachment = 'attachment'
const autoreject = 'autoreject'
const ocr = 'ocr'
const carport = 'carport'
const xrtxauthcenterBase = '/xrtxauthcenter'
const xrtxdealerBase = '/xrtxdealer'


export const insertDaily = params => service.post(`/datacenter/public/insert`, params).then(res => res.data)
export const selectOneDaily = params => service.post(`/datacenter/public/selectPage`, params).then(res => res.data)
// 官网
export const selectNewsTheFirstFour = params => service.post(`${kaer}`, params).then(res => res.data)
// 鑫融天下 登录
export const xrtxCheckLogin = (params, callback) => service.post(xrtxauthcenterBase + `/defaultOpenPath/checkLogin`, params, callback).then(res => res.data)
// 鑫融天下 发送验证码
export const xrtxSendSms = params => service.post(xrtxauthcenterBase + `/defaultOpenPath/sendSms`, params).then(res => res.data)
// 鑫融天下 退出
export const xrtxLogout = params => service.post(xrtxauthcenterBase + `/login/logout`, params).then(res => res.data)
// 鑫融天下  短信验证 登录
export const xrtxCheckAppAuthCode = params => service.post(xrtxauthcenterBase + `/defaultOpenPath/checkAppAuthCode`, params).then(res => res.data)
// 鑫融天下  修改密码
export const xrtxChangePassword = params => service.post(xrtxauthcenterBase + `/user/changePassword`, params).then(res => res.data)
// 鑫融天下  获取流程全览
export const xrtxGetProcessList = params => service.post(xrtxdealerBase + `/process/getProcessList`, params).then(res => res.data)
export const xrtxShowAnnounce = params => service.post(xrtxauthcenterBase + `/announcement/showAnnounce`, params).then(res => res.data)
export const xrtxShowHistory = params => service.post(xrtxauthcenterBase + `/announcement/showHistory`, params).then(res => res.data)
export const xrtxShowAnnounceDetails = params => service.post(xrtxauthcenterBase + `/announcement/showAnnounceDetails`, params).then(res => res.data)

// https://zuul.carcredit.com.cn/authcenter/defaultOpenPath/addLoginLog
export const addLoginLog = params => service.post(`${port + authcenter}/defaultOpenPath/addLoginLog`, params).then(res => res.data)
// export const checkLogin = params => service.post(`${port + authcenter}/login/checkLogin`, params).then(res => res.data))

// authcenter/user/changePassword   修改密码
export const changePassword = params => service.post(`${port + authcenter}/user/changePassword`, params).then(res => res.data)
// /authcenter/login/logout
export const logout = params => service.post(`${port + authcenter}/login/logout`, params).then(res => res.data)
export const showAnnounce = params => service.post(`${port + authcenter}/announcement/showAnnounce`, params).then(res => res.data)
// showHistory
export const showHistory = params => service.post(`${port + authcenter}/announcement/showHistory`, params).then(res => res.data)
export const showAnnounceDetails = params => service.post(`${port + authcenter}/announcement/showAnnounceDetails`, params).then(res => res.data)

export const markedRead = params => service.post(`${port + authcenter}/announcement/markedRead`, params).then(res => res.data)

// 经销商放款确认
export const checkFormSave = params => service.post(`${port + lease}/audit/checkFormSave`, params).then(res => res.data)
// /lease/process/getProcessList 查询流程
export const getProcessList = params => service.post(`${port + lease}/process/getProcessList`, params).then(res => res.data)
// /lease/Dictionary/selectGpsProvinceList   选择GPS城市  parentId查询市
export const selectGpsProvinceList = params => service.post(`${port + lease}/Dictionary/selectGpsProvinceList`, params).then(res => res.data)
// showGpsFrom 查询GPS
export const showGpsForm = params => service.post(`${port + lease}/gps/showGpsForm`, params).then(res => res.data)
// /lease/gps/bindGpsInstallAddress 绑定GPS
export const bindGpsInstallAddress = params => service.post(`${port + lease}/gps/bindGpsInstallAddress`, params).then(res => res.data)
// lease/contract/validRepeat 点击电子签章
export const validRepeat = params => service.post(`${port + lease}/contract/validRepeat`, params).then(res => res.data)
// lease/contract/docSign  //发送电子签章
export const docSign = params => service.post(`${port + lease}/contract/docSign`, params).then(res => res.data)
// /lease/attachment/getAttachmentList  影像件管理查询
export const getAttachmentList = params => service.post(`${port + dealer}/attachment/getAttachmentList`, params).then(res => res.data)
// getMerchantList  查询incoming-info 商户名称
export const getMerchantList = params => service.post(`${port + dealer}/lease/getMerchantList`, params).then(res => res.data)
// getMerchantById
export const getMerchantById = params => service.post(`${port + dealer}/lease/getMerchantById`, params).then(res => res.data)
// 查询提交必传 commitCheckFiles
export const commitCheckFiles = params => service.post(`${port + dealer}/commitCheckFiles`, params).then(res => res.data)
export const getAppVersionInfo = params => service.post(`${port + dealer}/app/defaultOpenPath/getAppVersionInfo`, params).then(res => res.data)
// /lease 查询经销商
export const getDealerListNoPage = params => service.post(`${port + lease}/contract/getDealerListNoPage`, params).then(res => res.data)
export const getYZTProvinceList = params => service.post(`${port + lease}/Dictionary/getYZTProvinceList`, params).then(res => res.data)
export const getCheckForm = params => service.post(`${port + lease}/audit/getCheckFormMsg`, params).then(res => res.data)
// 查询是否绑过银行卡
export const checkBaofooProtocalByLeaseId = params => service.post(`${port + lease}/baofoo/checkBaofooProtocalByLeaseId`, params).then(res => res.data)
// id查询支持银行列表
export const selectDictionaryById = params => service.post(`${port + lease}/Dictionary/selectDictionaryById`, params).then(res => res.data)
// 查询宝付验证放款卡信息
export const showBaofooForm = params => service.post(`${port + lease}/baofoo/showBaofooForm`, params).then(res => res.data)
// 验证放款卡 发送短息
export const BaofooReadySign = params => service.post(`${port + lease}/baofoo/BaofooReadySign`, params).then(res => res.data)
// 验证放款卡 确认
export const BaofooConfirmSign = params => service.post(`${port + lease}/baofoo/BaofooConfirmSign`, params).then(res => res.data)
// 提交意见audit/dealerCommit
export const dealerCommit = params => service.post(`${port + lease}/audit/dealerCommit`, params).then(res => res.data)
// 取消进件/audit/cancelPrcess
export const cancelPrcess = params => service.post(`${port + lease}/audit/cancelPrcess`, params).then(res => res.data)
// 取消进件/audit/cancelPrcess
export const getOperationalList = params => service.post(`${port + lease}/lease/getOperationalList`, params).then(res => res.data)
// /lease/app/checkProcess  客户操作流程，判断流程是否完成页面勾选
export const checkProcess = params => service.post(`${port + lease}/app/checkProcess`, params).then(res => res.data)
// lease/app/getRepayMentDetail
export const getRepayMentDetail = params => service.post(`${port + lease}/app/getRepayMentDetail`, params).then(res => res.data)
// /lease/app/getFileReturnTimeTree
export const getFileReturnTimeTree = params => service.post(`${port + lease}/app/getFileReturnTimeTree`, params).then(res => res.data)

export const addCurrentCarBrand = params => service.post(`${port + lease}/addCurrentCarBrand`, params).then(res => res.data)

// 获取车易融 融资租赁总价
export const getCYRTotalAmount = params => service.post(`${port + dealer}/lease/getCYRTotalAmount`, params).then(res => res.data)

// 获取产品列表(改版)  dealer 查询产品
export const getProductListByTokenid = params => service.post(`${port + dealer}/product/getProductListByTokenid`, params).then(res => res.data)
// 计算器 input事件
export const getMonthAmount = params => service.post(`${port + dealer}/lease/getMonthAmount`, params).then(res => res.data)
// 计算一账通
export const getServiceAmount = params => service.post(`${port + dealer}/lease/getServiceAmount`, params).then(res => res.data)
export const getAllValidators = params => service.post(`${port + dealer}/validate/getAllValidators`, params).then(res => res.data)
// /获取平台使用费(%)
export const leaseCommit = params => service.post(`${port + dealer}/lease/leaseCommit`, params).then(res => res.data)
export const leaseAdd = params => service.post(`${port + dealer}/product/addLease`, params).then(res => res.data)
// getPendingSubmit
export const getPendingSubmit = params => service.post(`${port + dealer}/process/getPendingSubmit`, params).then(res => res.data)
export const getCarAccess = params => service.post(`${port + dealer}/che300/getCarAccess`, params).then(res => res.data)
// /dealer/app/getPreAuditCustomers  进件申请用户列表接口
export const getPreAuditCustomers = params => service.post(`${port + dealer}/app/getPreAuditCustomers `, params).then(res => res.data)
// /dealer/app/resetLeaseEntity  进件申请重置lease
export const resetLeaseEntity = params => service.post(`${port + dealer}/app/resetLeaseEntity`, params).then(res => res.data)
// /Dictionary/selectGpsFee 获取GPS费用
export const selectGpsFee = params => service.post(`${port + dealer}/Dictionary/selectGpsFee`, params).then(res => res.data)
// /lease/getCustomerApplyList 查询苏宁核批金额
export const getCustomerApplyList = params => service.post(`${port + dealer}/lease/getCustomerApplyList`, params).then(res => res.data)
// Dictionary/selectDictionaryById
export const selectDictionary = params => service.post(`${port + dealer}/Dictionary/selectDictionaryById`, params).then(res => res.data)
// getChe300CarAccessByVin 车300VIN码
export const getChe300CarAccessByVin = params => service.post(`${port + dealer}/che300/getChe300CarAccessByVin`, params).then(res => res.data)
export const createChe300CarAccessPDF = params => service.post(`${port + dealer}/che300/createChe300CarAccessPDF`, params).then(res => res.data)
// getCreatedEvalPrice  获取评估价
export const getCreatedEvalPrice = (params, callback) => service.post(`${port + dealer}/che300/getCreatedEvalPrice`, params, callback).then(res => res.data)

// /attachment/selectAllFileDirByGroupId  code leaseid查产品
export const selectAllFileDirByGroupId = params => service.post(`${port + attachment}/selectAllFileDirByGroupId`, params).then(res => res.data)
// /attachment/file/getFileListByTypeId  id leaseid查影像件
export const getFileListByTypeId = params => service.post(`${port + attachment}/file/getFileListByTypeId`, params).then(res => res.data)
// /attachment/file/fileUpload 上传
export const fileUpload = (params, callback) => service.post(`${port + attachment}/file/fileUpload`, params, callback).then(res => res.data)
// deleteFile
export const deleteFile = params => service.post(`${port + attachment}/file/deleteFile`, params).then(res => res.data)
// selectAllFileNodeDirs 查询影像件节点
export const selectAllFileNodeDirs = params => service.post(`${port + attachment}/selectAllFileNodeDirs`, params).then(res => res.data)
// downLoadOcrFileFromOss  回显影像件列表
export const downLoadOcrFileFromOss = params => service.post(`${port + attachment}/downLoadOcrFileFromOss`, params).then(res => res.data)
// 上传oss===>nasdownloadFile
export const downloadFile = params => service.post(`${port}oss/downloadFile`, params).then(res => res.data)
export const queryStatus = params => service.post(`${port + autoreject}/autoreject/queryStatus`, params).then(res => res.data)
export const electronTag = params => service.post(`${port + autoreject}/electronTag`, params).then(res => res.data)
// 判断是不是经销商
export const getRole = params => service.post(`${port + autoreject}/role/getRole`, params).then(res => res.data)
// autoreject/RelevanceOcrInfo 授权申请ocr保存
export const RelevanceOcrInfo = params => service.post(`${port + autoreject}/RelevanceOcrInfo`, params).then(res => res.data)
// autoreject/getOcrInfoByEid
export const getOcrInfoByEid = params => service.post(`${port + autoreject}/getOcrInfoByEid`, params).then(res => res.data)
// getOcrInfosByEid eid查询行驶证ocr信息
export const getOcrInfosByEid = params => service.post(`${port + autoreject}/getOcrInfosByEid`, params).then(res => res.data)
// ocr  /ocr/interface/getCertNoInfo 身份证正反面
export const getCertNoInfo = (params, callback) => service.post(`${port + ocr}/interface/getCertNoInfo`, params, callback).then(res => res.data)
// ocr  /ocr/interface/getBankCardInfo 银行卡
export const getBankCardInfo = (params, callback) => service.post(`${port + ocr}/interface/getBankCardInfo`, params, callback).then(res => res.data)
// ocr  /ocr/interface/getDriverLicenceInfo 驾照
export const getDriverLicenceInfo = (params, callback) => service.post(`${port + ocr}/interface/getDriverLicenceInfo`, params, callback).then(res => res.data)
// /interface/getVehicleLicenseInfo  行驶证
export const getVehicleLicenseInfo = (params, callback) => service.post(`${port + ocr}/interface/getVehicleLicenseInfo`, params, callback).then(res => res.data)
// carport/interface/getEvalPriceRecordByUser 评车记录
export const getEvalPriceRecordByUser = (params, callback) => service.post(`${port + carport}/interface/getEvalPriceRecordByUser`, params, callback).then(res => res.data)
export const getLeaseCity = params => service.post(`${port + lease}/Dictionary/getLeaseCity`, params).then(res => res.data).catch(error => {

})
///lease/lease/showLeaseForm
export const showLeaseForm_lease = params => service.post(`${port + lease}/lease/showLeaseForm`, params).then(res => res.data).catch(error => {

})
//pasteFieldRecord 粘贴事件记录
export const pasteFieldRecord = params => service.post(`${port + dealer}/app/pasteFieldRecord `, params).then(res => res.data).catch(error => {

})
// 商户信息（首次）
export const getMerchantInfoByTokenId = params => service.get(`${port + dealermanage}/city/getMerchantInfoByTokenId?tokenId=${params.tokenId}`, params).then(res => res.data).catch(error => {

})
//贷款投向getLoanOrientation
export const getLoanOrientation = params => service.post(`${port + dealer}/Dictionary/getLoanOrientation`, params).then(res => res.data).catch(error => {

})
//Dictionary/selectProfessionListByTableId 工作三级
export const selectProfessionListByTableId = params => service.post(`${port + lease}/Dictionary/selectProfessionListByTableId`, params).then(res => res.data).catch(err => { });
//Dictionary/selectProfessionListByPositionCode 根据code查询职业名称
export const selectProfessionListByPositionCode = params => service.post(`${port + lease}/Dictionary/selectProfessionListByPositionCode`, params).then(res => res.data).catch(err => { });
//getOcrInfoByEid appDealer 获取ocr编辑信息
export const getOcrInputInfo = (params, callback) => service.post(`${port + dealer}/getOcrInputInfo`, params, callback).then(res => res.data).catch(error => { })
export const getLeaseProvince = params => service.post(`${port + lease}/Dictionary/getLeaseProvince`, params).then(res => res.data).catch(error => {

})
export const getPreAuditStatus = params => service.post(`${port + dealer}/autoreject/getPreAuditStatus`, params).then(res => res.data).catch(error => {

})
