<template>
  <div class="container">
    <h1>{{redirect()}}</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
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
          if (response.data.firstLogin == false) {
            self.$router.push("/user/profile");
          } else {
            self.$router.push("/api/connect");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
