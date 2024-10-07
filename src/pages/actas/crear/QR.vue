<template>
  <v-container fluid class="background-container">
    <v-card
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
          <v-col cols="12" sm="12">
            <center>
              <p
                @click="copyToClipboard"
                style="cursor: pointer; font-size: 1.3rem"
              >
                {{ actaUrl }}
              </p>
            </center>
          </v-col>
          <v-col cols="12" sm="12" class="d-flex justify-center">
            <vue-qrcode :value="actaUrl" class="qr-code" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" href="./acciones">
          Regresar al menu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

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
import VueQrcode from "vue-qrcode";

export default {
  components: {
    VueQrcode,
  },
  data() {
    return {
      ActaGenerate: {},
      actaUrl: "",
      infodialog: false,
      title: "",
      icon: "",
      alert: "",
    };
  },
  methods: {
    async TraerInformacionActa() {
      try {
        this.ActaGenerate = JSON.parse(
          localStorage.getItem("ActaGenerate") || "{}"
        );
        const codigoActa = this.ActaGenerate.codigo;
        this.actaUrl = `${window.location.origin}/acta-response/${codigoActa}`;
      } catch (error) {
        console.error("Error al obtener la información del acta:", error);
      }
    },
    copyToClipboard() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.actaUrl).then(
          () => {
            this.infodialog = true;
            this.title = "URL copiada";
            this.icon = "mdi-information";
            this.alert = "La URL se ha copiado al portapapeles.";
          },
          (error) => {
            console.error("Error al copiar la URL al portapapeles:", error);
            this.infodialog = true;
            this.title = "Error al copiar";
            this.icon = "mdi-alert-circle";
            this.alert = "Hubo un problema al copiar la URL al portapapeles.";
          }
        );
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = this.actaUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        console.log("URL copiada al portapapeles");
      }
    },
  },
  mounted() {
    this.TraerInformacionActa();
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

.qr-code {
  width: 250px;
  height: auto;
}
</style>
