<template>
    <div :style="expandButtonBoxStyle">
        <button class="expandButtonCover"
                :style="expandButtonStyle"
                @mouseenter="expandButtonEnter"
                @mouseleave="expandButtonLeave"></button>
        <img :src="expandLogoPath"
             alt="error"
             :class="expandLogoClass"
             :style="expandLogoStyle">
    </div>
</template>

<script>
export default {
    name: "ExpandRoundButton",
    components: {},
    methods: {
        delete: function () {

        },
        expandButtonEnter: function () {
            if(this.prop == "delete") {
                this.expandButtonStyle.backgroundColor = "rgb(255, 53, 53)"
            } else if(this.prop == "more") {
                this.expandButtonStyle.backgroundColor = "rgb(255, 255, 255)"
            }
        },
        expandButtonLeave: function () {
            this.expandButtonStyle.backgroundColor = "rgba(206, 206, 206, 0.966)"
        }
    },
    props: {
        width: Number,
        expandLogoPath: String,
        ifClick: Boolean,
        prop: String
    },
    data: function () {
        return {
            expandButtonBoxStyle: {
                width: this.width + "px",
                height: this.width + "px"
            },

            expandButtonStyle: {
                width: this.width + "px",
                height: this.width + "px",
                backgroundColor: ""
            },

            expandLogoClass: "expandLogo",
            expandLogoStyle: {
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
.expandButtonCover {
    border-radius: 99999px;
    border-width: 0px;
    box-shadow: 3px 3px 10px rgba(177, 177, 177, 0.192);

    transition: 0.3s;
    background-color: rgba(206, 206, 206, 0.966);
    outline: none;
}
.expandButtonCover:hover {
    transition: 0.3s;
    /* background-color: rgb(255, 255, 255); */
    transform: scale(1.05, 1.05);
}

.expandLogo {
    transition: 0.4s;

    display: block;
    object-fit: cover;
    position: relative;
    pointer-events: none;
}

.demo {
    background-color: rgb(255, 53, 53);
}
</style>
