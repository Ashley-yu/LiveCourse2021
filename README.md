# Vue 作品實戰班 - 2021夏季

## 第一週 - 關注點分離
[關注點分離](https://ashley-yu.github.io/LiveCourse2021/week01/dist/index.html)
- JavaScript
  - 縮寫形式
  - 樣板字面值
  - 陣列方法
  - ESModule
- 關注點分離
  - HTML, JS 分離
  - 資料與方法分離

## 第二週 - RESTful API 串接
[RESTful API](https://ashley-yu.github.io/LiveCourse2021/week02/dist/index.html)
- Axios / 非同步
- Promise
- this

## 第三週 - Vue.js 起步走
[Vue Js](https://ashley-yu.github.io/LiveCourse2021/week03/login.html)
- MVVM (View viewModel Model)
- 指令
  - v-bind
    - 使用於屬性, 可簡寫為 :
  - v-model
    - 雙向綁定
  - v-if, v-else
    - 判斷條件顯示
  - v-on
    - 使用於事件, 可簡寫為 @
  - v-for
    - 可用於物件及陣列, 需加 key

## 第四週 - Vue 元件
[Vue Js](https://ashley-yu.github.io/LiveCourse2021/week04/login.html)
- 元件註冊
  - 全域註冊
  - 區域註冊 (import)
- 模板運用
  - Template Literial
  - x-template type=“text/x-template”
  - Vue Cli Vue file
- 元件資料建構方式
  - function return
- HTML 上的運用方式
  - 標籤
  - v-is 屬性（動態屬性）
- [元件命名規則](https://vue3js.cn/docs/zh/guide/component-registration.html#组件注册)
- 元件資料傳遞
  - 上到下：prop
  - 下到上：$emit
  - 口訣：HTML 前內，後外
- [元件生命週期](https://vue3js.cn/docs/zh/guide/instance.html#生命周期图示)
- mitt
	 ```
    // 匯入 mitt 的元件並調用它
	  const emitter = mitt();
	 ```
	 ```
    // 元件A 推送資料至另一個元件B
	  emitter.emit('getData', this.text);
	 ```
	 ```
    // 元件B 接收來自於元件A的資料
	  emitter.on('getData', (msg) => {
	    this.text = msg;
	  });
	 ```

## 第五週 - Vue JS 進階方法
[Vue Js 進階語法](https://ashley-yu.github.io/LiveCourse2021/week05/login.html)

- [VeeValidation](https://hackmd.io/FFv0a5cBToOATP7uI5COMQ)


