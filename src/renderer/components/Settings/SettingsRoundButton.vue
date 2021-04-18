<template>
    <div>
        <button class="settingsButtonCover"
                :style="settingsButtonStyle"
                @click="settingsButtonClick"></button>
        <img :src="logoPath"
             alt="error"
             class="settingsLogo"
             :style="settingsLogoStyle">
    </div>
</template>
<script>
export default {
    name: "RoundButton",
    components: {},
    props: {
        width: Number,
        logoPath: String,
        ifClick: Boolean
    },
    methods: {
        settingsButtonClick: function (e) {
            
        }
    },
    data: function () {
        return {
            settingsButtonStyle: {
                width: this.width + "px",
                height: this.width + "px"
            },
            settingsLogoStyle: {
                width: this.width / 2 + "px",
                height: this.width / 2 + "px",
                top: this.width / 4 - this.width - 2 + "px",
                left: this.width / 4 + "px"
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
.settingsButtonCover {
    border-radius: 99999px;
    border-width: 0px;
    box-shadow: 3px 3px 10px rgba(177, 177, 177, 0.192);

    transition: 0.3s;
    background-color: rgba(161, 161, 161, 0.301);
    outline: none;
    backdrop-filter: saturate(200%) blur(10px);
}
.settingsButtonCover:hover {
    transition: 0.3s;
    background-color: rgb(255, 255, 255);
}

.settingsLogo {
    transition: 0.4s;

    display: block;
    object-fit: cover;
    position: relative;
    pointer-events: none;
}
</style>
