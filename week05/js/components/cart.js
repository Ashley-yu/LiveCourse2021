const apiUrl = 'https://vue3-course-api.hexschool.io';
const apiPath = 'course';

export default {
    props: {
        cart: { type: Object, default: () => { } },
        total: { type: Number, default: 0 },
    },
    template:`
    <div id="cartModal" ref="cartModal" class="modal fade right" tabindex="-1" aria-labelledby="cartModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="cartModalLabel" class="modal-title">
              <span>Cart</span>
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-3">
            <div v-if="total === 0">
              <h3 class="text-secondary">
                Your cart is currently empty
              </h3>
              <p class="fs-4 m-0">
                <i class="material-icons">
                  west
                </i>
                Shopping now!
              </p>
            </div>
            <div v-else>
              <ul class="list-group">
                <li class="list-group-item border-0 border-bottom p-3" v-for="item in cart.carts" :key="item.product_id">
                  <div class="row">
                    <div class="col-4">
                      <img class="cart-img" :src="item.product.imageUrl" :alt="item.product.title">
                    </div>
                    <div class="col-6">
                      <h5 class="mb-1">{{ item.product.title }}</h5>
                      <p class="m-0 mb-1">{{ currency(item.product.price) }}</p>
                      <div>
                        <select class="form-select form-select-sm" v-model.number="item.qty"
                                @change="updateCart(item.id, item.qty)">
                          <option :value="number" v-for="(number, index) in 10" :key="index">{{ number }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-2 text-end">
                      <a href="" class="rounded-circle p-2"
                        @click.prevent="deleteCartProduct(item.id)">
                        <i class="material-icons text-secondary fs-6">clear</i>
                      </a>
                    </div>
                  </div>
                </li>
                <li class="list-group-item border-0 p-3">
                  <div class="row">
                    <div class="col-4">
                      <p>
                        Total:
                      </p>
                    </div>
                    <div class="col-5">
                      <div class="mb-1">
                        <p>{{ currency(total) }}</p>
                      </div>
                    </div>
                    <div class="col-3 text-end">
                      <a href="" class="text-decoration-none text-secondary"
                         @click.prevent="clearCart">Clear All</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer" v-if="total !== 0">
            <button type="button" class="btn btn-light w-25" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" class="btn btn-dark w-25" @click="toCheckoutPage">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    `,
    methods: {
        currency(number) {
            return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        },
        updateCart(id, qty) {
            const url = `${apiUrl}/api/${apiPath}/cart/${id}`
            const cart = {
                product_id: id,
                qty
            }

            this.$emit('updateLoading', true);
            axios.put(url, { data: cart }).then(res => {
                if (res.data.success) {
                    this.$emit('getCart');
                } else {
                    this.$emit('updateLoading', false);
                }
                alert(res.data.message);
            }).catch(err => {
                alert(err);
                this.$emit('updateLoading', false);
            })
        },
        deleteCartProduct(id) {
            const url = `${apiUrl}/api/${apiPath}/cart/${id}`

            this.$emit('updateLoading', true);
            axios.delete(url).then(res => {
                if (res.data.success) {
                    this.$emit('getCart');
                }
                this.$emit('updateLoading', false);
                alert(res.data.message);
            }).catch(err => {
                alert(err);
                this.$emit('updateLoading', false);
            })
        },
        clearCart() {
            const url = `${apiUrl}/api/${apiPath}/carts`

            this.$emit('updateLoading', true);
            axios.delete(url).then(res => {
                if (res.data.success) {
                    this.$emit('getCart');
                }
                this.$emit('updateLoading', false);
                alert(res.data.message);
            }).catch(err => {
                alert(err);
                this.$emit('updateLoading', false);
            })
        },
        toCheckoutPage() {
          window.location = 'checkout.html';
        }
    },
}
