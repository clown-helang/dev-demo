import Header from './zh-Hans-CN/header';

const System = {
  "common.System.title": "酒店管理云平台",
}

const Login = {
  "common.login.title": System["common.System.title"],
  "common.login.username.label": "请输入帐号",
  "common.login.username.vtype": "帐号必填",
  "common.login.password.label": "请输入密码",
  "common.login.password.vtype": "密码必填",
  "common.login.remember": "记住密码",
  "common.login.forgotPass": "忘记密码",
  "common.login.login": "登录",
  'common.login.password.title': '密码修改',
  'common.login.password.oldpassword': '请输入旧密码',
  'common.login.password.confirmpassword': '请输入确认密码',
  'common.login.password.passwordnotsame': '两次输入的密码不一致',
  'common.login.password.change_passwd': '密码修改',
  'common.login.password.oldpassword.label': '旧密码',
  'common.login.password.newpasswd.label': '新密码',
  'common.login.password.confirmppasswd.label': '确认密码',
  'common.login.password.password_illegal': '密码长度不合法，请输入6~12位密码',
  'common.login.password.newpassword_illegal': '新密码不允许包含特殊字符',
  'company':'北京四达时代软件技术股份有限公司',
};

const Home = {
  'common.home.welcome.title':`欢迎使用${System["common.System.title"]}`,
}
const Account = {
  "common.Account.title": "帐号修改",
  "common.Account.account": "帐号",
  "common.Account.name": "名称",
  "common.Account.phone": "电话",
  "common.Account.email": "邮箱",
  "common.Account.email_illegal": "邮箱格式不正确",
  "common.Account.nameNotNull": "名称不能为空",
  'common.Account.form.phone_illegal': '输入电话号码不合法',
}
const errorResult = {
  "noPermissions": "您没有当前操作请求的权限！",
  //10 帐号权限管理
  "10400": "请求参数错误.",
  "10453": "帐号或密码错误",
  "10454": "用户不存在",
  "10455": "原密码错误",
  "10500": "服务异常",
  //other
  "204": "操作成功.",
  '400': '请求参数错误.',
  "error": "提示信息",
  "commom.Error.nologin.title": "重新登录",
  "commom.Error.nologin.content": "对不起，登录会话超时，请重新登录",
  "no.select.rows": "请选择要操作的数据.",
  "common.Error.PageNotFound": "您要请求的页面不存在.",
}

const changePasswd = {
  "common.changePasswd.changePwdSuccess":"密码修改成功"
}
export default {...Login, ...Header, ...Home, ...errorResult,...changePasswd,...Account};
