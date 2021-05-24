import {
  getAllDictionarie,
  getAllAreas,
  getAllValidators
} from './../../api/api'



const dictionary = {}

const area = {}
const rules = {}

function _getAllValidators() {
  return getAllValidators({}).then(res => {
    let rules = {};
    let validators = res.data;
    for (let i = 0; i < validators.length; i++) {
      let checker = [];
      if (validators[i].required) {
        checker.push({
          required: validators[i].required,
          message: '请输入' + validators[i].description
          // trigger: 'blur'
        });
      }
      if (validators[i].regex) {
        checker.push({
          pattern: new RegExp(validators[i].regex),
          message: validators[i].description + '格式有误',
          trigger: 'blur'
        });
      }
      rules[validators[i].item] = checker;
    }
    return rules
  })
}

function initDic() {
  return getAllDictionarie().then(res => {
    if (res.code == 0) {
      return res.data
    }
  })
}

function initArea() {
  return getAllAreas().then(res => {
    if (res.code == 0) {
      return res.data
    }
  })
}
export default {
  initDic,
  initArea,
  dictionary,
  area,
  _getAllValidators,
  rules
}
