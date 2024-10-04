<template>
  <v-container fluid class="background-container" fill-height>
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" class="text-container">
        <div class="text">
          Acta firmada <br />
          Gracias por su colaboracion
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.background-container {
  background-image: url("@/assets/fondos/Fondo-Gracias.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
}

.text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.text {
  font-family: 'ink free', regular;
  font-size: calc(1.5rem + 2vw);
  text-align: center;
  padding: 20px;
  border-radius: 10px;
}
</style>
