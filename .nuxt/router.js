import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _203791ae = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _61014878 = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _32ed1189 = () => interopDefault(import('..\\pages\\index copy.vue' /* webpackChunkName: "pages/index copy" */))
const _534efe78 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _34910a53 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _aabd6ee0 = () => interopDefault(import('..\\pages\\logout.vue' /* webpackChunkName: "pages/logout" */))
const _0e5cecae = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _0cc8bc82 = () => interopDefault(import('..\\pages\\registration.vue' /* webpackChunkName: "pages/registration" */))
const _46e0775a = () => interopDefault(import('..\\pages\\admin\\logs\\index.vue' /* webpackChunkName: "pages/admin/logs/index" */))
const _c245eb9a = () => interopDefault(import('..\\pages\\admin\\role\\index.vue' /* webpackChunkName: "pages/admin/role/index" */))
const _abfa9bfe = () => interopDefault(import('..\\pages\\dashboard\\index copy.vue' /* webpackChunkName: "pages/dashboard/index copy" */))
const _16689190 = () => interopDefault(import('..\\pages\\dashboard\\test.vue' /* webpackChunkName: "pages/dashboard/test" */))
const _647886eb = () => interopDefault(import('..\\pages\\admin\\role\\create.vue' /* webpackChunkName: "pages/admin/role/create" */))
const _60329ac0 = () => interopDefault(import('..\\pages\\admin\\user\\create.vue' /* webpackChunkName: "pages/admin/user/create" */))
const _68377ef8 = () => interopDefault(import('..\\pages\\dashboard\\account\\manage.vue' /* webpackChunkName: "pages/dashboard/account/manage" */))
const _6ae9673c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _f1e5a4fa = () => interopDefault(import('..\\pages\\_username\\index.vue' /* webpackChunkName: "pages/_username/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _203791ae,
    name: "admin"
  }, {
    path: "/dashboard",
    component: _61014878,
    name: "dashboard"
  }, {
    path: "/index%20copy",
    component: _32ed1189,
    name: "index copy"
  }, {
    path: "/inspire",
    component: _534efe78,
    name: "inspire"
  }, {
    path: "/login",
    component: _34910a53,
    name: "login"
  }, {
    path: "/logout",
    component: _aabd6ee0,
    name: "logout"
  }, {
    path: "/register",
    component: _0e5cecae,
    name: "register"
  }, {
    path: "/registration",
    component: _0cc8bc82,
    name: "registration"
  }, {
    path: "/admin/logs",
    component: _46e0775a,
    name: "admin-logs"
  }, {
    path: "/admin/role",
    component: _c245eb9a,
    name: "admin-role"
  }, {
    path: "/dashboard/index%20copy",
    component: _abfa9bfe,
    name: "dashboard-index copy"
  }, {
    path: "/dashboard/test",
    component: _16689190,
    name: "dashboard-test"
  }, {
    path: "/admin/role/create",
    component: _647886eb,
    name: "admin-role-create"
  }, {
    path: "/admin/user/create",
    component: _60329ac0,
    name: "admin-user-create"
  }, {
    path: "/dashboard/account/manage",
    component: _68377ef8,
    name: "dashboard-account-manage"
  }, {
    path: "/",
    component: _6ae9673c,
    name: "index"
  }, {
    path: "/:username",
    component: _f1e5a4fa,
    name: "username"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
