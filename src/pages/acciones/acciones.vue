<template>
  <v-container fluid class="background-container">
    <v-row>
      <v-col cols="12" sm="8" md="4" offset-sm="2" offset-md="4" style="padding-top: 13%">
        <v-card height="auto" max-width="100%" class="card">
          <v-card-title class="d-flex justify-center align-center">
            <img src="@/assets/logos/Logo.png" width="70%" />
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="d-flex justify-center align-center">
                <v-btn href="/create/acta" class="btn-color">Nueva acta</v-btn>
              </v-col>
              <v-col cols="12" class="d-flex justify-center align-center">
                <v-btn href="/listado/actas" class="btn-color">Listado de actas</v-btn>
              </v-col>
              <v-col cols="12" class="d-flex justify-center align-center">
                <v-btn href="/listado/asistentes" class="btn-color">Listado de asistentes</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Botón flotante -->
    <v-btn
      class="floating-btn"
      fab
      dark
      color="primary"
      @click="logoutClick"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  mounted() {
    const tokenDecode = localStorage.getItem("TokenDecode");
    if (tokenDecode) {
      const parsedToken = JSON.parse(tokenDecode);
      console.log("Token decodificado:", parsedToken);
    }
  },
  methods: {
    logoutClick() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.background-container {
  background-image: url("@/assets/fondos/Fondo-Azul.png");
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 16px;
}

.btn-color {
  background-color: #1478f4;
  color: white;
  width: 100%;
  padding: 12px;
  text-align: center;
  font-size: 16px;
  margin: 8px 0;
  cursor: pointer;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.floating-btn {
  position: fixed;
  bottom: 30px;
  right: 16px;
  z-index: 1000;
}
</style>
