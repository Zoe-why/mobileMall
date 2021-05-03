<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommemdView",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
 .recommend{
   display: flex;
   font-size: 12px;
   padding: 10px 0 20px;
   border-bottom: 8px solid #eee;
 }
 .recommend-item{
   flex: 1;
   text-align: center;
 }
 .recommend-item img {
   width: 65px;
   margin-bottom: 5px;
 }
</style>
