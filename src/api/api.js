import service from './catchErr'
// let port = 'http://192.168.10.109:8134/'
const kaer = 'http://www.carcredit.com.cn/carcreditNews/selectNewsTheFirstFour'
const port = 'https://test.carcredit.com.cn/'
const xrtxport = 'https://test.xrlease.com' // 'https://ccbs.xrlease.com'
const authcenter = 'authcenter'
const lease = 'lease'
const dealer = 'appdealer'
const attachment = 'attachment'
const autoreject = 'autoreject'
const ocr = 'ocr'
const carport = 'carport'

export const insertDaily = params => service.post(`/datacenter/public/insert`, params).then(res => res.data)
export const selectOneDaily = params => service.post(`/datacenter/public/selectPage`, params).then(res => res.data)
// 官网
export const selectNewsTheFirstFour = params => service.post(`${kaer}`, params).then(res => res.data)
// 鑫融天下 登录
export const xrtxCheckLogin = (params, callback) => service.post(`${xrtxport}/xrtxauthcenter/defaultOpenPath/checkLogin`, params, callback).then(res => res.data)
// 鑫融天下 发送验证码
export const xrtxSendSms = params => service.post(`${xrtxport}/xrtxauthcenter/defaultOpenPath/sendSms`, params).then(res => res.data)
// 鑫融天下 退出
export const xrtxLogout = params => service.post(`${xrtxport}/xrtxauthcenter/login/logout`, params).then(res => res.data)
// 鑫融天下  短信验证 登录
export const xrtxCheckAppAuthCode = params => service.post(`${xrtxport}/xrtxauthcenter/defaultOpenPath/checkAppAuthCode`, params).then(res => res.data)
// 鑫融天下  修改密码
export const xrtxChangePassword = params => service.post(`${xrtxport}/xrtxauthcenter/user/changePassword`, params).then(res => res.data)
// 鑫融天下  获取流程全览
export const xrtxGetProcessList = params => service.post(`${xrtxport}/xrtxdealer/process/getProcessList`, params).then(res => res.data)
export const xrtxShowAnnounce = params => service.post(`${xrtxport}/xrtxauthcenter/announcement/showAnnounce`, params).then(res => res.data)
export const xrtxShowHistory = params => service.post(`${xrtxport}/xrtxauthcenter/announcement/showHistory`, params).then(res => res.data)
export const xrtxShowAnnounceDetails = params => service.post(`${xrtxport}/xrtxauthcenter/announcement/showAnnounceDetails`, params).then(res => res.data)

