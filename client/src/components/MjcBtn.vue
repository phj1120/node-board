<template>
  <div
    class="mjc-btn"
    :style="{
      background: background || 'black',
      color: fontcolor || 'whites',
    }"
    @click="btnClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["background", "fontcolor"],
  methods: {
    btnClick() {
      this.$emit("click");
      this.$emit("changeBackground", "#ffff00");
    },
  },
};
</script>

<style scoped>
.mjc-btn {
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 16;
  text-align: center;
  cursor: pointer;
}
</style>
