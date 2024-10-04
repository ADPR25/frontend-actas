<template>
  <v-container fluid class="background-container">
    <v-row style="padding: 100px 0">
      <v-col
        cols="12"
        sm="5"
        class="logo hidden-sm-and-down d-none d-md-block"
      ></v-col>
      <v-col cols="12" sm="7" class="d-flex justify-center">
        <v-card color="white" class="card-mobile w-100 w-md-50 mx-auto">
          <v-card-text class="transparent">
            <v-row>
              <v-col cols="1" class="imagen_lateral" />
              <v-col cols="11">
                <v-row>
                  <v-col cols="12">
                    <h1>Editar acta {{ actaInfo.codigo }}</h1>
                    Registro de Intervenciones y Compromisos
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="8">
                    <h2>Información general</h2>
                  </v-col>
                  <v-col cols="4" class="hidden-sm-and-down">
                    <img src="@/assets/logos/Logo.png" width="150px" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" class="reduce-margin-bottom">
                    <label for="">Tema</label>
                    <v-text-field
                      density="compact"
                      v-model="actaInfo.tema"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" class="reduce-margin-bottom">
                    <label for="">Tipo de reunion</label>
                    <v-autocomplete
                      :items="itemsTipo"
                      density="compact"
                      item-value="id"
                      item-title="name"
                      v-model="actaInfo.tipo_reunion"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" class="reduce-margin-bottom">
                    <label for="">Lugar</label>
                    <v-text-field
                      density="compact"
                      v-model="actaInfo.lugar"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" class="reduce-margin-bottom">
                    <label for="">Fecha</label>
                    <v-date-input
                      density="compact"
                      v-model="actaInfo.fecha"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="7" sm="6" class="reduce-margin-bottom">
                    <label for="">Hora inicion</label>
                    <v-text-field
                      density="compact"
                      variant="outlined"
                      v-model="actaInfo.horaInicio"
                      :active="modalInicio"
                      :focused="modalInicio"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                    >
                      <v-dialog
                        v-model="modalInicio"
                        activator="parent"
                        width="auto"
                      >
                        <v-time-picker
                          v-if="modalInicio"
                          format="24"
                          v-model="horaInicio"
                        />
                      </v-dialog>
                    </v-text-field>
                  </v-col>
                  <v-col class="reduce-margin-bottom" cols="7" sm="6">
                    <label for="">Hora fin</label>
                    <v-text-field
                      variant="outlined"
                      v-model="actaInfo.horaFin"
                      density="compact"
                      :active="modalFin"
                      :focused="modalFin"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                    >
                      <v-dialog
                        v-model="modalFin"
                        activator="parent"
                        width="auto"
                      >
                        <v-time-picker
                          v-if="modalFin"
                          v-model="horaFin"
                          format="24"
                        />
                      </v-dialog>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <h2>Contenido</h2>
                  </v-col>
                  <v-col
                    class="reduce-margin-bottom"
                    v-for="(temario, index) in actaInfo.temario"
                    :key="index"
                    cols="12"
                    sm="12"
                  >
                    <label for="">Temario {{ index + 1 }}</label>
                    <v-row>
                      <v-col cols="11" sm="12">
                        <v-text-field
                          readonly
                          density="compact"
                          v-model="actaInfo.temario[index]"
                          variant="outlined"
                        />
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col
                    class="reduce-margin-bottom"
                    cols="12"
                    sm="12"
                    v-if="!asistentesboolean"
                  >
                    <v-checkbox
                      label="Asistentes en la reunion"
                      v-model="asistentesboolean"
                    ></v-checkbox>
                  </v-col>
                  <v-col
                    class="reduce-margin-bottom"
                    cols="10"
                    sm="10"
                    v-if="asistentesboolean"
                  >
                    <label for="">Cantidad de asistentes</label>
                    <v-text-field
                      variant="outlined"
                      density="compact"
                      v-model="actaInfo.cantidad_asistentes"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    class="reduce-margin-bottom"
                    cols="2"
                    sm="2"
                    v-if="asistentesboolean"
                  >
                    <v-icon @click="eliminarAsistentes">mdi-delete</v-icon>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" sm="3"></v-col>
              <v-col cols="6" sm="3">
                <v-spacer></v-spacer>
                <v-btn color="#5B5D5C" href="/acciones">Menu</v-btn>
              </v-col>
              <v-col cols="6" sm="6">
                <v-btn color="#5B5D5C" @click="guardarActa">Guardar</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Modal de información -->
  <v-dialog v-model="infodialog" max-width="600">
    <v-card>
      <v-card-title>
        <center>
          {{ title }} <v-icon> {{ icon }}</v-icon>
        </center>
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
  data() {
    return {
      temario: "",
      actaInfo: {},
      tema: "",
      alert: "",
      icon: "",
      title: "",
      infodialog: false,
      temariosAdicionales: [],
      asistentesboolean: false,
      user: "",
      modalInicio: false,
      modalFin: false,
      itemsTipo: [
        { id: 1, name: "Comite mensual" },
        { id: 2, name: "Verificacion en campo" },
        { id: 3, name: "Inspeccion alumbrado publico" },
        { id: 4, name: "Inventario" },
        { id: 5, name: "Conciliacion" },
        { id: 6, name: "Reunion alcaldia" },
        { id: 7, name: "Reunion concesionario" },
        { id: 8, name: "Reunion interventoria" },
        { id: 9, name: "Reunion usuarios" },
        { id: 10, name: "Otros" },
      ],
    };
  },
  computed: {
    temarios() {
      return [{ temario: this.temario }, ...this.temariosAdicionales];
    },
  },
  methods: {
    async Obtrener() {
      const acta = localStorage.getItem("ItemEditable");
      const parsedActa = acta ? JSON.parse(acta) : "";
      if (parsedActa.cantidad_asistentes !== 0) {
        this.asistentesboolean = true;
      }
      this.actaInfo = parsedActa;
    },
    async guardarActa() {
      // Combina el temario principal con los temarios adicionales
      this.actaInfo.temario = [
        this.actaInfo.temario,
        ...this.temariosAdicionales.map((t) => t.temario),
      ].filter(Boolean);

      console.log("Temarios combinados:", this.actaInfo.temario);

      // El resto del código permanece igual
      const Token = localStorage.getItem("Token") || "";
      if (Token) {
        const base64Url = Token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        this.user = JSON.parse(jsonPayload);
      }

      try {
        const Token = localStorage.getItem("Token") || "";
        const response = await axios.patch(
          `${backend_api}/actas/actualizar/${this.actaInfo.codigo}`,
          this.actaInfo,
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        );
        localStorage.setItem("ActaGenerate", JSON.stringify(response.data));
      } catch (error) {
        console.error(
          "Error al guardar el acta",
          error.response ? error.response.data : error.message
        );
        this.infodialog = true;
        this.alert =
          "Hubo un error al guardar el acta. Por favor, inténtelo de nuevo.";
        this.icon = "mdi-alert-circle";
        this.title = "Error";
      }
    },
    eliminarAsistentes() {
      this.asistentesboolean = false;
      this.cantidadAsistentes = 0;
    },
    eliminarContenido(index) {
      if (index < this.actaInfo.temario.length) {
        this.actaInfo.temario.splice(index, 1);
      } else {
        this.temariosAdicionales.splice(
          index - this.actaInfo.temario.length,
          1
        );
      }
    },
  },
  created() {
    this.Obtrener();
  },
};
</script>

<style scoped>
.background-container {
  background-image: url("@/assets/fondos/Fondo-Img1.png");
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
  top: 35%;
  position: fixed;
  left: 5%;
}

.card-mobile {
  width: 100%;
  max-width: 670px;
  left: 45%;
  top: 10%;
  border-radius: 30px;
  box-shadow: rgb(86, 85, 85) 10px 0px 10px 0px;
  position: absolute;
}

.imagen_lateral {
  background-image: url("@/assets/logos/Logo_Lateral.png");
  margin-top: 10%;
  margin-left: -1%;
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
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
}
.reduce-margin-bottom {
  margin-bottom: -25px;
}
</style>
