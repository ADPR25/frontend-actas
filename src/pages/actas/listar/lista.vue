<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-row class="h-screen" no-gutters style="background-color: #f2b934">
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
                LISTADO DE ACTAS
              </h2>
            </v-col>
            <v-col cols="12" sm="2" class="d-flex justify-center">
              <v-btn style="top: 25px" href="/create-acta" color="#5B5D5C"
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
                <template v-slot:item.descargar="{ item }">
                  <v-icon @click="descargarPdf(item)">mdi-download</v-icon>
                </template>

                <template v-slot:item.editar="{ item }">
                  <v-icon @click="editar(item)">mdi-pencil</v-icon>
                </template>

                <template v-slot:item.tipo_reunion="{ item }">
                  <p>
                    {{ tipoActaMap.get(item.tipo_reunion) || "Desconocido" }}
                  </p>
                </template>

                <template v-slot:item.estado="{ item }">
                  <p v-if="item.estado === 1">Activo</p>
                  <p v-else-if="item.estado === 2">Inactivo</p>
                  <p v-else>Desconocido</p>
                </template>
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
import axios from "axios";
import { ref } from "vue";

const backend_api = import.meta.env.VITE_RUTA_APP;

const desserts = ref([]);
const search = ref("");
const Informacion_acta = ref();
const contenido_acta = ref();
const images = ref<string[]>([]);

const usuarios_acta = ref();

const headers = [
  { key: "fecha", title: "Fecha" },
  { key: "tema", title: "Tema" },
  { key: "tipo_reunion", title: "Tipo Acta" },
  { key: "hora", title: "Hora" },
  { key: "lugar", title: "Lugar" },
  { key: "codigo", title: "Codigo" },
  { key: "estado", title: "Estado" },
  { key: "descargar", title: "Descargar" },
  { key: "editar", title: "Editar" },
];

const tipoActa = [
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
];

const tipoActaMap = new Map(tipoActa.map((item) => [item.id, item.name]));

const TraerActas = async () => {
  try {
    const Token = localStorage.getItem("Token") || "";
    const { data } = await axios.get(`${backend_api}/actas/obtener`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });

    desserts.value = data.map((acta: any) => ({
      ...acta,
      hora: `${acta.horaInicio} - ${acta.horaFin}`,
    }));

    images.value = data.map((acta: any) => ({
      codigo: acta.codigo,
      firma: acta.firma,
    }));
  } catch (error) {
    console.error(error);
  }
};

const editar = async (item: any) => {
  localStorage.setItem("ItemEditable", JSON.stringify(item));
  window.location.href = "/acta/editar/informacion";
};

const descargarPdf = async (acta: any) => {
  Informacion_acta.value = acta;
  try {
    const Token = localStorage.getItem("Token") || "";
    const responseFirmas = await axios.post(
      `${backend_api}/firmas-users/buscar-por-cedulas-y-acta`,
      { cedulas: acta.usuarios, acta: acta.codigo },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    const firmas = responseFirmas.data;

    const responseUsuarios = await axios.post(
      `${backend_api}/usuario/obtener_por_cedulas`,
      { cedulas: acta.usuarios, acces: 2 },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    usuarios_acta.value = responseUsuarios.data.map((usuario: any) => {
      const firma = firmas.find(
        (firma: any) => firma.usuario === usuario.cedula
      );
      return {
        ...usuario,
        firma: firma ? firma.firma : null,
      };
    });

    await traerContenido_acta(acta.codigo);
  } catch (error) {
    console.error(error);
  }
};

const traerContenido_acta = async (id: string) => {
  try {
    const Token = localStorage.getItem("Token") || "";
    const { data } = await axios.get(
      `${backend_api}/contenido-actas/obtener/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    contenido_acta.value = data;
    await descargarcontenido();
  } catch (error) {
    console.error(error);
  }
};

const descargarcontenido = async () => {
  const documentData = {
    acta: {
      ...Informacion_acta.value,
      tipo_reunion:
        tipoActaMap.get(Informacion_acta.value.tipo_reunion) || "Desconocido",
    },
    contenido: contenido_acta.value,
    usuarios: usuarios_acta.value,
  };

  try {
    const Token = localStorage.getItem("Token") || "";
    const response = await axios.post(
      `${backend_api}/doc/generate`,
      documentData,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${Informacion_acta.value.codigo}.docx`;
    link.click();
  } catch (error) {
    console.error(error);
  }
};

TraerActas();
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
