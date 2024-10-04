import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import { RutasAdicionales } from "./aditionalRoutes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...RutasAdicionales],
});

const unprotectedRoutes = [
  "/",
  "/acta-response/*",
  "/user-no-exist/*",
  "/gracias",
  "/error"
];

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("TokenDecode");
  const isActaAuthenticated = !!localStorage.getItem("Token_2");

  const isUnprotectedRoute = unprotectedRoutes.some((route) => {
    const regex = new RegExp(
      `^${route.replace(/:\w+/g, "\\w+").replace(/\*/g, ".*")}$`
    );
    return regex.test(to.path);
  });

  if (isUnprotectedRoute) {
    return next();
  }

  if (isAuthenticated) {
    return next();
  }

  // Handling Acta routes separately
  const actaRoutePattern = /^\/acta\/[^/]+$/;

  if (actaRoutePattern.test(to.path)) {
    if (isActaAuthenticated) {
      return next();
    }
    return next("/");
  }

  // Redirect to home if the user is not authenticated
  next("/");
});


router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
