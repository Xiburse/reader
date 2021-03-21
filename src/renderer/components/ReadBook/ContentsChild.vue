<template>
    <div>
        <div @click.left="contentTitleClickLeft"
             class="contentTitle">{{list.name}}</div>
        <div class="listBox">
            <transition-group name="childListTran">
                <contents-child v-for="l in childList"
                                :list="l"
                                :level="level + 1"
                                :key="l.id"
                                class="childListClass"></contents-child>
            </transition-group>
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
    props: {
        list: Object,
        level: Number
    },
    watch: {
        ifListBox: function () {
            if (this.ifListBox) {
                var i = 0
                var s = 0
                s = setInterval(() => {
                    if (i == this.list.navPoint.length) {
                        clearInterval(s)
                    } else {
                        this.childList.push(this.list.navPoint[i])
                        i++
                    }
                }, 50)
            } else if (!this.ifListBox) {
                var s = 0
                s = setInterval(() => {
                    if (this.childList.length == 0) {
                        clearInterval(s)
                    } else {
                        this.childList.splice(this.childList.length - 1, 1)
                    }
                }, 50)
            }
        }
    },
    data: function () {
        return {
            isHaveChild: false,
            ifListBox: false,

            childList: []
        }
    },
    mounted: function () { },
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

.childListTran-enter,
.childListTran-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.childListTran-enter-active, .childListTran-leave-active {
    position: absolute;
}
</style>
