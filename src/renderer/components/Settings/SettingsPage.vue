<template>
    <transition name="bookListPageTran"
                mode="out-in">
        <div :class="settingsPageBoxClass">
            <div :class="settingsPageTitleClass">设&nbsp;置</div>
            <div class="settingsRoundButtonBox"
                 @click="settingsRoundButtonBoxClick"
                 @mouseenter="settingsRoundButtonBoxEnter"
                 @mouseleave="settingsRoundButtonBoxLeave">
                <settings-round-button :width="70"
                                       logoPath="static/return.svg"
                                       :style="settingsRoundButtonStyle"
                                       class="settingsRoundButton"></settings-round-button>
            </div>
            <div class="settingsOptionsBox">
                <div :class="settingsOptionsColumnClass">
                    <div class="settingsOptionsColumnTitle">全局设置</div>
                    <div class="settingsOptionsColumnEntry">
                        <div class="entryTitle">暗黑模式</div>
                        <double-button class="doubleButton"
                                       :height="20"
                                       :ifClick="ifDoubleButtonClick"
                                       @click.native="doubleButtonClick"></double-button>
                    </div>
                </div>
                <div :class="settingsOptionsColumnClass">
                    <div class="settingsOptionsColumnTitle">书架设置</div>
                    <div class="settingsOptionsColumnEntry">
                        <div class="entryTitle">{{bookModString}}</div>
                        <double-button class="doubleButton"
                                       :height="20"
                                       :ifClick="ifBookModClick"
                                       @click.native="bookModClick"></double-button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { remote } from "electron"
import SettingsRoundButton from "./SettingsRoundButton.vue"
import DoubleButton from "../DoubleButton.vue"

export default {
    name: "SettingsPage",
    components: {
        SettingsRoundButton,
        DoubleButton
    },
    computed: {
        settingsPageBoxClass: function () {
            return "settingsPageBox" + (this.$store.state.ifBlack ? "Black" : "")
        },
        settingsPageTitleClass: function () {
            return "settingsPageTitle" + (this.$store.state.ifBlack ? "Black" : "")
        },
        settingsOptionsColumnClass: function () {
            return "settingsOptionsColumn" + (this.$store.state.ifBlack ? "Black" : "")
        },

        bookModString: function () {
            return this.ifBookModClick ? "列表模式" : "表格模式"
        }
    },
    methods: {
        settingsRoundButtonBoxClick: function () {
            this.$router.push({ name: "Page" })
        },
        settingsRoundButtonBoxEnter: function () {
            this.settingsRoundButtonStyle.left = "0px"
        },
        settingsRoundButtonBoxLeave: function () {
            this.settingsRoundButtonStyle.left = (70 / 4 - 70) + "px"
        },

        doubleButtonClick: function () {
            this.ifDoubleButtonClick = !this.ifDoubleButtonClick
            remote.getGlobal("options").ifBlack = this.ifDoubleButtonClick
            this.$store.commit("setBlack", this.ifDoubleButtonClick)
        },

        bookModClick: function () {
            this.ifBookModClick = !this.ifBookModClick
            remote.getGlobal("options").bookModNumber = this.ifBookModClick ? 1 : 0
            this.$store.commit("setBookModNumber", this.ifBookModClick ? 1 : 0)
        }
    },
    data: function () {
        return {
            settingsRoundButtonStyle: {
                top: "calc(45vh - " + 70 / 2 + "px)",
                left: (70 / 4 - 70) + "px"
            },

            ifDoubleButtonClick: false,
            ifBookModClick: false
        }
    },
    created: function () {
        this.ifDoubleButtonClick = this.$store.state.ifBlack
        console.log(this.$store.state)
        if (this.$store.state.bookModNumber == 0) {
            this.ifBookModClick = false
        } else {
            this.ifBookModClick = true
        }
        
    },
    mounted: function () {

    }
}
</script>
<style>
.settingsPageBox,
.settingsPageBoxBlack {
    transition: 0.4s;

    animation: init .4s cubic-bezier(0.01, 1.44, 0.85, 1.01);
    background-color: rgb(255, 255, 255);
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0%;
    left: 0%;

    overflow-x: hidden;
}
.settingsPageBoxBlack {
    background-color: rgb(0, 0, 0);
}

.settingsPageTitle,
.settingsPageTitleBlack {
    transition: 0.4s;

    font-family: "fc", "qk";
    font-weight: 900;
    font-size: 10vh;
    color: rgba(48, 48, 48, 0.795);
    text-shadow: 2px 2px 10px rgba(196, 196, 196, 0.582);

    margin: 5vh auto 10vh 8vw;
}
.settingsPageTitleBlack {
    color: rgba(215, 215, 216, 0.699);
    text-shadow: 2px 2px 10px rgba(75, 75, 75, 0.582);
}

.settingsRoundButton {
    position: fixed;

    transition: 0.4s cubic-bezier(0.8, 0.01, 0.49, 1);
    z-index: 1000;
}

.settingsOptionsBox {
    padding: 30px 11vw 30px 9vw;
    box-sizing: border-box;

    width: 100%;
    height: 100%;
}

.settingsOptionsColumn,
.settingsOptionsColumnBlack {
    transition: 0.4s;

    width: 100%;
    box-sizing: border-box;
    padding: 20px 6vw 20px 20px;
    background-color: rgba(61, 61, 61, 0.11);

    color: rgba(49, 49, 49, 0.733);
    box-shadow: 0px 4px 20px rgba(95, 95, 95, 0.096);
    text-shadow: 2px 2px 5px rgba(100, 100, 100, 0.274);
    margin-bottom: 10vh;
}
.settingsOptionsColumnBlack {
    background-color: rgba(204, 204, 204, 0.11);
    color: rgba(201, 201, 201, 0.733);
    box-shadow: 0px 4px 20px rgba(170, 170, 170, 0.096);
    text-shadow: 2px 2px 5px rgba(167, 167, 167, 0.274);
}
.settingsOptionsColumnTitle {
    margin-bottom: 6vh;
    font-weight: 900;
    font-size: 5vh;
}

.settingsOptionsColumnEntry {
    margin: 10px auto 10px auto;
}
.entryTitle {
    display: inline-block;
}
.doubleButton {
    float: right;
}
</style>
