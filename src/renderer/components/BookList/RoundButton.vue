<template>
    <div>
        <button class="buttonCover"
                :style="buttonStyle"
                @click="buttonClick"></button>
        <img :src="logoPath"
             alt="error"
             :class="logoClass"
             :style="logoStyle">
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
        buttonClick: function (e) {
            if (this.logoClass == "logo") {
                this.logoClass = "logoRotate"
            } else {
                this.logoClass = "logo"
            }
        }
    },
    data: function () {
        return {
            buttonStyle: {
                width: this.width + "px",
                height: this.width + "px"
            },
            logoClass: "logo",
            logoStyle: {
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
.buttonCover {
    border-radius: 99999px;
    border-width: 0px;
    box-shadow: 3px 3px 10px rgba(177, 177, 177, 0.192);

    transition: 0.3s;
    background-color: rgba(161, 161, 161, 0.301);
    outline: none;
    backdrop-filter: saturate(200%) blur(10px);
}
.buttonCover:hover {
    transition: 0.3s;
    background-color: rgb(255, 255, 255);
}

.logo,
.logoRotate {
    transition: 0.4s;

    display: block;
    object-fit: cover;
    position: relative;
    pointer-events: none;
}
.logoRotate {
    transform: rotate(-180deg);
}
</style>
