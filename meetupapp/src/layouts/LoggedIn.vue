<template>
  <div class="bg">
    <q-layout view="lHh Lpr lFf">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light col-lg text-center"
        style="  border-top: 0px;background-color: #34ebe9 !important;  margin-left: 0px; "
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
        <a class="navbar-brand" href="#/" style="font-size:1.2vw; margin-left:20vw !important">
          <img src="../css/images/logo.png" style="max-height:3vh !important ; " />
        </a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0" style="margin-right:20vw; font-size:15px">
            <li class="nav-item">
              <a class="nav-link" href="#/user/meetup">Events</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Explore</a>
              <div
                class="dropdown-menu animate slideIn"
                style="border-radius:0 !important ;background : linear-gradient(to  bottom, white);  min-width:2vw !important; margin-top:0.9vh "
                aria-labelledby="navbarDropdown"
              >
                <a class="dropdown-item" href="#/user/events">Events</a>
                <a class="dropdown-item" href="#/user/recommend">Groups</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/user/profile">Profile</a>
            </li>
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
          enter-active-class="animated fadeInLeft fast"
          leave-active-class="animated fadeOutRight fast"
        >
          <router-view />
        </transition>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  beforeCreate() {
    if (!localStorage.usertoken) {
      this.$router.push("/login");
      alert("Please login");
    }
  },

  methods: {
    openURL,
    logout() {
      console.log(localStorage.usertoken);
      localStorage.removeItem("usertoken");
      this.$router.push("/login");
    }
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
  max-width: 100%;
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

@media (min-width: 992px) {
  .animate {
    animation-duration: 0.3s;
    -webkit-animation-duration: 0.3s;
    animation-fill-mode: both;
    -webkit-animation-fill-mode: both;
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(1rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0rem);
    opacity: 1;
  }
  0% {
    transform: translateY(1rem);
    opacity: 0;
  }
}

@-webkit-keyframes slideIn {
  0% {
    -webkit-transform: transform;
    -webkit-opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    -webkit-opacity: 1;
  }
  0% {
    -webkit-transform: translateY(1rem);
    -webkit-opacity: 0;
  }
}

.slideIn {
  -webkit-animation-name: slideIn;
  animation-name: slideIn;
}
</style>

