

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
        .get("http://127.0.0.1:5000/users/social")
        .then(function(response) {
          console.log(response);
          if (response.data.status) {
            self.$router.push("/login");
          }
          if (response.data.grantToken) {
            localStorage.setItem("usertoken", response.data.grantToken);
            if (response.data.firstLogin === true) {
              self.$router.push("/api/connect");
            }
          }

          if (response.data.grantToken) {
            localStorage.setItem("usertoken", response.data.grantToken);
            if (response.data.firstLogin === false) {
              self.$router.push("/user/profile");
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
