// console.clear();
const url = 'https://vue3-course-api.hexschool.io';

const username = document.querySelector('#username');
const password = document.querySelector('#password');
const loginForm = document.querySelector('#form');
const loginSection = document.querySelector('.login');
const listSection = document.querySelector('.list');
const productList = document.querySelector('.productList tbody');
const total = document.querySelector('.total');
const errArea = document.querySelector('.errArea');
const errMsg = document.querySelector('.errMsg');
const loading = document.querySelector('.loading');

const app = {
  data: {
    apiUrl: 'https://vue3-course-api.hexschool.io/api',
    apiPath: 'course',
    productData: [],
  },
  deleteProduct(id) {
    const url = `${this.data.apiUrl}/${this.data.apiPath}/admin/product/${id}`;

    if(confirm("確認刪除此商品？")){
      axios.delete(url).then( res => {
        if (res.data.success) {
          alert(res.data.message);
          this.getProducts();
        } else {
          alert(res.data.message);
        }
      }).catch( error => {
        alert(error);
      });
    }
  },
  updateStatus(id) {
    this.data.productData.forEach(item => {
      if(item.id === id) {
        item.is_enabled = !item.is_enabled;
        this.renderProductList();
      }
    });
  },
  setProductEvent(e) {
    if(e.target.dataset.action === "status") {
      this.updateStatus(e.target.dataset.id);
    } else if(e.target.dataset.action === "remove") {
      this.deleteProduct(e.target.dataset.id);
    }
  },
  renderProductList() {
    productList.innerHTML = this.data.productData.map(item => {
      return `
        <tr>
          <td width="30%">${item.title}</td>
          <td width="15%">$ ${item.origin_price}</td>
          <td width="15%">$ ${item.price}</td>
          <td width="25%">
            <div class="form-check form-switch">
              <input class="form-check-input custom-control-input" id="${item.id}" ${item.is_enabled ? 'checked' : ''} type="checkbox" data-action="status" data-id="${item.id}"/>
              <label class="form-check-label" for="${item.id}">${item.is_enabled ? '啟用' : '未啟用'}</label>
            </div>
          </td>
          <td width="15%">
            <button class="btn btn-sm btn-outline-dark shadow-none" type="button" data-action="remove" data-id="${item.id}">X</button>
          </td>
        </tr>`
    }).join('');

    total.textContent = `目前有 ${this.data.productData.length} 項產品`;
  },
  getProducts(page=1) {
    const url = `${this.data.apiUrl}/${this.data.apiPath}/admin/products?page=${page}`;
    axios.get(url).then( res => {
      if (res.data.success) {
        this.data.productData = res.data.products;
        this.renderProductList();
      } else {
        alert(res.data.message);
        listSection.classList.add("d-none");
        loginSection.classList.remove("d-none");
      }
    })
    .catch( error => {
      alert(error);
    })
  },
  init(token) {
    // 取得 token 並帶入 header
    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    
    this.getProducts();
    
    // dom 元素監聽事件, this 的指向 改變
    // 使用 bind 強制指定 this
    productList.addEventListener('click', this.setProductEvent.bind(this));
  }
}

function login(e) {
  e.preventDefault();
  
  const api = `${url}/admin/signin`;
  const data = {
    username: username.value,
    password: password.value,
  }
  
  errArea.classList.add("d-none");
  errArea.classList.remove("show");
  loading.classList.remove("d-none");
  axios.post(api, data).then( res => {
    if(res.data.success){
      const { token, expired } = res.data;
      // 將 token 存至 cookie
      // document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
      loginSection.classList.add("d-none");
      listSection.classList.remove("d-none");
      loading.classList.add("d-none");
      app.init(token);
    } else {
      errMsg.textContent = res.data.message;
      errArea.classList.remove("d-none");
      errArea.classList.add("show");
      loading.classList.add("d-none");
    }
  }).catch( error => {
    alert(error);
    loading.classList.add("d-none");
  });
}

loginForm.addEventListener('submit', login);
