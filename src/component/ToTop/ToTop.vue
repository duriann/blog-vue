<template>
  <div
    class="to-top"
    ref="toTop"
  >
    <button @click="goTop"><i class="iconfont icon-jiantou-shang"></i></button>
  </div>
</template>
<script>
export default {
  mounted() {
    window.addEventListener('scroll', this.throttling(this.handle, 300, 1000))
  },
  methods: {
    goTop() {
      this.scrollTo(document.documentElement, 0, 300)
    },
    handle() {
      let { toTop } = this.$refs
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      if (scrollTop > 200) {
        toTop.style.display = 'block'
      } else {
        toTop.style.display = 'none'
      }
    },
    throttling(fn, wait, maxTimelong) {
      var timeout = null,
        startTime = Date.parse(new Date);
      return function () {
        if (timeout !== null) clearTimeout(timeout);
        var curTime = Date.parse(new Date);
        if (curTime - startTime >= maxTimelong) {
          fn();
          startTime = curTime;
        } else {
          timeout = setTimeout(fn, wait);
        }
      }
    },
    scrollTo(element, to, duration) {
      if (duration <= 0) return;
      var difference = to - element.scrollTop;
      var perTick = difference / duration * 10;
      setTimeout(() => {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) {
          return
        };
        this.scrollTo(element, to, duration - 10);
      }, 10);
    }
  }
}
</script>
<style lang="less" scoped>
.to-top {
  display: none;
  button {
    cursor: pointer;
    width: 36px;
    height: 36px;
    text-align: center;
    background-color: #11a99b;
    color: #fff;
    i {
      font-size: 20px;
    }
  }
}
</style>