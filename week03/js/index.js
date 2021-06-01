import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

// 呈現產品列表、新增產品、刪除產品、編輯產品功能
// 產品啟用、關閉可以使用不同的顏色標示
createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io',
      apiPath: 'course',
      productData: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      isLoading: true,
    }
  },
  methods: {
    showModal(modal, item) {
      if (modal === 'new') {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
        };
        productModal.show();
      } else if (modal === 'edit') {
        this.isNew = false;
        this.tempProduct = { ...item };
        productModal.show();
      } else {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
    deleteProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      this.isLoading = true;
      axios.delete(url).then(res => {
        if (res.data.success) {
          alert(res.data.message);
          delProductModal.hide();
          this.getProducts();
        } else {
          alert(res.data.message);
        }
        this.isLoading = false;
      }).catch( err => {
        alert(err);
        this.isLoading = false;
      })
    },
    updateProduct() {
      // 新增
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let httpMethod = 'post';
  
      // 編輯
      if(!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put'
      }

      this.isLoading = true;
      axios[httpMethod](url,  { data: this.tempProduct }).then(res => {
        if(res.data.success) {
          alert(res.data.message);
          productModal.hide();
          this.getProducts();
        } else {
          alert(res.data.message);
        }
        this.isLoading = false;
      }).catch( err => {
        alert(err);
        this.isLoading = false;
      })
    },
    getProducts(page=1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;

      this.isLoading = true;
      axios.get(url).then( res => {
        if (res.data.success) {
          this.productData = res.data.products;
        } else {
          alert(res.data.message);
        }
        this.isLoading = false;
      }).catch( err => {
        alert(err);
        this.isLoading = false;
      })
    },
    logout() {
      const url = `${this.apiUrl}/logout`;
      axios.post(url).then(res => {
        if (res.data.success) {
          document.cookie = `hexToken=;expires=; path=/`;
          window.location = "login.html";
        }
      }).catch( err => {
        alert(err);
      });
    },
    setModal() {
      productModal = new bootstrap.Modal(document.getElementById('productModal'), {
        keyboard: false
      });

      delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false
      });
    },
    setToken() {
      // 取得 token 並帶入 header
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token === "") {
        alert("Please login again.")
        window.location = 'login.html';
      }
      axios.defaults.headers.common.Authorization = token;
      this.getProducts();
    }
  },
  mounted() {
    this.setModal();
    this.setToken();
  },
}).mount('#app');
