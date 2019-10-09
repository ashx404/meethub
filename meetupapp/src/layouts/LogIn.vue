<template>
  <div class="bg">
    <q-layout view="lHh Lpr lFf">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light col-lg text-center"
        style="   border-top: 0px; background-color: #34ebe9 !important;  margin-left: 0px; "
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
        <a class="navbar-brand" style="font-size:1.2vw; margin-left:20vw !important" href="#/about">
          <img src="../css/images/logo.png" style="max-height:3vh !important" />
        </a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0" style="margin-right:20vw !important">
            <li class="nav-item">
              <a class="nav-link" style="font-size:0.85vw" href="#/about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" style="font-size:0.85vw" href="#/register">Sign Up</a>
            </li>
            <div
              style="border-right: 1px solid #045b8a; height: 20px; margin-left: 10px; line-height:1.5; margin-top: 9px; margin-right: 10px; "
            ></div>

            <li class="nav-item">
              <a class="nav-link" style="font-size:0.85vw" href="#/login">Login</a>
            </li>
          </ul>
        </div>
      </nav>

      <q-page-container>
        <transition
          name="fade"
          mode="out-in"
          enter-active-class="animated fadeInDown fast"
          leave-active-class="animated fadeOutDown fast"
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
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  beforeCreate() {
    let self = this;
    if (localStorage.usertoken) {
      axios
        .get("http://127.0.0.1:5000/users/verify", {
          params: {
            token: localStorage.usertoken
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.status === 6000) {
            self.$router.push("/user/profile");
          }
          if (response.data.status === 3000) {
            localStorage.removeItem("usertoken");
          }
        });
    }
  },
  methods: {
    openURL
  }
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css";
* {
  margin: 0;
  padding: 0;
}
.row {
  max-width: 100vw;
}
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
