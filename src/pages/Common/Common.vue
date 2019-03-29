<template>
  <div class="common">
    <div class="left">
      <component :is="category"></component>
      <Card type='Article' v-for="item in data" :key="item.id" :detail="item"></Card>
      
    </div>
    <div class="right">
      <Social></Social>
      <Card type='Widget'></Card>
      <Card type='Widget'></Card>
      <Card type='Widget'></Card>
    </div>
  </div>
</template>
<script>
import Card from '@/component/Card/Card'
import Social from '@/component/Social/Social'
export default {
  props: ['type','data'],
  data() {
    return {
      category: null,
    }
  },
  methods: {
    
  },
  computed: {
    loader() {
      return () => import(`@/component/Card/${this.type}/${this.type}`)
    }
  },
  mounted() {
    this.loader()
      .then(() => {
        this.category = () => this.loader()
      })
      .catch(() => {
        // console.error('no type')
      })
  },
  components: {
    Card,
    Social
  }
}
</script>
<style lang="less" scoped>
.common {
  justify-content: space-between;
  display: flex;
  .left {
    flex:1;
    .article {
      margin-bottom: 10px;
    }
  }
  .right {
    margin-left: 10px;
    .social {
      margin-bottom: 10px;
    }
    .widget {
      margin-bottom: 10px;
    }
  }
}
</style>