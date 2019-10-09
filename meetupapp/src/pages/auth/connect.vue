<template>
  <div class="row justify-content-center mt-5 pt-5" style="max-width:95vw">
    <div class="container">
      <h1>{{redirect()}}</h1>
    </div>
    <div class="col-lg-8 mr-2 ml-2 justify-content-center">
      <div class="row justify-content-center">
        <div v-if="show" class="col-lg-3 px-2 pb-5">
          <div
            class="col-lg-12 text-center mt-3 mb-3"
            style="font-size:25px"
          >Welcome , {{firstName}}</div>
          <div class="px-5">
            <div class="px-5 pb-5 pt-2">
              <img :src="avatar" class="profile" alt="Profile picture" height="auto" width="105%" />
            </div>
          </div>
        </div>

        <div class="col-lg-2 align-self-center" style="text-align: center">
          <div
            style="border-right: 1px solid #045b8a; height: 250px; line-height:1.5; display: inline-block "
          ></div>
        </div>

        <div v-if="show" class="col-lg-3 align-self-center">
          <div
            class="google align-self-center"
            style="cursor: pointer; -moz-user-select: none; top:40%;transition: background 120ms ease-in 0s; display: inline-flex; align-items: center; white-space: nowrap; height: 36px; border-radius: 3px; color: rgb(252, 3, 94); font-size: 14px; line-height: 1; padding-left: 12px; padding-right: 12px; background: rgba(252, 151, 187, 0.2) none repeat scroll 0% 0%; font-weight: 500; box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px, rgba(242, 68, 152, 0.3) 0px 0px 0px 1px inset; width: 100%; justify-content: center;"
            v-on:click="authMeetup()"
          >Connect Meetup</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style >
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css";
.profile {
  border: 2px solid rgba(58, 220, 241, 0.6);
  border-radius: 50%;
}
</style>
<script>
import jwtDecode from "jwt-decode";
import axios from "axios";
export default {
  data() {
    let decode = jwtDecode(localStorage.usertoken);

    return {
      id: decode._id,
      name: decode.name,
      avatar: decode.avatar,
      firstName: " ",
      stat: false,
      show: true
    };
  },
  methods: {
    status() {
      var name = this.name.split(" ");
      this.firstName = name[0];
    },
    redirect: function() {
      let self = this;
      axios
        .get("http://127.0.0.1:5000/users/status", {
          params: {
            token: localStorage.usertoken
          }
        })
        .then(function(response) {
          console.log(response);
          if (response.data.status == 3000) {
            localStorage.removeItem("usertoken");
            self.$router.push("/login");
          }
          if (response.data.firstLogin === false) {
            self.$router.push("/user/profile");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    authMeetup() {
      window.location.replace("http://127.0.0.1:5000/meetup/auth/meetup");
    }
  },
  created: function() {
    this.status();
  }
};
</script>
