<template>
    <div class="contentBox"
         :style="contentStyle">
        <div :class="contentTitleClass"
             @mouseenter="contentTitleMouseEnter"
             @mouseleave="contentTitleMouseLeave">
            <div class="contentTitleBox">
                <img class="moreBookLogo"
                     @click.left="moreBookLogoClickLeft"
                     :style="moreBookLogoStyle"
                     src="static/sideBarButton.svg"
                     alt="">
                <div class="contentTitleTextBox"
                     @click.left="contentTitleTextBoxClickLeft"
                     :style="contentTitleTextBoxStyle">
                    <div class="contentTitleText">{{list.name}}</div>
                </div>
            </div>
        </div>
        <div class="listBox">
            <contents-child v-for="l in list.navPoint"
                            :list="l"
                            :level="level + 1"
                            :key="l.id"
                            class="childListClass"></contents-child>
        </div>
    </div>
</template>

<script>
import globalBus from "@/modules/globalBus"

export default {
    name: "ContentsChild",
    components: {},
    methods: {
        moreBookLogoClickLeft: function () {
            if (this.isHaveChild) {
                this.ifListBox = !this.ifListBox
            }
        },
        contentTitleTextBoxClickLeft: function () {
            globalBus.$emit("setIframeSrc", this.list.path)
        },
        contentTitleMouseEnter: function () {
            this.contentTitleClass = "contentTitleHover"
            var rect = this.$el.children[0].getBoundingClientRect()
            var zoom = 1 - this.level / 10
            rect.change = true

            this.$store.commit("setMoveBackgroundProp", { "width": rect.width * zoom, "height": rect.height * zoom, "left": rect.left * zoom, "top": rect.top * zoom, "change": !this.$store.state.moveBackgroundProp.change })
            this.$store.commit("setMoveBackgroundPropIf", true)
        },
        contentTitleMouseLeave: function () {
            this.contentTitleClass = "contentTitle"
        }
    },
    watch: {
        ifListBox: function () {
            if (this.ifListBox) {
                var listBoxEle = this.listBoxEle
                var first = listBoxEle.getBoundingClientRect()

                listBoxEle.style.height = "auto"
                var last = listBoxEle.getBoundingClientRect()

                listBoxEle.style.height = "0px"
                requestAnimationFrame(function () {
                    var l = last
                    var lbe = listBoxEle

                    lbe.style.transition = "0.4s"
                    lbe.style.height = l.height + "px"
                })

                this.moreBookLogoStyle.transform = "rotate(90deg)"
            } else {
                var lbe = this.listBoxEle
                requestAnimationFrame(function () {
                    var listBoxEle = lbe
                    listBoxEle.style.transition = "0.4s"
                    listBoxEle.style.height = "0px"
                })

                this.moreBookLogoStyle.transform = "rotate(0deg)"
            }
        }
    },
    props: {
        list: Object,
        level: Number
    },
    data: function () {
        return {
            isHaveChild: false,
            ifListBox: false,

            listBoxEle: "",

            contentTitleClass: "contentTitle",

            contentStyle: {
                zoom: "",
                transform: "",
                backgroundColor: "rgba(200, 200, 200, " + (0.5 + this.level / 10) + ")",
                paddingLeft: this.level * 10 + "%"
            },
            contentTitleTextBoxStyle: {
                height: "40px",
                display: "table-cell",
                verticalAlign: "middle",
                overflow: "hidden"
            },

            moreBookLogoStyle: {
                transform: "rotate(0deg)",
                opacity: "1"
            }
        }
    },
    mounted: function () {
        var nodeList = this.$el.children
        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].className == "listBox") {
                this.listBoxEle = nodeList[i]
                break
            }
        }

        var lbe = this.listBoxEle
        this.listBoxEle.addEventListener("transitionend", function () {
            var listBoxEle = lbe
            listBoxEle.style.transition = ""
        })
    },
    created: function () {
        if (this.list.navPoint.length == 0) {
            this.isHaveChild = false
            this.moreBookLogoStyle.opacity = "0"
        } else {
            this.isHaveChild = true
        }

        // this.contentStyle.transform = "scale(" + (1 - this.level / 10) + "," + (1 - this.level / 10) + ")"
        this.contentStyle.zoom = 1 - this.level / 10
    }
}
</script>

<style>
.contentBox {
    font-family: myFont;
}

.contentTitle {
    transition: 0.4s;
}
.contentTitleHover {
    transition: 0.4s;
    /* transform: scale3d(1, 1, 0); */
    /* background-color: rgba(0, 0, 0, 0.2); */
    box-shadow: 0px 4px 10px rgba(173, 173, 173, 0.24);
}

.childListClass {
    transition: 0.4s;
}

.listBox {
    overflow: hidden;
    height: 0px;
}
.moreBookLogo {
    float: left;
    width: 20px;
    height: 20px;
    margin: 10px 10px 10px 5px;
    object-fit: cover;

    transition: 0.4s;
}

.contentTitleText {
    width: 250px;
    white-space: nowrap;
    z-index: 1;
    /* text-overflow: ellipsis; */
}
</style>
