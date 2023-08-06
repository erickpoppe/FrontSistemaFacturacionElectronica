<template>
  <div class="card">
    <h2>{{ card.title }}</h2>
    <input type="text" v-model="card.content" @input="updateCardContent">
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateCardContent() {
      this.$emit('updateCard', this.card);
    },
  },
};
</script>

<style>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
}
</style>