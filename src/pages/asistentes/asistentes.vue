<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-row class="h-screen" no-gutters style="background-color: #2e8cb0">
    <v-col cols="12" md="10" offset-md="1">
      <v-card
        class="mx-auto"
        max-width="1500"
        style="border-radius: 30px; top: 5%"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="3" class="d-flex justify-center">
              <img src="@/assets/logos/Logo.png" width="80%" />
            </v-col>
            <v-col cols="12" sm="3" class="d-flex justify-center">
              <h2 style="font-size: 1.5rem; font-weight: bold">
                <br />
                ASISTENTES REUNION
              </h2>
            </v-col>
            <v-col cols="12" sm="2" class="d-flex justify-center">
              <v-btn style="top: 25px" href="/asistentes/crear" color="#5B5D5C"
                >Nuevo</v-btn
              >
            </v-col>
            <v-col cols="12" sm="4">
              <br />
              <v-text-field
                density="compact"
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line
                style="max-width: 400px; margin: auto"
              />
            </v-col>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                class="elevation-1"
              >
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" href="/acciones"
            >Volver al menu principal</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const backend_api = import.meta.env.VITE_RUTA_APP;
import axios from "axios";
import { ref } from "vue";
const desserts = ref([]);
const search = ref("");

const headers = [
  { key: "nombre", title: "Nombres" },
  { key: "apellidos", title: "Apellidos" },
  { key: "cedula", title: "N° documento" },
  { key: "email", title: "Correo" },
  { key: "telefono", title: "N° celular" },
  { key: "empresa", title: "Empresa" },
  { key: "cargo", title: "Cargo" },
];

const traerAsistentes = async () => {
  try {
    const Token = localStorage.getItem("Token") || "";

    const { data } = await axios.get(`${backend_api}/usuario/obtener`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });

    desserts.value = data;
  } catch (error) {
    console.error(error);
  }
};

traerAsistentes();
</script>

<style scoped>
@media (max-width: 600px) {
  h2 {
    font-size: 1.2rem;
  }

  .v-data-table {
    font-size: 0.875rem;
  }
}
</style>
