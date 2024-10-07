import Login from '@/pages/auth/login.vue';
import Acciones from '@/pages/acciones/acciones.vue';
import createActa from '@/pages/actas/crear/crearacta.vue';
import createActa2 from '@/pages/actas/crear/crearactaextend.vue';
import listadoActas from '@/pages/actas/listar/lista.vue';
import listAsistentes from '@/pages/asistentes/asistentes.vue';
import qrView from '@/pages/actas/crear/QR.vue';
import resposeActa from '@/pages/actas/response/response.vue';
import ActaExist from '@/pages/actas/response/userexistent.vue';
import ActaNExist from '@/pages/actas/response/userInexist.vue';
import Gracias from '@/pages/gracias/firmada.vue';
import error from '@/pages/error/error.vue';
import CrearAsistente  from '@/pages/asistentes/create.vue';
import editarActaPart1 from '@/pages/actas/editar/editarInfo.vue';


export const RutasAdicionales = [
  {
    path: "/acciones",
    component: Acciones,
  },
  {
    path: "/create-acta",
    component: createActa,
  },
  {
    path: "/create-acta-part-2",
    component: createActa2,
  },
  {
    path: "/listado-actas",
    component: listadoActas,
  },
  {
    path: "/listado-asistentes",
    component: listAsistentes,
  },
  {
    path: '/qr-code',
    component: qrView,
  },
  {
    path: '/error',
    component: error,
  },
  {
    path: '/acta-response/:codigo',
    component: resposeActa,
  },
  {
    path: '/acta/:codigo',
    component: ActaExist,
  },
  {
    path: '/user-no-exist/:codigo',
    component: ActaNExist,
  },
  {
    path: "/gracias",
    component: Gracias,
  },
  {
    path: "/asistentes/crear",
    component: CrearAsistente,
  },
  {
    path: "/acta/editar/informacion",
    component: editarActaPart1,    
  },
  {
    path: "/",
    component: Login,
  },
];
