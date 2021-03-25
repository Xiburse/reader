<template>
    <transition name="bookListPageTran" mode="out-in">
        <div class="bookListPageBox">
            <!-- <button @click="addBookClick">{{message}}</button><br> -->
            <div @click="roundButtonClick"
                 @mouseenter="roundButtonEnter"
                 @mouseleave="roundButtonLeave">
                <round-button :class="roundButtonClass"
                              :style="roundButtonStyle"
                              :width="buttonWidth"
                              logoPath="static/sideBarButton.svg"
                              ref="roundButton"></round-button>
            </div>
            <side-bar :class="sideBarClass"
                      @click.native="sideBarClick"></side-bar>
            <transition name="publicBookMessageTran"
                        v-on:after-leave="publicBookMessageTranAfterLeave">
                <public-book-message class="publicBookMessage"
                                     v-if="$store.state.publicBookMessage.ifShow"></public-book-message>
            </transition>
            <div class="bookListPageTitle">书籍</div>
            <div>
                <transition-group name="bookListTran">
                    <book v-for="list in bookList"
                          :key="list.id"
                          :width="bookWidth"
                          :height="bookHeight"
                          :nid="list.id"
                          :list="list"
                          class="book"></book>
                </transition-group>
            </div>
        </div>
    </transition>
</template>

<script>
import Book from "./Book.vue";
import BookListMessage from "@/modules/BookListMessage";
import SideBar from "./SideBar.vue";
import RoundButton from "./RoundButton.vue";
import PublicBookMessage from "./PublicBookMessage.vue";
import globalBus from "@/modules/globalBus";

export default {
    name: "BookListPage",
    components: {
        Book,
        SideBar,
        RoundButton,
        PublicBookMessage,
    },
    methods: {
        addBookClick: function () {
            BookListMessage.addBookFromDialog();
        },

        roundButtonClick: function (e) {
            if (this.sideBarClass == "sideBar") {
                this.ifRoundButtonClick = false;
                this.sideBarClass = "sideBarHidden";
                this.roundButtonStyle.top = "calc(45vh - " + this.buttonWidth / 2 + "px)"
                this.roundButtonStyle.left = -this.buttonWidth / 2 + "px"
            } else {
                this.ifRoundButtonClick = true;
                this.sideBarClass = "sideBar";
                this.roundButtonStyle.top = "calc(80vh - " + this.buttonWidth / 2 + "px)"
                this.roundButtonStyle.left = (300 - this.buttonWidth) / 2 + "px"
            }

            try {
                e.stopPropagation();
            } catch (error) { }
        },

        roundButtonEnter: function () {
            if (this.ifRoundButtonClick == false) {
                this.roundButtonStyle.left = "0px"
            }
        },
        roundButtonLeave: function () {
            if (this.ifRoundButtonClick == false) {
                this.roundButtonStyle.left = (this.buttonWidth / 4 - this.buttonWidth) + "px"
            }
        },

        sideBarClick: function (e) {
            e.stopPropagation();
        },

        addBookList: function (json) {
            this.bookList.push(json);
        },
        deleteBookList: function (index) {
            this.bookList.splice(index, 1);
        },

        publicBookMessageTranAfterLeave: function (el) {
            document.body.style.overflow = "auto";
        },
    },
    data: function () {
        return {
            message: "添加epub书籍",
            bookList: "",
            sideBarClass: "sideBarHidden",
            publicBookMessageIfShow: this.$store.state.publicBookMessage.ifShow,
            buttonWidth: 70,
            roundButtonClass: "roundButton",
            roundButtonStyle: {
                top: "0px",
                left: "0px",
                transform: "",
            },
            ifRoundButtonClick: false,
            bookWidth: 150,
            bookHeight: 200
        };
    },
    created: function () {
        var _this = this;

        this.bookList = BookListMessage.getBookList()
        globalBus.$on("addBookList", (json) => {
            this.bookList.push(json)
        })
        globalBus.$on("deleteBookList", (index) => {
            this.bookList.splice(index, 1)
        })

        document.onclick = function () {
            if (_this.sideBarClass == "sideBar") {
                _this.roundButtonClick()
                _this.$refs.roundButton.buttonClick()
            }
        }
    },
    mounted: function () {
        this.roundButtonStyle.top = "calc(45vh - " + this.buttonWidth / 2 + "px)"
        this.roundButtonStyle.left = (this.buttonWidth / 4 - this.buttonWidth) + "px"
    },
}
</script>

<style>
.bookListPageBox {
    animation: init .4s cubic-bezier(.01,.94,.28,.98);
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 0%;
    left: 0%;
}

.book {
    margin: 20px;
    box-shadow: 0px 4px 20px rgba(95, 95, 95, 0.384);
}

.book:hover {
    box-shadow: 0px 4px 40px rgba(63, 63, 63, 0.452);
}

.sideBar,
.sideBarHidden {
    position: fixed;
    top: 0px;
    left: 0px;

    box-shadow: 5px 0px 40px rgba(192, 192, 192, 0.308);

    z-index: 999;
    transition: 0.6s cubic-bezier(0.14, 0.98, 0.3, 1);
    overflow: hidden;
}
.sideBarHidden {
    left: -300px;
}

.roundButton {
    position: fixed;

    transition: 0.4s;
    z-index: 1000;
}

.bookListPageTitle {
    font-family: "仿宋";
    font-weight: 900;
    font-size: 10vh;
    color: rgba(48, 48, 48, 0.795);
    text-shadow: 2px 2px 10px rgba(196, 196, 196, 0.582);

    margin: 3vh auto 8vh 2vw;
}

@keyframes init {
    0% {
        opacity: 0;
        /* transform: scale(0.8, 0.8); */
    }
    100% {
        opacity: 1;
        /* transform: scale(1, 1); */
    }
}

.bookListTran-enter-active,
.bookListTran-leave-active {
    transition: 0.4s;
}
.bookListTran-enter,
.bookListTran-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
.bookListTran-leave-active {
    position: absolute;
}

.publicBookMessage {
    position: fixed;
    top: 0%;
    left: 0%;
}

.publicBookMessageTran-enter,
.publicBookMessageTran-leave-to {
    opacity: 0;
    transform: scale(1.4, 1.4);
    /* filter: blur(20px); */
}
.publicBookMessageTran-enter-active,
.publicBookMessageTran-leave-active {
    transition: 0.4s;
}

.bookListPageTran-enter, .bookListPageTran-leave-to {
    opacity: 0;
}
.bookListPageTran-enter-active, .bookListPageTran-leave-active {
    transition: .4s cubic-bezier(.01,.94,.28,.98);
}
</style>
