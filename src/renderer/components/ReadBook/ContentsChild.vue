<template>
    <div>
        <div @click.left="contentTitleClickLeft"
             class="contentTitle">{{list.name}}</div>
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
export default {
    name: "ContentsChild",
    components: {},
    methods: {
        contentTitleClickLeft: function () {
            if (this.isHaveChild) {
                this.ifListBox = !this.ifListBox
            }
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
            } else {
                var lbe = this.listBoxEle
                requestAnimationFrame(function () {
                    var listBoxEle = lbe
                    listBoxEle.style.transition = "0.4s"
                    listBoxEle.style.height = "0px"
                })
                
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

            listBoxEle: ""
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
        } else {
            this.isHaveChild = true
        }
    }
}
</script>

<style>
.contentTitle {
    transition: 0.4s;
}
.childListClass {
    transition: 0.4s;
}

.listBox {
    overflow: hidden;
    height: 0px;
}
</style>
