import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io',
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      const api = `${this.url}/admin/signin`;

      axios.post(api, this.user).then( res => {
        if(res.data.success){
          // 將 token 存至 cookie
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
          window.location = "index.html";
        } else {
          alert(res.data.message);
        }
      }).catch( err => {
        alert(err);
      });
    },
  },
}).mount('#app');