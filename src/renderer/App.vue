<template>
    <div id="app">
        <router-view ref="main"></router-view>
    </div>
</template>

<script>
import store from "./store/index"

export default {
    name: 'epub-reader',
    created: function () { 
        store.commit("init")
    }
}
</script>

<style>
/* CSS */
* {
    margin: 0px;
    user-select: none;
}
body {
    /* background-color: rgba(255, 255, 255, 0.466);
    backdrop-filter: blur(20px); */
}

::-webkit-scrollbar {
    width: 5px;
    
}
::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background-color: rgba(0, 0, 0, 0.185);
}
::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.527);
}
::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
}

@font-face {
    font-family: myFont;
    src: url(字体.ttf);
}
</style>
