<template>
  <div v-if="error_s">
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
                    <v-col cols="5">
                      <h1>
                        ACTA <br />
                        REUNION
                      </h1>
                    </v-col>
                    <v-col cols="7">
                      <h1>{{ ActaGenerate.codigo }}</h1>
                      <v-row>
                        <v-col cols="12" sm="5">
                          {{ ActaGenerate.tema }} <br />
                          {{ ActaGenerate.tipo_reunion }}
                        </v-col>
                        <v-col cols="12" sm="7">
                          {{ ActaGenerate.lugar }} <br />
                          {{ ActaGenerate.horaInicio }} -
                          {{ ActaGenerate.horaFin }}
                          <br />
                          {{ ActaGenerate.fecha }}
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <h2>Temario:</h2>
                      <v-virtual-scroll
                        :items="ActaGenerate.temario"
                        height="80"
                      >
                        <template v-slot:default="{ item, index }">
                          &nbsp;&nbsp;&nbsp;{{ index + 1 }}&nbsp;)&nbsp;{{
                            item
                          }}
                        </template>
                      </v-virtual-scroll>
                    </v-col>
                    <div class="linea_divisora" />
                    <v-col cols="12">
                      <h2>Intervenciones:</h2>
                      <v-virtual-scroll
                        :items="ContenidoActa.intervenciones"
                        height="120"
                      >
                        <template v-slot:default="{ item, index }">
                          &nbsp;&nbsp;&nbsp;{{ index + 1 }}&nbsp;)&nbsp;{{
                            item
                          }}
                        </template>
                      </v-virtual-scroll>
                    </v-col>
                    <div class="linea_divisora" />
                    <v-col cols="12">
                      <h2>Compromisos:</h2>
                      <v-virtual-scroll
                        :items="ContenidoActa.compromisos"
                        height="100"
                      >
                        <template v-slot:default="{ item, index }">
                          &nbsp;&nbsp;&nbsp;{{ index + 1 }}&nbsp;)&nbsp;{{
                            item
                          }}
                        </template>
                      </v-virtual-scroll>
                    </v-col>
                    <div class="linea_divisora" />
                    <v-col cols="12" sm="6">
                      <h2>
                        Asistentes: {{ Usuarios.length }} /
                        {{ ActaGenerate.cantidad_asistentes }}
                      </h2>
                      <v-virtual-scroll :items="Usuarios" height="100">
                        <template v-slot:default="{ item, index }">
                          <div style="font-size: 18px">
                            &nbsp;&nbsp;&nbsp;{{ index + 1 }} )
                            {{ item.nombre }}
                            {{ item.apellidos }}
                          </div>
                        </template>
                      </v-virtual-scroll>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      class="hidden-sm-and-down d-none d-md-block"
                    >
                      <img src="@/assets/logos/Logo.png" width="90%" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                v-if="firma_login"
                color="primary"
                @click="dialogFirma = true"
              >
                Firmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <div v-if="error_n">
    <v-row no-gutters class="h-screen">
      <v-col class="d-flex align-center justify-center">
        <div class="text-center">
          <div class="CardMediaWrapper">
            <img
              src="@/assets/maintenance/img-error-bg.svg"
              alt="grid"
              class="w-100"
            />
            <img
              src="@/assets/maintenance/img-error-blue.svg"
              alt="grid"
              class="CardMediaParts"
            />
            <img
              src="@/assets/maintenance/img-error-text.svg"
              alt="build"
              class="CardMediaBuild"
            />
            <img
              src="@/assets/maintenance/img-error-purple.svg"
              alt="build"
              class="CardMediaBuild"
            />
          </div>
          <h1 class="text-h1">Something is wrong</h1>
          <p>
            <small
              >The page you are looking was moved, removed, <br />renamed, or
              might never exist!
            </small>
          </p>
          <v-btn
            variant="flat"
            color="primary"
            class="mt-4"
            to="/"
            prepend-icon="mdi-home"
          >
            Home</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </div>

  <v-dialog class="borde" v-model="dialogFirma" max-width="600">
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
              v-model="firmaUsuario"
              ref="signaturePad"
              :options="signaturePadOptions"
              style="border: 2px solid black; width: 100%; height: 300px"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="GuardarEnviar"
          >Guardar información</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogFirmaPost" max-width="600">
    <v-card>
      <v-card-title class="d-flex justify-center">
        <b>Firma digital</b>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12">
            {{ texto }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialogFirmaPost = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
const backend_api = import.meta.env.VITE_RUTA_APP;
import { VueSignaturePad } from "vue-signature-pad";
export default {
  components: {
    VueSignaturePad,
  },
  data() {
    return {
      ActaGenerate: {},
      ContenidoActa: {},
      dialogFirmaPost: false,
      firmaUsuario: "",
      acta02:  {},
      decodeToken: "",
      firma_login: true,
      texto: "",
      error_n: false,
      error_s: false,
      dialogFirma: false,
      Usuarios: [],
    };
  },
  methods: {
    async TraerInformacionActa() {
      try {
        const currentUrl = window.location.pathname;
        const Token = localStorage.getItem("Token_2") || "";
        const codigo = currentUrl.split("/acta/")[1];
        const response = await axios.get(
          `${backend_api}/actas/obtener/${codigo}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        );
        this.ActaGenerate = response.data;
        this.conteo_firmas();
        this.TraerContenidoActa();
      } catch (error) {
        console.error("Error al obtener la información del acta:", error);
      }
    },
    async TraerContenidoActa() {
      try {
        const currentUrl = window.location.pathname;
        const Token = localStorage.getItem("Token_2") || "";
        const codigo = currentUrl.split("/acta/")[1];
        const response = await axios.get(
          `${backend_api}/contenido-actas/obtener/${codigo}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        );
        this.ContenidoActa.intervenciones = response.data.map(
          (item) => item.intervenciones
        );
        this.ContenidoActa.compromisos = response.data.map(
          (item) => item.compromisos
        );
        this.traerAsistentes();
      } catch (error) {
        console.error("Error al obtener la información del acta:", error);
      }
    },
    async traerAsistentes() {
      try {
        const Token = localStorage.getItem("Token_2") || "";
        const response = await axios.post(
          `${backend_api}/usuario/obtener_por_cedulas`,
          { cedulas: this.ActaGenerate.usuarios },
          {
            headers: { Authorization: `Bearer ${Token}` },
          }
        );
        this.Usuarios = response.data;
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    },
    async GuardarEnviar() {
      const signaturePadInstance = this.$refs.signaturePad.signaturePad;
      if (
        signaturePadInstance &&
        typeof signaturePadInstance.toDataURL === "function"
      ) {
        const base64Signature = signaturePadInstance.toDataURL();
        const Token = localStorage.getItem("Token_2") || "";
        const currentUrl = window.location.pathname;
        const codigo = currentUrl.split("/acta/")[1];
        const datos = {
          usuario: this.decodeToken.cedula,
          firma: base64Signature,
          acta: codigo,
        };
        try {
          const response = await axios.post(
            `${backend_api}/firmas-users/crear`,
            datos,
            {
              headers: { Authorization: `Bearer ${Token}` },
            }
          );
          if (response.status === 201) {
            await this.create2();
            setTimeout(() => {
              localStorage.clear();
              this.$router.push("/gracias");
            }, 500);
          }
        } catch (error) {
          console.error("Error al guardar la firma:", error);
        }
      }
    },
    async create2() {
      try {
        const Token = localStorage.getItem("Token_2") || "";
        const currentUrl = window.location.pathname;
        const codigo = currentUrl.split("/acta/")[1];
        const response = await axios.get(`${backend_api}/actas/obtener/${codigo}`, {
          headers: { Authorization: `Bearer ${Token}` },
        });

        this.acta02 = response.data;

        const usuarioActual = this.decodeToken.cedula;
        const lista_usuarios = Array.from(this.ActaGenerate.usuarios);
        const usuarioEnLista = lista_usuarios.some(
          (usuario) => usuario.trim() === usuarioActual.toString().trim()
        );

        if (usuarioEnLista) {
          console.log("El usuario pertenece a la lista");
        } else {
          console.log("El usuario no pertenece a la lista");
          const updatedUsuarios = [
            ...this.acta02.usuarios,
            this.decodeToken.cedula,
          ];
          await axios.patch(
            `${backend_api}/actas/actualizar/${codigo}`,
            { usuarios: updatedUsuarios },
            {
              headers: { Authorization: `Bearer ${Token}` },
            }
          );
        }
      } catch (error) {
        console.error("Error al actualizar la información del acta:", error);
      }
    },
    token() {
      const Token = localStorage.getItem("Token_2") || "";
      function base64UrlDecode(base64Url) {
        const base64 = base64Url
          .replace(/-/g, "+")
          .replace(/_/g, "/")
          .concat("==".slice(0, (4 - (base64Url.length % 4)) % 4));
        return decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join("")
        );
      }

      if (Token) {
        const parts = Token.split(".");
        if (parts.length === 3) {
          const payload = parts[1];
          try {
            const decodedPayload = base64UrlDecode(payload);
            const parsedPayload = JSON.parse(decodedPayload);
            this.decodeToken = parsedPayload;
          } catch (error) {
            console.error("Error al decodificar el payload:", error);
          }
        } else {
          console.error("El token no tiene el formato esperado.");
        }
      } else {
        console.log("No se encontró el token.");
      }
    },
    async validateActa() {
      const Token = localStorage.getItem("Token_2") || "";
      const currentUrl = window.location.pathname;
      const codigo = currentUrl.split("/acta/")[1];
      const datos = {
        usuario: this.decodeToken.cedula,
        acta: codigo,
      };
      try {
        const response = await axios.get(
          `${backend_api}/firmas-users/obtener-acta-usuario`,
          { params: datos, headers: { Authorization: `Bearer ${Token}` } }
        );
        this.texto = `El usuario con el numero de cedula ${response.data.usuario} ya tiene una firma en el  ${response.data.acta} no es necesario que diligencie mas informacion en esta vista reuniones de  acta`;
        this.dialogFirmaPost = true;
        this.firma_login = false;
      } catch (error) {
        console.error("Error en validateActa:", error);
      }
    },
    conteo_firmas() {
      const cantidadUsuarios = this.ActaGenerate.usuarios.length;
      const cantidadAsistentes = this.ActaGenerate.cantidad_asistentes;
      const usuarioActual = this.decodeToken.cedula;
      const lista_usuarios = Array.from(this.ActaGenerate.usuarios);

      const usuarioEnLista = lista_usuarios.some(
        (usuario) => usuario.trim() === usuarioActual.toString().trim()
      );

      if (cantidadUsuarios === cantidadAsistentes) {
        if (usuarioEnLista) {
          this.error_s = true;
          this.error_n = false;
        }
      } else if (cantidadUsuarios < cantidadAsistentes) {
        this.error_s = true;
        this.error_n = false;
      }
    },
  },

  mounted() {
    this.TraerInformacionActa();
    this.token();
    this.validateActa();
  },
};
</script>

<style scoped>
.CardMediaWrapper {
  max-width: 720px;
  margin: 0 auto;
  position: relative;
}
.CardMediaBuild {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: 5s bounce ease-in-out infinite;
}
.CardMediaParts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: 10s blink ease-in-out infinite;
}

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
  box-shadow: black 10px 0px 10px 0px;
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

.linea_divisora {
  background-color: black;
  width: 100%;
  height: 3px;
}

.borde {
  border-radius: 30px;
}
</style>
