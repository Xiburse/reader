<template>
    <div :class="moreMessageBoxClass"
         :style="moreMessageBoxStyle">
        <div v-for="message in messages"
             :key="message.id"
             class="message">{{message.text}}</div>
    </div>
</template>
<script>
import globalBus from "@/modules/globalBus"

export default {
    name: "MoreMessage",
    props: {
        messages: Array
    },
    computed: {
        moreMessageBoxClass: function () {
            return "moreMessageBox" + (this.$store.state.ifBlack ? "Black" : "")
        }
    },
    data: function () {
        return {
            moreMessageBoxStyle: {
                width: Math.floor(window.innerWidth / 2) + "px"
            }
        }
    },
    created: function () {
        setTimeout(() => {
            globalBus.$emit("deleteMoreMessage", this.messages[0].id)
        }, 3000);
    }
}
</script>
<style>
.moreMessageBox,
.moreMessageBoxBlack {
    display: table;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px) saturate(700%);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    color: rgb(255, 255, 255);
    /* width: 50vw; */
    padding: 5px 5px;
    border-radius: 15px;
    text-align: center;
}
.moreMessageBoxBlack {
    background-color: rgba(255, 255, 255, 0.3);
    color: rgb(0, 0, 0);
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.2);
}

.message {
    margin: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
