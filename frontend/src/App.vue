<script setup lang="ts">
import { ref } from 'vue';
import Button from './components/Button.vue';
import Card from './components/Card.vue'
import InputNumber from './components/InputNumber.vue';
let nombre : string | null = null
const numberRoman = ref<string | null>(null)
const error = ref<string | null>(null)
function reset() {
  nombre = null
  error.value = null
  numberRoman.value = null
}

async function send() {

  const reponse = await fetch("http://localhost:3000/number/" + nombre);
  const res = (await reponse.json() as unknown)

  if (res && typeof res === 'object') {
    if ('message' in res && typeof res.message === 'string') {
      numberRoman.value = res.message;
       error.value = null
    } else if
      ('error' in res && typeof res.error === 'string') {
        numberRoman.value = null
        error.value = res.error;
    }
  }
}
</script>

<template>
  <h1> {{ nombre }}</h1>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <Card title="Convertisseur de Chiffres Romains" class="bg-white shadow-lg">
      <p class="text-center text-sm"> Entrez un nombre entre 1 et 100 pour le convertir en chiffres romains</P>
      <InputNumber label="Nombre à convertir" minNumber="1" maxNumber="100" v-model="nombre" placeholder="ex : 25" />
      <div class="flex flex-row h-full w-full justify-center gap-4 mt-4">
        <Button @click="send" class="flex-[8]" type="primary">Convertir</Button>
        <Button @click="reset" class="flex-[2]" type="secondary">Reset</Button>
      </div>
      <div v-if="numberRoman" class="text-center space-y-2">
        <p class="text-sm text-gray-600">
          Le nombre <span class="font-semibold">{{ nombre }}</span> en chiffres romains est :
        </p>
        <p class="text-3xl font-bold text-green-700 tracking-wider">
          {{ numberRoman }}
        </p>
      </div>
      <div v-if="error" class="text-center space-y-2">
        <p class="text-3xl font-bold text-red-700 tracking-wider">
          {{ error }}
        </p>
      </div>


      <p>
        💡 Les chiffres romains utilisent les symboles : <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I=1, V=5, X=10, L=50, C=100
      </p>

    </Card>
  </div>

</template>
