<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h4 mb-6">Мои товары</h2>
        
        
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          class="d-flex justify-center mb-6"
        />
        
        
        <v-alert
          v-else-if="error"
          type="error"
          class="mb-6"
          variant="tonal"
        >
          {{ error }}
        </v-alert>
        
        
        <v-row v-else-if="products.length">
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12" sm="6" md="4" lg="3"
          >
            <v-card class="mx-auto" max-width="300" elevation="4" hover>
              <v-img
                src="https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Товар"
                height="200"
                cover
              />
              <v-card-title class="text-h6">{{ product.name }}</v-card-title>
              <v-card-subtitle class="text-subtitle-1">{{ product.category }}</v-card-subtitle>
              <v-card-text>
                <div class="text-h5 font-weight-bold text-primary mb-2">
                  {{ product.price }} ₽
                </div>
                <div class="text-body-2 text-medium-emphasis">
                  {{ product.description }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click="addToCart(product)">
                  В корзину
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        
        
        <v-alert v-else type="info" variant="tonal">
          Товары не найдены
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { ref, onMounted } from 'vue'


const products = ref([])
const loading = ref(true)
const error = ref(null)


const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch('/api/products')  // → nginx → Docker сервер
    if (!response.ok) throw new Error('Ошибка загрузки товаров')
    
    products.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Ошибка API:', err)
  } finally {
    loading.value = false
  }
}


const addToCart = (product) => {
  console.log('Добавлен:', product.name)
  alert(`${product.name} добавлен в корзину!`)
}


onMounted(() => {
  fetchProducts()
})
</script>

