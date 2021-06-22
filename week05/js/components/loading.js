export default {
    props: {
        isShow: { type: Boolean, default: false }
    },
    template: 
    `
        <div class="overlay" v-if="isShow">
            <div class="spinner-grow text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-dark mx-1" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-warning me-1" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `
}
