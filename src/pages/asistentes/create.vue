<template>
  <v-container fluid class="background-container">
    <v-row style="padding: 100px 0">
      <v-col cols="12" sm="5" class="logo hidden-sm-and-down"></v-col>
      <v-col cols="12" sm="7">
        <v-card color="white" class="card-mobile">
          <v-row>
            <v-col cols="1" class="imagen_lateral" />
            <v-col cols="11" class="Contenido">
              <v-card-text class="transparent">
                <v-row class="contenido-text-card">
                  <v-col cols="12" sm="12">
                    <center>
                      <h2>
                        Registro Asistencia <br />
                        Acta reunion {{ codigo }}
                      </h2>
                    </center>
                  </v-col>
                  <v-col style="padding-top: 10%" cols="12" sm="12">
                    <label for="">Nombres</label>
                    <v-text-field
                      density="compact"
                      variant="outlined"
                      v-model="nombre"
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <label for="">Apellidos</label>
                    <v-text-field
                      density="compact"
                      variant="outlined"
                      v-model="apellido"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <label for="">No. Documento</label>
                    <v-text-field
                      density="compact"
                      variant="outlined"
                      v-model="documento"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <label for="">No. Celular</label>
                    <v-text-field
                      density="compact"
                      variant="outlined"
                      v-model="telefono"
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <label for="">Correo electronico</label>
                    <v-text-field
                      density="compact"
                      variant="outlined"
                      v-model="correo"
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <label for="">Empresa</label>
                    <v-text-field
                      density="compact"
                      variant="outlined"
                      v-model="empresa"
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <label for="">Cargo</label>
                    <v-text-field
                      density="compact"
                      variant="outlined"
                      v-model="cargo"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" v-if="admin">
                    <label for="">Contraseña</label>
                    <v-text-field
                      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="visible ? 'text' : 'password'"
                      density="compact"
                      prepend-inner-icon="mdi-lock-outline"
                      variant="outlined"
                      v-model="password"
                      @click:append-inner="visible = !visible"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-checkbox label="Adinistrador" v-model="admin" />
                  </v-col>
                  <v-col cols="12" sm="6" class="d-flex justify-end">
                    <v-btn color="#5B5D5C" @click="createUser">Crear</v-btn>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <v-btn color="#5B5D5C" href="/listado-asistentes">Regresar</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="infodialog" max-width="600">
    <v-card>
      <v-card-title>
        <center>ALERTA <v-icon>mdi-alert</v-icon></center>
      </v-card-title>
      <v-card-text>
        <center>
          <v-col>
            {{ alert }}
          </v-col>
        </center>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="infodialog = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
const backend_api = import.meta.env.VITE_RUTA_APP;
export default {
  data() {
    return {
      infodialog: false,
      codigo: "",
      nombre: "",
      apellido: "",
      alert: "",
      visible: false,
      documento: "",
      telefono: "",
      correo: "",
      empresa: "",
      cargo: "",
      admin: false,
    };
  },
  mounted() {
    this.loadCodigo();
  },
  methods: {
    loadCodigo() {
      const currentUrl = window.location.pathname;
      this.codigo =
        currentUrl.split("/user-no-exist/")[1] || "Código no disponible";
    },
    async createUser() {
      const datos = {
        nombre: this.nombre,
        apellidos: this.apellido,
        cedula: this.documento,
        telefono: this.telefono,
        email: this.correo,
        empresa: this.empresa,
        cargo: this.cargo,
        estado: "activo",
        contrasena: "",
        admin: this.admin,
      };
      try {
        await axios.post(`${backend_api}/usuario/crear`, datos);
        this.alert = "Usuario creado Exitosamente";
        this.infodialog = true;
      } catch {
        this.alert =
          "Error al crear usuario revise  si  el usuario existe orevise  su conexion  a internet";
      }
    },
  },
};
</script>

<style scoped>
.background-container {
  background-image: url("@/assets/fondos/Fondo-Img2.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
}

.imagen_lateral {
  background-image: url("@/assets/logos/Logo_Lateral.png");
  margin-top: 10%;
  margin-left: 1%;
  background-size: contain;
  background-repeat: no-repeat;
}

.Contenido {
  margin-left: -6%;
}

.transparent {
  background-color: transparent;
}

.logo {
  background-image: url("@/assets/logos/Logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 150px;
  z-index: 2;
  padding: auto;
  top: 15%;
  position: fixed;
  left: 5%;
}

.card-mobile {
  width: 100%;
  max-width: 670px;
  left: 45%;
  top: 10%;
  border-radius: 30px;
  box-shadow: black 10px 0px 10px 0px;
  position: absolute;
}

@media (max-width: 600px) {
  .card-mobile {
    max-width: 100%;
    top: 10%;
    padding: 10px;
    left: 0;
  }
  .imagen_lateral {
    background-image: url("@/assets/logos/Logo_Lateral.png");
    margin-top: 25%;
    margin-left: -4%;
    position: relative;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .Contenido {
    margin-left: -1%;
  }
}

.contenido-text-card {
  padding: 10%;
}
</style>
