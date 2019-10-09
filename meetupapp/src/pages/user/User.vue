<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="row justify-content-around">
        <div class="col-lg-7">
          <div class="row" style="width=100%">
            <div class="col-lg-6 mr-auto">
              <p style="font-size: 28px">{{obj.name}}</p>
            </div>
            <div class="col-lg-3 ml-auto mt-3" style="max-height=3vw">
              <h6 class="mt-auto">{{obj.city}}</h6>
            </div>
          </div>
          <hr />
          <div class="row" style="width=100%">
            <div class="col-lg-12">
              <h6>{{obj.bday}}</h6>
            </div>
          </div>
          <hr />
          <div class="row" style="width=100%">
            <div class="col-lg-7 mr-auto">
              <div class="col-lg-12">
                <h5>Interests</h5>
              </div>
              <div class="col-lg-12" style="font-size:15px !important;">
                <div
                  v-if="interest.length"
                  style="max-width:auto !important; display:inline-block !important;"
                >
                  <div
                    v-for="future in interest"
                    :key="future.id"
                    style="max-width:auto !important; display:inline-block !important ;"
                  >{{future}} -</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-2" style="max-width:10px !important">
          <div style="border-left: 1px solid #045b8a; height: 250px; line-height:1.5;  "></div>
        </div>

        <div class="col-lg-3 justify-content-center">
          <div class="px-3 py-3">
            <img
              :src="avatar"
              class="profile align-self-center"
              alt="Profile picture"
              height="175px"
              width="175px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  data() {
    let decode = jwtDecode(localStorage.usertoken);

    return {
      id: decode._id,
      name: decode.name,
      email: decode.email,
      avatar: decode.avatar,
      mstatus: "Not Connected",
      stat: false,
      obj: {},
      interest: []
    };
  },
  methods: {
    authMeetup() {
      window.location.replace("http://127.0.0.1:5000/meetup/auth/meetup");
    }
  },
  created() {
    let self = this;
    axios
      .get("http://127.0.0.1:5000/meetup/details", {
        params: {
          _id: this.id
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data.photo) {
          self.obj.img = response.data.photo.highres_link;
        }
        self.obj.name = response.data.name;
        if (response.data.birthday) {
          self.obj.bday =
            response.data.birthday.day +
            "-" +
            response.data.birthday.month +
            "-" +
            response.data.birthday.year;
        }
        self.obj.city = response.data.city;
        response.data.topics.forEach(element => {
          self.interest.push(element.name);
        });
        console.log(self.obj.name);
      });
  }
};
</script>
<style scoped>
</style>