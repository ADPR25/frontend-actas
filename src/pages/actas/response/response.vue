<template>
  <v-container v-if="ActaExist" fluid class="background-container">
    <v-card
      v-if="existente"
      color="white"
      style="margin-top: 7%; border-radius: 25px"
      width="550"
      height="700"
    >
      <v-card-title>
        <v-row class="d-flex justify-center align-center" no-gutters>
          <v-col cols="12" class="d-flex justify-center">
            <div class="logo" />
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <p style="font-size: 2.5rem; text-align: center">Firmar Acta</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="2" />
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="acta"
              readonly
              placeholder="Acta"
              prepend-inner-icon="mdi-account"
              variant="outlined"
            />
            <v-text-field
              v-model="user"
              placeholder="N° de documento"
              prepend-inner-icon="mdi-account"
              variant="outlined"
            />
            
          </v-col>
          <v-col cols="12" sm="2" />
          <v-col cols="12" sm="12" class="d-flex justify-center">
            <v-btn
              color="primary"
              @click="login"
              class="mx-auto"
              style="width: 60%"
              >Entrar</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
const backend_api = import.meta.env.VITE_RUTA_APP;
export default {
  data() {
    return {
      existente: true,
      acta: '',
      visible: false,
      user: "",
      ActaExist: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          `${backend_api}/usuario/obtener_por_cedulas`,
          { cedulas: [this.user], acces: 1 },
        );
        if (response.status === 201) {
          const currentUrl = window.location.pathname;
          const codigo = currentUrl.split("/acta-response/")[1];
          localStorage.setItem("Token_2", response.data);
          if (codigo) {
            window.location.href = `/acta/${codigo}`;
          }
        }
      } catch {
        const currentUrl = window.location.pathname;
        const codigo = currentUrl.split("/acta-response/")[1];
        window.location.href = `/user-no-exist/${codigo}`;
      }
    },
    async validar() {
      try {
        const currentUrl = window.location.pathname;
        const codigo = currentUrl.split("/acta-response/")[1];
        this.acta = codigo;
        const response = await axios.get(
          `${backend_api}/actas/validar/${codigo}`
        );
        if (response.data === 1) {
          this.ActaExist = true;
        } else if (response.data === 0) {
          this.existente = false;
        }
      } catch (error) {
        console.error("Ocurrió un error durante la solicitud:", error);
      }
    },
  },
  mounted() {
    this.validar();
  },
};
</script>

<style scoped>
.background-container {
  background-image: url("@/assets/fondos/Fondo-Azul.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 70%;
  height: 250px;
  background-image: url("@/assets/logos/Logo.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  position: relative;
}
</style>
