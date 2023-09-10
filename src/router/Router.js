import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/dashboard",
      redirect: "/dashboard/classic-dashboard",
      component: () => import("@/layouts/full-layout/FullLayout"),
      children: [
        {
          name: "الرئيسية",
          path: "/home",
          component: () => import("@/views/home/Home"),
        },
        {
          name: "الابتدائيات",
          path: "/primary-schools",
          component: () => import("@/views/schools/Primary"),
        },
        {
          name: "المتوسطات",
          path: "/middle-schools",
          component: () => import("@/views/schools/Middle"),
        },
        {
          name: "الثانويات",
          path: "/secondary-schools",
          component: () => import("@/views/schools/Secondary"),
        },

      ],
      beforeEnter: async (to, from, next) => {
        const  token  = localStorage.getItem('_utoken');
        if (token == null) {
          return next("/");
        }
        return next();
      },
    },
    {
      //path: "/authentication",
      path: "/",
      component: () => import("@/views/authentication/BoxedLogin"),
      beforeEnter: async (to, from, next) => {
        const  token  = localStorage.getItem('_utoken');
        if (token != null) {
          return next("/home");
        }
        return next();
      },
    },
    {
      name: "استرجاع كلمة السر",
      path: "/forget-password",
      component: () => import("@/views/authentication/ForgetPassword"),
    },
    {
      name: "اعاة كلمة السر",
      path: "/reset-password",
      component: () => import("@/views/authentication/ResetPassword"),
    },
    {
      path: "*",
      component: () => import("@/views/authentication/Error"),
    },
  ],
});

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800);
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

// router.beforeEach((to, from, next) =>
// {
//   const  token  = localStorage.getItem('_utoken');
//
//
//     if (token === null) {
//       next({
//         path: '/',
//       })
//     }
//
//
//
// });

export default router;
