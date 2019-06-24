<template>
  <div class="viewer" v-show="isShow" @click="toggleShow">
    <img :src="img.src" ref="imgref">
    <a :href="img.src">查看原图</a>
  </div>
</template>
<script>
export default {
  props: ['img'],
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    toggleShow() {
      console.dir(this.img)
      this.isShow = !this.isShow
    }
  },
  updated() {
    let imgref = this.$refs.imgref
    let clientWidth = document.body.clientWidth
    let clientHeight = document.body.clientHeight

    let imageWidth = imgref.naturalWidth
    let imageHeight = imgref.naturalHeight

    let width = ''
    let height = ''

    if (clientWidth / imageWidth <= clientHeight / imageHeight) {
      width = imageWidth * (clientWidth / imageWidth)
      height = imageHeight * (clientWidth / imageWidth)
    } else {
      width = imageWidth * (clientHeight / imageHeight)
      height = imageHeight * (clientHeight / imageHeight)
    }
    this.$refs.imgref.style.width = width + 'px'
    this.$refs.imgref.style.height = height + 'px'
  }
}
</script>
<style lang="less">
.viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  img {
    cursor: zoom-out;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  a {
    position: fixed;
    bottom: 30px;
    left: 50%;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
    padding: 8px 20px;
    border-radius: 20px;
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 15px;
    color: #fff;
    z-index: 10000001;
  }
}
</style>