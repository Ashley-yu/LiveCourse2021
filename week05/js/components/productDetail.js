export default {
    props: {
        product: { type: Object, default: () => { } }
    },
    data() {
        return {
            qty: 1,
        }
    },
    template:
    `
    <div id="productDetailModal" ref="productDetailModal" class="modal fade" tabindex="-1"
      aria-labelledby="productDetailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0">
          <div class="modal-header bg-white border-0">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-0">
            <div class="container">
              <div class="row">
                <div class="col-lg-6">
                  <img class="img-fluid" :src="product.imageUrl" :alt="product.title">
                </div>
                <div class="col-lg-6">
                  <h4 class="mt-3 mt-lg-0">{{ product.title }}</h4>
                  <p>{{ product.description }}</p>
                  <div class="d-flex justify-content-start align-items-center mb-3">
                    <p class="m-0 me-1 text-muted text-decoration-line-through fw-bold fs-5"
                      v-if="product.origin_price !== product.price">
                      {{ product.origin_price?currency(product.origin_price):0 }}
                    </p>
                    <p class="m-0 fw-bold fs-5"
                      :class="{'text-danger': product.origin_price !== product.price}">
                      {{ product.price?currency(product.price):0 }}
                    </p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <select class="form-select form-select w-50" v-model.number="qty">
                      <option :value="number" v-for="(number, index) in 10" :key="index">{{ number }}</option>
                    </select>
                    <button class="btn btn-dark"
                            @click="$emit('add-to-cart', product.id, qty)">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
    methods: {
        currency(number) {
            return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        },
    },
}
