<script setup>
import { useRouter } from 'vue-router'
import treeGif from '../assets/237710985.gif'

const router = useRouter()
const goHome = () => router.push('/')
</script>

<template>
  <div class="notfound">
    <div class="tree-container">
      <img :src="treeGif" alt="Новогодняя ёлка" class="tree" />
      <div class="ornaments">
        <span class="ornament red"></span>
        <span class="ornament red" style="top: 30%; left: 50%;"></span>
        <span class="ornament red" style="top: 50%; left: 35%;"></span>
        <span class="ornament red" style="top: 65%; left: 60%;"></span>
      </div>
      <div class="gifts">
        <div class="gift gift1">🎁</div>
        <div class="gift gift2">🎁</div>
      </div>
    </div>
    <h1>🎄 404 — Страница не найдена 🎅</h1>
    <p>Упс! Такой страницы не существует.</p>
    <button @click="goHome">Вернуться на главную</button>
  </div>
</template>

<style scoped>
.notfound {
  max-width: 450px;
  margin: 50px auto;
  padding: 2.5rem 1rem;
  background-color: #0a3d15;
  border: 3px solid #9c1c1c;
  border-radius: 20px;
  color: #f1dedb;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-align: center;
  user-select: none;
  box-shadow: 0 0 20px #a12828cc;
  position: relative;
}


.tree-container {
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
}


.tree {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.ornaments {
  position: absolute;
  top: 7%;
  left: 0;
  width: 100%;
  height: 90%;
  pointer-events: none;
}

.ornament {
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: #c0392b;
  border-radius: 50%;
  box-shadow: 0 0 6px #e74c3c;
}

.ornament:first-child { top: 20%; left: 40%; }
.ornament:nth-child(2) { top: 30%; left: 50%; }
.ornament:nth-child(3) { top: 50%; left: 35%; }
.ornament:nth-child(4) { top: 65%; left: 60%; }

.gifts {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  gap: 20px;
}

.gift {
  font-size: 2.5rem;
  animation: gift-bounce 1.5s infinite ease-in-out;
}

.gift1 {
  animation-delay: 0s;
}

.gift2 {
  animation-delay: 0.7s;
}

@keyframes gift-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.notfound h1 {
  font-size: 2.6rem;
  color: #f2b8b8;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 4px #8b1414;
}

.notfound p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: #f5d0d0;
  text-shadow: 1px 1px 3px #8b1414;
}

.notfound button {
  font-size: 1.1rem;
  padding: 0.6rem 1.8rem;
  border: none;
  border-radius: 30px;
  background-color: #c1272d;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 15px #8b1414;
  transition: background-color 0.3s ease;
}

.notfound button:hover {
  background-color: #a1181d;
}
</style>