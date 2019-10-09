<template>
  <div class="bg">
    <q-layout view="lHh Lpr lFf">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light col-lg text-center"
        style=" ;max-width:100vw !important; border-top: 0px;background-color:#34ebe9 !important; margin-left: 0px; "
      >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#/" style="margin-left:20vw ">
          <img src="../css/images/logo.png" style="max-height:3vh !important" />
        </a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0" style="margin-right:20vw">
            <div
              style="border-right: 1px solid #045b8a; height: 20px; margin-left: 10px;  margin-top: 8px; margin-right: 10px;"
            ></div>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      <q-page-container>
        <transition
          name="fade"
          mode="out-in"
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutDown"
        >
          <router-view />
        </transition>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { openURL } from "quasar";
import axios from "axios";
export default {
  data() {
    return {};
  },

  methods: {
    openURL,
    logout() {
      localStorage.removeItem("usertoken");
      this.$router.push("/login");
    }
  }
};
</script>
<style >
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css";
.bg {
  background: linear-gradient(
      rgba(255, 251, 251, 0.815),
      rgba(255, 249, 249, 0.678)
    ),
    url("..\css\images\bg3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>