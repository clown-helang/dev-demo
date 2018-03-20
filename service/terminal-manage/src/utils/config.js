import { menus } from './menus'

module.exports = {
  baseURL: window.baseConfig.baseURL,
  language: [
    {
      value: 'chi',
      text: '中文'
    },
    {
      value: 'eng',
      text: '英语'
    },
    {
      value: 'fre',
      text: '法文'
    },
  ],
  /*
   * 说明：
   * 1.menus下的key值，应该与components/Home/messages.js中的key值一致，以保证程序能够匹配
   * 2.menus下的key值，以及每一个value中对应的child中的code，构成了路由中的path路径，程序会根据path路径解析出来的code值，去一一匹配，所以请保持一致
   * 3.实例：Demo和child中的DemoChildMenu1
   *   a.在components/Home/messages.js的值为：
   *     Demo: {
   *        ...
   *      },
   *      DemoChildMenu1: {
   *        ...
   *      },
   *   b.在router/router.js中为：
   *     path: '/Demo/DemoChildMenu1',
   * 4.在不集成manage-portal的情况下，为了方便开发，请将menus的信息配置到public下的header.js中
   */
  menus
};