// https://zuul.carcredit.com.cn/authcenter/defaultOpenPath/addLoginLog
export const addLoginLog = params => service.post(`${port + authcenter}/defaultOpenPath/addLoginLog`, params).then(res => res.data)
// export const checkLogin = params => service.post(`${port + authcenter}/login/checkLogin`, params).then(res => res.data).catch(error => {
//
// })
// 判断角色
export const checkLogin = params => service.post(`${port + authcenter}/defaultOpenPath/checkLogin`, params).then(res => res.data)
// 短信验证 登录
export const checkAppAuthCode = params => service.post(`${port + authcenter}/defaultOpenPath/checkAppAuthCode`, params).then(res => res.data)
// 发送验证码
export const sendSms = params => service.post(`${port + authcenter}/defaultOpenPath/sendSms`, params).then(res => res.data)
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
// lease/process/getAllTaskMsgList 流程备注
export const getAllTaskMsgList = params => service.post(`${port + lease}/process/getAllTaskMsgList`, params).then(res => res.data)
// /lease/lease/showLeaseForm
export const showLeaseForm = params => service.post(`${port + dealer}/lease/showLeaseForm`, params).then(res => res.data)
// /lease/attachment/getAttachmentList  影像件管理查询
export const getAttachmentList = params => service.post(`${port + dealer}/attachment/getAttachmentList`, params).then(res => res.data)
// getMerchantList  查询incoming-info 商户名称
export const getMerchantList = params => service.post(`${port + dealer}/lease/getMerchantList`, params).then(res => res.data)
// getMerchantById
export const getMerchantById = params => service.post(`${port + dealer}/lease/getMerchantById`, params).then(res => res.data)
// 查询提交必传 commitCheckFiles
export const commitCheckFiles = params => service.post(`${port + dealer}/commitCheckFiles`, params).then(res => res.data)
export const getAppVersionInfo = params => service.post(`${port + dealer}/app/defaultOpenPath/getAppVersionInfo`, params).then(res => res.data)
// /lease/lease/showLeaseForm
export const showLeaseForm_lease = params => service.post(`${port + lease}/lease/showLeaseForm`, params).then(res => res.data)
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
// lease/app/getDealerLoanDataDetail 逾期/正常
export const getDealerLoanDataDetail = params => service.post(`${port + lease}/app/getDealerLoanDataDetail`, params).then(res => res.data)
// lease/app/getFileReturnCustomers 归档状态
export const getFileReturnCustomers = params => service.post(`${port + lease}/app/getFileReturnCustomers`, params).then(res => res.data)
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
export const getAllAreas = params => service.post(`${port + dealer}/Dictionary/getAllAreas`, params).then(res => res.data)
export const getAllValidators = params => service.post(`${port + dealer}/validate/getAllValidators`, params).then(res => res.data)
// 获取平台使用费(%)
export const getAllDictionaries = params => service.post(`${port + dealer}/Dictionary/getAllDictionaries`, params).then(res => res.data)
// /获取平台使用费(%)
export const leaseCommit = params => service.post(`${port + dealer}/lease/leaseCommit`, params).then(res => res.data)
export const leaseAdd = params => service.post(`${port + dealer}/product/addLease`, params).then(res => res.data)
export const getPreAuditStatus = params => service.post(`${port + dealer}/autoreject/getPreAuditStatus`, params).then(res => res.data)
// getPendingSubmit
export const getPendingSubmit = params => service.post(`${port + dealer}/process/getPendingSubmit`, params).then(res => res.data)
export const getCarAccess = params => service.post(`${port + dealer}/che300/getCarAccess`, params).then(res => res.data)
// /dealer/app/getPreAuditCustomers  进件申请用户列表接口
export const getPreAuditCustomers = params => service.post(`${port + dealer}/app/getPreAuditCustomers `, params).then(res => res.data)
// /dealer/app/resetLeaseEntity  进件申请重置lease
export const resetLeaseEntity = params => service.post(`${port + dealer}/app/resetLeaseEntity`, params).then(res => res.data)
// /Dictionary/selectGpsFee 获取GPS费用
export const selectGpsFee = params => service.post(`${port + dealer}/Dictionary/selectGpsFee`, params).then(res => res.data)
// 查询不同产品_字段
export const getProductInput = params => service.post(`${port + dealer}/app/getProductInput`, params).then(res => res.data)
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
// 查看二级目录影像件
export const getFileListByFileDirId = params => service.post(`${port + attachment}/getFileListByFileDirId`, params).then(res => res.data)
// /attachment/file/fileUpload 上传
export const fileUpload = (params, callback) => service.post(`${port + attachment}/file/fileUpload`, params, callback).then(res => res.data)
// deleteFile
export const deleteFile = params => service.post(`${port + attachment}/file/deleteFile`, params).then(res => res.data)
// selectAllFileNodeDirs 查询影像件节点
export const selectAllFileNodeDirs = params => service.post(`${port + attachment}/selectAllFileNodeDirs`, params).then(res => res.data)
// downLoadOcrFileFromOss  回显影像件列表
export const downLoadOcrFileFromOss = params => service.post(`${port + attachment}/downLoadOcrFileFromOss`, params).then(res => res.data)
// https://zuul.carcredit.com.cn/attachment/getStsToken
export const getStsToken = params => service.post(`${port}oss/getStsToken`, params).then(res => res.data)
// 上传oss===>nasdownloadFile
export const downloadFile = params => service.post(`${port}oss/downloadFile`, params).then(res => res.data)
export const queryStatus = params => service.post(`${port + autoreject}/autoreject/queryStatus`, params).then(res => res.data)
export const electronTag = params => service.post(`${port + autoreject}/electronTag`, params).then(res => res.data)
// 判断是不是经销商
export const getRole = params => service.post(`${port + autoreject}/role/getRole`, params).then(res => res.data)
// 获取预审批成功
export const getPreAudits = params => service.post(`${port + autoreject}/interface/getPreAudits`, params).then(res => res.data)
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
