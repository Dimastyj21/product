<script setup lang="ts">
</script>

<template>
  <header class="header">
    <nav class="header-nav">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/about" class="nav-link">О нас</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header-nav {
  display: flex;
  gap: 20px;
  padding: 1rem;
  background-color: #f0f2f5;
  border-bottom: 1px solid #ddd;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #42b883;
}

.router-link-active {  /* ← Изменено с .active */
  color: #1e90ff;
  font-weight: 700;
  border-bottom: 2px solid #1e90ff;
}
</style>
