<template>
    <div class="publicBookMessageBox"
         @click="publicBookMessageBoxClick">
        <div class="messageBox">
            <div class="messageTitle">Title:&nbsp;{{$store.state.publicBookMessage.title}}</div>
            <div class="messageAuthor">Author:&nbsp;{{$store.state.publicBookMessage.author}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PublicBookMessage",
    components: {},
    props: {},
    methods: {
        publicBookMessageBoxClick: function () {
            this.$store.commit("setPublicBookMessageIfShow", false)
        }
    },
    data: function () {
        return {}
    },
    created: function () {

    },
    mounted: function () {

    }
}
</script>
<style>
.publicBookMessageBox {
    background-color: rgba(255, 255, 255, 0.281);

    width: 100vw;
    height: 100vh;

    z-index: 1001;
    backdrop-filter: saturate(300%) blur(40px);
}
.messageBox {
    width: 70vw;
    height: 50vh;
    position: relative;
    top: 25vh;
    left: 15vw;
}
.messageTitle,
.messageAuthor {
    color: rgb(83, 83, 83);
    font-size: 3vw;
    font-weight: 900;
    font-family: "等线";
    margin: 2vh;
}

.deleteMessageLogoBox {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 2vh;
    right: 2vh;
    object-fit: cover;
}
</style>