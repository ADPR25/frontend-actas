<template>
  <v-row class="fill-height" align="center" justify="center">
    <v-col cols="12" sm="8" class="justify-center">
      <v-card
        height="600"
        color="#0C2537"
        class="card-container"
        style="border-radius: 30px"
      >
        <v-row>
          <v-col class="part-1 d-none d-sm-flex" cols="12" sm="6" />
          <v-col cols="12" sm="6" class="text-section d-flex">
            <v-row class="contenedor_login">
              <center class="d-sm-none">
                <img src="../../assets/logos/Logo.png" width="100%" alt="" />
              </center>
              <v-col cols="12" sm="12" class="titulo"> Inicio Sesion </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="User"
                  placeholder="N° de documento"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                />
                <v-text-field
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  placeholder="Contraseña"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  v-model="password"
                  @click:append-inner="visible = !visible"
                />
              </v-col>
              <v-col cols="12" sm="12">
                <v-btn color="primary" @click="login" class="w-100">
                  Iniciar Sesion
                </v-btn>
              </v-col>
              <v-col
                col="12"
                sm="12"
                class="d-flex justify-center align-center"
              ></v-col>
              <div class="linea_gris"></div>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="infodialog" max-width="600">
    <v-card>
      <v-card-title>
        <center>ERROR <v-icon>mdi-alert</v-icon></center>
      </v-card-title>
      <v-card-text>
        {{ alert }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="infodialog = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const backend_api = import.meta.env.VITE_RUTA_APP;
import axios from "axios";

export default {
  data: () => ({
    visible: false,
    User: "",
    password: "",
    infodialog: false,
    alert: "",
  }),
  methods: {
    parseJwt(token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error("Error al decodificar el token:", e);
        return null;
      }
    },
    async login() {
      const datos = {
        cedula: this.User,
        contrasena: this.password,
      };
      try {
        const response = await axios.post(
          `${backend_api}/usuario/login`,
          datos
        );
        if (response.status === 201) {
          console.log(response.data);
          if (response.data.admin === true) {
            const decodedToken = this.parseJwt(response.data.token);
            localStorage.setItem("Token", response.data.token);
            localStorage.setItem("TokenDecode", JSON.stringify(decodedToken));
            this.$router.push("/acciones");
          } else {
            this.$router.push("/error");
          }
        }
      } catch (error) {
        this.infodialog = true;
        this.alert = error.response?.data?.message || "Error desconocido";
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.card-container {
  display: flex;
  flex-direction: column;
}

.part-1 {
  background-image: url("@/assets/fondos/img-login.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  position: relative;
}

.text-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 16px;
}

.titulo {
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 16px;
}

.contenedor_login {
  width: 100%;
  text-align: center;
  align-items: center;
  position: relative;
  padding: 90px 50px 90px 50px;
}

.linea_gris {
  height: 2px;
  width: 100%;
  background-color: #cccccc;
}
</style>
