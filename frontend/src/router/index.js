import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue' 
import Login from '../components/Login.vue'
import Categoria from '../components/Categoria.vue'
import EntradasRegistros from '../components/EntradasRegistros.vue' 

import EmpleadosAgregar from '../components/EmpleadosAgregar.vue'
import EmpleadosBuscar from '../components/EmpleadosBuscar.vue'
import EmpleadosVacaciones from '../components/EmpleadosVacaciones.vue' 

 
Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        usuario: true,
        administrador: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Categoria,
      meta: {
        libre: true,
        usuario: true
      }
    },
    {
      path: '/entradas/registros',
      name: 'entradas_registros',
      component: EntradasRegistros,
      meta: {
        libre: true,
        usuario: true,
        administrador: true,
      }
    }, 
    {
      path: '/empleados/agregar',
      name: 'empleados_agregar',
      component: EmpleadosAgregar,
      meta: {
        libre: true,
        administrador: true
      }
    },
    {
      path: '/empleados/buscar',
      name: 'empleados_buscar',
      component: EmpleadosBuscar,
      meta: {
        libre: true,
        administrador: true
      }
    },
    {
      path: '/empleados/vacaciones',
      name: 'empleados_vacaciones',
      component: EmpleadosVacaciones,
      meta: {
        libre: true,
        administrador: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        libre: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {  
  if (to.matched.some(record => record.meta.libre)){
    next();
  } else if ( store.state.usuario && store.state.usuario.rol.id== 'usuario'){
    if (to.matched.some(record => record.meta.usuario)){
      next();
    }
  } else if ( store.state.usuario && store.state.usuario.rol.id== 'administrador'){
    if (to.matched.some(record => record.meta.usuario)){
      next();
    }
  } else{
    next({name: 'login'});
  }
})
export default router
