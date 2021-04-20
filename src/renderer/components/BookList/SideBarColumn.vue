<template>
    <div :class="SideBarColumnBoxClass"
         :style="SideBarColumnStyle"
         @mousedown="SideBarColumnDown"
         @mouseup="SideBarColumnUp"
         @mouseenter="SideBarColumnEnter"
         @mouseleave="SideBarColumnLeave">
        <img :src="logoSrc"
             alt=""
             class="SideBarColumnLogo">
        <div class="SideBarColumnTextBox"
             style="height: 40px; display: table-cell; vertical-align: middle;">
            <div :class="SideBarColumnTextClass">{{text}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "SideBarColumn",
    props: {
        method: Function,
        text: String,
        logoSrc: String
    },
    computed: {
        SideBarColumnBoxClass: function () {
            return "SideBarColumnBox" + (this.$store.state.ifBlack ? "Black" : "")
        },
        SideBarColumnTextClass: function () {
            return "SideBarColumnText" + (this.$store.state.ifBlack ? "Black" : "")
        }
    },
    methods: {
        SideBarColumnDown: function () {
            this.SideBarColumnStyle.transform = "scale(0.9, 0.9)"
        },
        SideBarColumnUp: function () {
            this.SideBarColumnStyle.transform = "scale(1, 1)"
            this.method()
        },
        SideBarColumnEnter: function () {
            this.SideBarColumnStyle.transform = "scale(1.05, 1.05)"
        },
        SideBarColumnLeave: function () {
            this.SideBarColumnStyle.transform = "scale(1, 1)"
        }
    },
    data: function () {
        return {
            SideBarColumnStyle: {
                transform: "scale(1, 1)"
            }
        }
    }
}
</script>
<style>
.SideBarColumnBox,
.SideBarColumnBoxBlack {
    transition: 0.4s;
    background-color: rgba(255, 255, 255, 0.397);
    box-shadow: 0px 0px 20px rgba(201, 201, 201, 0.322);
    width: 100%;
    height: 40px;
}
.SideBarColumnBox:hover {
    transition: 0.4s;
    background-color: rgba(255, 255, 255, 0.747);
}
.SideBarColumnBoxBlack {
    background-color: rgba(0, 0, 0, 0.397);
    box-shadow: 0px 0px 20px rgba(24, 24, 24, 0.322);
}
.SideBarColumnBoxBlack:hover {
    transition: 0.4s;
    background-color: rgba(0, 0, 0, 0.747);
}

.SideBarColumnLogo {
    float: left;
    width: 20px;
    height: 20px;
    margin: 10px auto 10px 10px;
    object-fit: cover;
}

.SideBarColumnText,
.SideBarColumnTextBlack {
    margin-left: 20px;
    font-family: "fc", "qk";
    font-weight: 900;
    font-size: 16px;
    align-items: center;
}
.SideBarColumnTextBlack {
    color: rgb(255, 255, 255);
}
</style>
