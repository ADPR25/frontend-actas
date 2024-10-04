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
                <v-row>
                  <v-col cols="12">
                    <h1>{{ ActaGenerate.codigo }}</h1>
                    Registro de Intervenciones y Compromisos
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <label for="">Temario</label>
                    <v-select
                      density="compact"
                      v-model="selectedTemario"
                      :items="ActaGenerate.temario"
                      item-title="temario"
                      item-value="temario"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <label for="">Intervenciones</label>
                    <v-textarea
                      v-model="contenidoActa.intervenciones"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <label for="">Compromisos</label>
                    <v-textarea
                      density="compact"
                      v-model="contenidoActa.compromisos"
                      variant="outlined"
                    />
                  </v-col>
                  <!-- Input de Empresa -->
                  <v-col cols="12" :sm="getCols('empresa')">
                    <label for="">Empresa</label>
                    <v-text-field
                      density="compact"
                      v-model="contenidoActa.empresa"
                      variant="outlined"
                    />
                  </v-col>
                  <!-- Input de Fecha -->
                  <v-col cols="12" :sm="getCols('fecha')" v-if="!sinFecha">
                    <label for="">Fecha</label>
                    <v-date-input
                      density="compact"
                      v-model="contenidoActa.fecha"
                      variant="outlined"
                    />
                  </v-col>
                  <!-- Input de Responsable -->
                  <v-col
                    cols="12"
                    :sm="getCols('responsable')"
                    v-if="!sinResponsable"
                  >
                    <label for="">Responsable</label>
                    <v-text-field
                      density="compact"
                      v-model="contenidoActa.responsable"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" sm="5">
                    <v-checkbox
                      label="Sin responsable"
                      v-model="sinResponsable"
                    />
                  </v-col>
                  <v-col cols="0" sm="3" />
                  <v-col cols="12" sm="4">
                    <v-checkbox label="Sin Fecha" v-model="sinFecha" />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
          <v-card-actions class="transparent">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="enviarContenidoActa">Enviar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="infodialog" max-width="600">
    <v-card>
      <v-card-title class="d-flex justify-center">
        {{ title }}
        <v-icon>{{ icon }}</v-icon>
      </v-card-title>
      <v-card-text>
        {{ alert }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="generarContenido()"
          ><img src="@/assets/icons/plus.png" width="20px" /> contenido</v-btn
        >
        <v-btn color="primary" @click="cerrarActa">Firmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogFirma" max-width="600">
    <v-card>
      <v-card-title class="d-flex justify-center">
        <b>Firma digital</b>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12">
            De conformidad con el Decreto 2150 de 1995 y la resolución 220 del 5
            de octubre del 2004, la firma mecánica aquí plasmada tiene plena
            validez para todos los efectos legales sobre este acta de reunión.
          </v-col>
          <v-col cols="12" sm="12">
            <vue-signature-pad
              ref="signaturePad"
              :options="signaturePadOptions"
              style="border: 2px solid black; width: 100%; height: 300px"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="guardarFirma">Guardar información</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="creada" max-width="600">
    <v-card>
      <v-card-title class="d-flex justify-center">
        ACTA CREADA EXITOSAMENTE
      </v-card-title>
      <v-card-text>
        La acta se creo y guardo exitosamente en la base de datos
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="cerrarTodo">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { VueSignaturePad } from "vue-signature-pad";

export default {
  components: {
    VueSignaturePad,
  },
  data() {
    return {
      ActaGenerate: {
        codigo: "",
        temario: [],
      },
      contenidoActa: {
        intervenciones: "",
        temario_code: "",
        compromisos: "",
        empresa: "",
        fecha: null,
        responsable: "",
        acta: "",
      },
      infodialog: false,
      selectedTemario: "",
      dialogFirma: false,
      creada: false,
      title: "Información",
      icon: "mdi-information",
      alert: "Esta es una alerta de ejemplo.",
      sinResponsable: false,
      sinFecha: false,
    };
  },
  methods: {
    async TraerInformacionActa() {
      try {
        this.ActaGenerate = JSON.parse(
          localStorage.getItem("ActaGenerate") || "{}"
        );
        this.contenidoActa.acta = this.ActaGenerate.codigo;
      } catch (error) {
        console.error("Error al obtener la información del acta:", error);
      }
    },
    async enviarContenidoActa() {
      this.contenidoActa.temario_code = this.selectedTemario;

      try {
        const Token = localStorage.getItem("Token") || "";
        await axios.post(
          `${import.meta.env.VITE_RUTA_APP}/contenido-actas/create`,
          {
            codigo: this.ActaGenerate.codigo,
            ...this.contenidoActa,
          },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        this.alert = "La información se ha guardado correctamente.";
        this.infodialog = true;
      } catch (error) {
        console.error("Error al enviar la información:", error);
        this.infodialog = false;
      }
    },
    getCols(field) {
      if (this.sinResponsable && this.sinFecha) {
        return 12;
      }
      if (
        (this.sinResponsable && field !== "responsable") ||
        (this.sinFecha && field !== "fecha")
      ) {
        return 6;
      }
      return 4;
    },
    generarContenido() {
      this.infodialog = false;
      this.contenidoActa = {
        intervenciones: "",
        compromisos: "",
        empresa: "",
        fecha: null,
        responsable: "",
        acta: this.ActaGenerate.codigo,
        temario_code: "",
      };
      this.selectedTemario = "";
      this.sinResponsable = false;
      this.sinFecha = false;
    },
    cerrarActa() {
      this.infodialog = false;
      this.dialogFirma = true;
    },
    async guardarFirma() {
      try {
        const Token = localStorage.getItem("Token") || "";
        const signaturePad = this.$refs.signaturePad;
        const firmaBase64 = signaturePad.saveSignature();

        await axios.patch(
          `${import.meta.env.VITE_RUTA_APP}/actas/actualizar/${
            this.ActaGenerate.codigo
          }`,
          { firma: firmaBase64.data },
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        );

        this.infodialog = false;
        this.dialogFirma = false;
        this.creada = true;
      } catch (error) {
        console.error("Error al guardar la firma:", error);
      }
    },

    clearSignature() {
      this.$refs.signaturePad.clear();
    },
    cerrarTodo() {
      window.location.href = "/qr-code";
    },
  },
  computed: {
    formattedTemario() {
      if (
        this.ActaGenerate.temario &&
        Array.isArray(this.ActaGenerate.temario)
      ) {
        return this.ActaGenerate.temario
          .map((item, index) => `Temario ${index + 1}: ${item.temario}`)
          .join("\n");
      }
      return "";
    },
  },
  mounted() {
    this.infodialog = false;
    this.TraerInformacionActa();
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
</style>
