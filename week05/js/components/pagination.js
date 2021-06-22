export default {
  props: {
    page: { type: Object, default: () => {} }
  },
  template: 
  `
    <nav class="d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !page.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
              @click.prevent="changePage(page.current_page - 1)"
          >
          &lt Prev
          </a>
        </li>
        <li class="page-item"
            :class="{'active': page.current_page === item}"
            v-for="item in page.total_pages"
            :key="item"
        >
          <a class="page-link" href="#"
              @click.prevent="changePage(item)"
          >
          {{ item }}
          </a>
        </li>
        <li class="page-item" :class="{'disabled': !page.has_next}">
          <a class="page-link" href="#" aria-label="Next" 
              @click.prevent="changePage(page.current_page + 1)"
          >
            Next &gt
          </a>
        </li>
      </ul>
    </nav>
  `,
  methods: {
    changePage(page) {
      this.$emit('getProducts', page);
    }
  },
}
