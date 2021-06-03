import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import pagination from './components/pagination.js';

const apiUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = 'course';

let productModal = null;
let delProductModal = null;

// 將後台頁面 Modal 以及分頁改使用元件
// 使用 import module 來引入元件（分頁元件）
// 完成登入頁面
const app = createApp({
  components: {
    pagination
  },
  data() {
    return {
      productData: [],
      pagination: {},
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      isLoading: false,
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
        this.tempProduct = JSON.parse(JSON.stringify(item));
        productModal.show();
      } else {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
    getProducts(page=1) {
      const url = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;

      this.isLoading = true;
      axios.get(url).then( res => {
        if (res.data.success) {
          this.productData = res.data.products;
          this.pagination = res.data.pagination;
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
      const url = `${apiUrl}/logout`;
      axios.post(url).then(res => {
        if (res.data.success) {
          document.cookie = `hexToken=;expires=; path=/`;
          window.location = "login.html";
        }
      }).catch( err => {
        alert(err);
      });
    },
    setLoading(state) {
      this.isLoading = state;
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
    this.setToken();
  },
});

// component
// Loading
app.component('loading', {
  template: '#loading',
  props: { isShow: { type: Boolean, default: false } }
})

// New / Edit modal
app.component('productModal', {
  template: '#productModal',
  props: { 
    product: { type: Object, default: () => {} },
    isNew: { type: Boolean, default: false }
  },
  methods: {
    updateProduct() {
      // 新增
      let url = `${apiUrl}/api/${apiPath}/admin/product`;
      let httpMethod = 'post';
  
      // 編輯
      if(!this.isNew) {
        url = `${apiUrl}/api/${apiPath}/admin/product/${this.product.id}`;
        httpMethod = 'put'
      }

      this.$emit('updateLoading', true);
      axios[httpMethod](url,  { data: this.product }).then(res => {
        if(res.data.success) {
          alert(res.data.message);
          productModal.hide();
          this.$emit('updateProducts');
        } else {
          alert(res.data.message);
          this.$emit('updateLoading', false);
        }
      }).catch( err => {
        alert(err);
        this.$emit('updateLoading', false);
      })
    },
    setModal() {
      productModal = new bootstrap.Modal(this.$refs.productModal, {
        keyboard: false
      });
    },
  },
  mounted() {
    this.setModal();
  },
})

// Delete modal
app.component('delProductModal', {
  template: '#delProductModal',
  props: {
    product: { type: Object, default: ()=>{} }
  },
  methods: {
    deleteProduct() {
      const url = `${apiUrl}/api/${apiPath}/admin/product/${this.product.id}`;

      this.$emit('updateLoading', true);
      axios.delete(url).then(res => {
        if (res.data.success) {
          alert(res.data.message);
          delProductModal.hide();
          this.$emit('updateProducts');
        } else {
          alert(res.data.message);
          this.$emit('updateLoading', false);
        }

      }).catch( err => {
        alert(err);
        this.$emit('updateLoading', false);
      })
    },
    setModal() {
      delProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
        keyboard: false
      });
    },
  },
  mounted() {
    this.setModal();
  },
})

app.mount('#app');
