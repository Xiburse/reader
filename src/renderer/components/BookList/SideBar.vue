<template>
    <div>
        <div class="sideBarStart">
            <div class="addBook"
                 ref="addBook"
                 :style="addBookStyle"
                 @mousedown="addBookDown"
                 @mouseup="addBookUp"
                 @mouseenter="addBookEnter"
                 @mouseleave="addBookLeave">
                <img src="static/addBook.svg"
                     alt=""
                     class="addBookLogo">
                <div class="addBookTextBox"
                     style="height: 40px; display: table-cell; vertical-align: middle;">
                    <div class="addBookText">添加书籍</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookListMessage from "@/modules/BookListMessage"

export default {
    name: "SideBar",
    components: {},
    data: function () {
        return {
            sideBarBoxStyle: {},
            addBookStyle: {
                transform: "scale(1, 1)"
            }
        }
    },
    methods: {
        addBookDown: function () {
            this.addBookStyle.transform = "scale(0.9, 0.9)"
        },
        addBookUp: function () {
            this.addBookStyle.transform = "scale(1, 1)"
            BookListMessage.addBookFromDialog()
        },
        addBookEnter: function () {
            this.addBookStyle.transform = "scale(1.05, 1.05)"
        },
        addBookLeave: function () {
            this.addBookStyle.transform = "scale(1, 1)"
        }
    },
    created: function () { },
    mounted: function () { }
}
</script>

<style>
.sideBarStart {
    width: 300px;
    height: 100vh;

    background-color: rgba(255, 255, 255, 0.664);
    backdrop-filter: saturate(2000%) blur(35px);
    box-sizing: border-box;
    padding: 20px;
}

.addBook {
    transition: 0.4s;
    background-color: rgba(255, 255, 255, 0.397);
    box-shadow: 0px 0px 20px rgba(201, 201, 201, 0.322);
    width: 100%;
    height: 40px;
}
.addBook:hover {
    transition: 0.4s;
    background-color: rgba(255, 255, 255, 0.747);
}

.addBookLogo {
    float: left;
    width: 20px;
    height: 20px;
    margin: 10px auto 10px 10px;
    object-fit: cover;
}

.addBookText {
    margin-left: 20px;
    font-family: "等线";
    font-weight: 900;
    font-size: 16px;
    align-items: center;
}
</style>
