// 用戶可以新增產品，新增後會移除 input 的內容
// 用戶可以針對產品切換啟用狀態
// 用戶可以刪除單一產品
// 用戶可以一鍵刪除所有產品
// console.clear();
const productList = document.querySelector('.productList tbody');
const newProduct = document.querySelector('.newProduct');
const deleteAllBtn = document.querySelector('.deleteAllBtn');
const total = document.querySelector('.total');

let productData = [
  {
    id: 1620871937228,
    title: "產品",
    origin_price: "200",
    price: "150",
    is_enabled: true,
  },
];

// 顯示產品
function renderProductList() {
  productList.innerHTML = productData.map(item => {
    return `
      <tr>
        <td width="30%">${item.title}</td>
        <td width="15%">$ ${item.origin_price}</td>
        <td width="15%">$ ${item.price}</td>
        <td width="25%">
          <div class="form-check form-switch">
            <input class="form-check-input custom-control-input" id="${item.id}" ${item.is_enabled? 'checked': ''} type="checkbox" data-action="status" data-id="${item.id}"/>
            <label class="form-check-label" for="${item.id}">${item.is_enabled? '啟用' : '未啟用'}</label>
          </div>
        </td>
        <td width="15%">
          <button class="btn btn-sm btn-outline-dark shadow-none" type="button" data-action="remove" data-id="${item.id}">X</button>
        </td>
      </tr>`
  }).join('');
  
  total.textContent = `目前有 ${productData.length} 項產品`;
}

// 新增產品
function addNewProduct(e) {
  e.preventDefault();
  
  productData.push({
    id: Date.now(),
    title: document.querySelector("#title").value.trim(),
    origin_price: document.querySelector("#originPrice").value || 0,
    price: document.querySelector("#price").value || 0,
    is_enabled: false,
  })
  newProduct.reset();
  renderProductList();
}
// 刪除所有產品
function clearProducts() {
  productData = [];
  renderProductList();
}
// 更新啟用狀態
function updateStatus(id) {
  productData.forEach(item => {
    if(item.id == id) {
      item.is_enabled = !item.is_enabled;
      renderProductList();
    }
  });
}
// 刪除產品
function deleteProduct(id) {
  let index = productData.findIndex(item => item.id == id);
  productData.splice(index, 1);
  renderProductList();
}
// 判斷觸發事件
function setProductEvent(e) {
  if(e.target.dataset.action === "status") {
    updateStatus(e.target.dataset.id);
  } else if(e.target.dataset.action === "remove") {
    deleteProduct(e.target.dataset.id);
  }
}

renderProductList();
newProduct.addEventListener('submit', addNewProduct);
productList.addEventListener('click', setProductEvent);
deleteAllBtn.addEventListener('click', clearProducts);