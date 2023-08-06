<template>
  <div>
    <h4>Estado de red: {{ pingStatus }}</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pingStatus: "Verificando...",
    };
  },
  created() {
    this.checkNetworkStatus();
    this.checkInterval = setInterval(this.checkNetworkStatus, 120000);
  },
  beforeDestroy() {
    clearInterval(this.checkInterval);
  },
  methods: {
    checkNetworkStatus() {
      const isOnline = navigator.onLine;
      this.pingStatus = isOnline ? "Online" : "Offline";
      this.$emit("update-status", this.pingStatus);
    },
  },
};
</script>


