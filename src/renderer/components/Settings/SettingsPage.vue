<template>
    <transition name="bookListPageTran"
                mode="out-in">
        <div class="settingsPageBox">
            <div class="settingsPageTitle">设&nbsp;置</div>
            <div class="settingsRoundButtonBox"
                 @click="settingsRoundButtonBoxClick"
                 @mouseenter="settingsRoundButtonBoxEnter"
                 @mouseleave="settingsRoundButtonBoxLeave">
                <settings-round-button :width="70"
                                       logoPath="static/return.svg"
                                       :style="settingsRoundButtonStyle"
                                       class="settingsRoundButton"></settings-round-button>
            </div>
        </div>
    </transition>
</template>
<script>
import SettingsRoundButton from "./SettingsRoundButton.vue"

export default {
    name: "SettingsPage",
    components: {
        SettingsRoundButton
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
        }
    },
    data: function () {
        return {
            settingsRoundButtonStyle: {
                top: "calc(45vh - " + 70 / 2 + "px)",
                left: (70 / 4 - 70) + "px"
            }
        }
    },
    created: function () {

    },
    mounted: function () {

    }
}
</script>
<style>
.settingsPageBox {
    animation: init 0.4s cubic-bezier(0.01, 1.44, 0.85, 1.01);
    background-color: rgb(255, 255, 255);
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0%;
    left: 0%;

    overflow-x: hidden;
}

.settingsPageTitle {
    font-family: "fc", "qk";
    font-weight: 900;
    font-size: 10vh;
    color: rgba(48, 48, 48, 0.795);
    text-shadow: 2px 2px 10px rgba(196, 196, 196, 0.582);

    margin: 5vh auto 10vh 8vw;
}

.settingsRoundButton {
    position: fixed;

    transition: .4s cubic-bezier(0.8, 0.01, 0.49, 1);
    z-index: 1000;
}
</style>
