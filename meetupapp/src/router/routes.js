import Router from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("layouts/LogIn.vue"),
    children: [
      { path: "", component: () => import("pages/login/Index.vue") },
      { path: "about", component: () => import("pages/login/About.vue") },
      { path: "login", component: () => import("pages/login/login.vue") },
      { path: "register", component: () => import("pages/login/Register.vue") }
    ]
  },
  {
    path: "/user",
    component: () => import("layouts/LoggedIn.vue"),
    children: [
      {
        path: "meetup",
        component: () => import("pages/user/meetup.vue")
      },
      {
        path: "profile",
        component: () => import("pages/user/user.vue")
      },

      {
        path: "recommend",
        component: () => import("pages/user/recommend.vue")
      },
      {
        path: "events",
        component: () => import("pages/user/events.vue")
      }
    ]
  },
  {
    path: "/api",
    component: () => import("layouts/Auth.vue"),
    children: [
      {
        path: "auth",
        component: () => import("pages/auth/auth.vue")
      },
      {
        path: "connect",
        component: () => import("pages/auth/connect.vue")
      },
      {
        path: "redirect",
        component: () => import("pages/auth/redirect.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
