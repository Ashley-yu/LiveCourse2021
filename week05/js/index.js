import loading from './components/loading.js';
import pagination from './components/pagination.js';
import cart from './components/cart.js';
import productDetail from './components/productDetail.js';

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { email } = VeeValidateRules;

defineRule('required', value => {
  if (!value || !value.length) {
    return 'This field is required';
  }
  return true;
});

defineRule('email', email);

// 加入多國語系
// const { localize, loadLocaleFromURL } = VeeValidateI18n;
// loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');
// configure({
//   generateMessage: localize('zh_TW'),
// });

const apiUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = 'course';

// 1.製作 loading 效果

// 2.前台頁面串接 API:
//  頁面模板
//  產品列表
//  單一產品細節
//  加入購物車
//  購物車列表
//  刪除購物車項目（單一、全部）
//  調整購物車產品數量
//  結帳付款

// 注意：
// 新增相同產品到購物車時需累加項目
// 送出訂單後，購物車需要清除原本項目
// 購物車無產品時不建議發出結帳請求

// 3.前台頁面表單驗證（必要完成），驗證內容包含：
//  姓名：必填
//  Email：必填 / 需要符合格式 / input type 為 email
//  電話：必填 / 超過 8 碼 / input type 為 tel
//  地址：必填
//  留言：非必填

const app = {
  components: {
    loading,
    pagination,
    cart,
    productDetail
  },
  data() {
    return {
      productData: [],
      product: [],
      cartData: [],
      cartCount: 0,
      finalTotal: 0,
      pagination: {},
      tempProduct: {},
      order: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: ''
      },
      isLoading: false,
      cartModal: null,
      productDetailModal: null,
    }
  },
  methods: {
    currency(number) {
      return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    },
    getProducts(page=1) {
      const url = `${apiUrl}/api/${apiPath}/products?page=${page}`;

      this.isLoading = true;
      axios.get(url).then(res => {
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
    getCart() {
      const url = `${apiUrl}/api/${apiPath}/cart`;

      axios.get(url).then(res => {
        if (res.data.success) {
          this.cartData = res.data.data;
          this.finalTotal = res.data.data.final_total;
          this.getCartCount();
        } else {
          alert(res.data.message);
        }
        this.isLoading = false;
      }).catch(err => {
        alert(err);
        this.isLoading = false;
      });
    },
    getCartCount() {
      this.cartCount = 0;
      this.cartData.carts.forEach(item => {
        this.cartCount += item.qty;
      })
    },
    addToCart(id, qty = 1) {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      const cart = {
        product_id: id,
        qty,
      };

      this.isLoading = true;
      axios.post(url, {data: cart}).then(res => {
        if (res.data.success) {
          this.getCart();
        }
        alert(res.data.message);
        this.isLoading = false;
      }).catch(err => {
        alert(err);
        this.isLoading = false;
      })
    },
    createOrder() {
      const url = `${apiUrl}/api/${apiPath}/order`;

      this.isLoading = true;
      axios.post(url, { data: this.order }).then(res => {
        if (res.data.success) {
          this.$refs.form.resetForm();
          this.getCart();
          window.location = "index.html";
        }
        alert(res.data.message);
        this.isLoading = false;
      }).catch(res => {
        alert(err);
        this.isLoading = false;
      }) 
    },
    setLoading(state) {
      this.isLoading = state;
    },
    showDetailModal(item) {
      this.tempProduct = JSON.parse(JSON.stringify(item));
      this.productDetailModal.show();
    },
    setModal() {
      this.productDetailModal = new bootstrap.Modal(document.getElementById('productDetailModal'));
      this.cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    },
    isPhone(value) {
      if (!value || !value.length) {
        return 'This field is required';
      }
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value);
    }
  },
  mounted() {
    this.setModal();
    this.getProducts();
    this.getCart();
  },
};

Vue.createApp(app)
  .component('VForm', Form)
  .component('VField', Field)
  .component('ErrorMessage', ErrorMessage)
  .mount('#app');
