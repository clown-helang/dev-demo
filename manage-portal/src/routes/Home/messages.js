import {defineMessages} from 'react-intl';

const messages = defineMessages({
    welcometitle: {
        id: 'common.home.welcome.title',
        defaultMessage: '欢迎使用STAROTT'
    },
    title: {
        id: 'common.login.title',
        defaultMessage: 'STAROTT'
    },
    username: {
        label: {
            id: 'common.login.username.label',
            defaultMessage: '请输入用户名'
        },
        vtype: {
            id: 'common.login.username.vtype',
            defaultMessage: '用户名必填'
        }
    },
    password: {
        title: {
          id: 'common.login.password.title',
          defaultMessage: '密码修改'
        },
        label: {
            id: 'common.login.password.label',
            defaultMessage: '请输入密码'
        },
        vtype: {
            id: 'common.login.password.vtype',
            defaultMessage: '密码必填'
        },
        oldpassword: {
          id: 'common.login.password.oldpassword',
          defaultMessage: '请输入旧密码'
        },
        confirmpassword: {
          id: 'common.login.password.confirmpassword',
          defaultMessage: '请输入确认密码'
        },
        passwordnotsame: {
          id: 'common.login.password.passwordnotsame',
          defaultMessage: '两次输入的密码不一致'
        },
        changepasswd: {
          id: 'common.login.password.change_passwd',
          defaultMessage: '密码修改'
        },
        oldpasswordlabel: {
          id: 'common.login.password.oldpassword.label',
          defaultMessage: '旧密码'
        },
        newpasswdlabel: {
          id: 'common.login.password.newpasswd.label',
          defaultMessage: '新密码'
        },
        confirmppasswdlabel: {
          id: 'common.login.password.confirmppasswd.label',
          defaultMessage: '确认密码'
        },
    },
    remember: {
        id: 'common.login.remember',
        defaultMessage: '记住',
    },
    forgotPass: {
        id: 'common.login.forgotPass',
        defaultMessage: '忘记密码'
    },
    login: {
        id: 'common.login.login',
        defaultMessage: '登录'
    },
});

export default messages;
