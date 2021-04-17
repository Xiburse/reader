<template>
    <transition name="boxTran">
        <div class="box">
            <book-list-page class="blpBox"
                            v-if="blpIf"></book-list-page>
            <div class="coverBox">
                <div class="coverLogoBox">
                    <img src="static/cover.svg"
                         class="coverLogo"
                         alt="">
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import BookListPage from './BookList/BookListPage.vue'

export default {
    components: { BookListPage },
    name: "Cover",
    component: {
        BookListPage
    },
    data: function () {
        return {
            blpIf: false
        }
    },
    mounted: function () {
        setInterval(() => {
            this.blpIf = !this.blpIf
        }, 300);
        setTimeout(() => {
            this.$router.push({ name: "Page" })
        }, 2000);
    }
}
</script>
<style>
.box {
    overflow: hidden;
}
.blpBox {
    width: 90vw;
    height: 90vh;
    position: absolute;
    top: 0px;
    left: 0px;
    overflow: hidden;
}
.coverBox {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 99vw;
    height: 99vh;
    background-color: rgb(255, 255, 255);
    overflow: hidden;
}
.coverLogoBox {
    width: 100px;
    height: 100px;
    transform: translate(calc((100vw - 100px) / 2), calc((100vh - 100px) / 2));
    overflow: hidden;
}
.coverLogo {
    display: block;
    object-fit: cover;
    position: relative;
    pointer-events: none;
}

.boxTran-enter,
.boxTran-leave-to {
    opacity: 0;
}
.boxTran-enter-active,
.boxTran-leave-active {
    transition: .4s cubic-bezier(0.01, 0.94, 0.28, 0.98);
}
</style>
