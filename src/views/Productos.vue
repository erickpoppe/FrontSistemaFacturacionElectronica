<template>
  <div class="card-container">
    <Card v-for="(card, index) in cards" :key="index" :card="card" @updateCard="updateCard(index, $event)" />
  </div>
</template>

<script>
import Card from '../components/Card.vue'; // Assuming you have a separate Card component

export default {
  components: {
    Card,
  },
  data() {
    return {
      cards: [
        { title: 'Buscar producto', content: '' },
        { title: '', content: '' },
      ],
    };
  },
  methods: {
    updateCard(index, updatedCard) {
      this.cards[index] = updatedCard;
    },
  },
};
</script>

<style>
.card-container {
  display: flex;
}
</style>