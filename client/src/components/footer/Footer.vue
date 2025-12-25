<script setup>
const currentDate = new Date(); 
const getYear = () => currentDate.getFullYear(); 

const year = getYear(); 
</script>

<template>
  <footer class="footer">
    © {{ year }} Мое приложение
  </footer>
</template>

<style scoped>
.footer {
  padding: 15px;
  text-align: center;
  background-color: #f5f5f5;
  color: #333;
  font-size: 14px;
  border-top: 1px solid #ddd;
}
</style>