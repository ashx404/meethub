<template>
  <div class="base row justify-content-center" style="max-width: 95vw !important; ">
    <div class="col-lg-8 mb-4">
      <div v-if="status===true" class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
      <div
        class="test text-center mt-5 mb-5"
        v-if="futures.length"
        style="font-family:'Arimo'; text-decoration:underline ;font-size: 30px; "
      >Explore groups</div>

      <div class="row">
        <div
          class="raise col-lg-4 mb-4"
          style="max-height: 25vh"
          v-for="future in futures"
          :key="future.id"
        >
          <a :href="future.groupLink" class="upper" style="text-decoration:none;">
            <div
              class="card col-lg-12 mb-4"
              style="min-height:25vh"
              :style="{'background-image': ' linear-gradient(to bottom,black, rgba(255, 249, 249, 0.1) ),  url(' + future.picture + ')'}"
            >
              <div class="card-body">
                <h6 class="card-title" style="color:white">{{ future.groupName }}</h6>

                <br />
                <br />
                <br />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style >
* {
  margin: 0;
  padding: 0;
}
.card {
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.raise:hover,
.raise:focus {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.2em);
  box-shadow: 5px 5px
    linear-gradient(rgba(255, 251, 251, 0.815), rgba(255, 249, 249, 0.9));
}
.spinner {
  margin: 100px auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
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
      pasts: [],
      futures: [],
      status: true,
      show: true,
      count: 0
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    }
  },
  mounted() {
    let self = this;
    axios
      .get("http://127.0.0.1:5000/meetup/groups", {
        params: {
          _id: this.id,
          count: this.count
        }
      })
      .then(response => {
        self.status = false;
        console.log(response);
        self.count++;
        response.data.forEach(element => {
          console.log(element);
          var data = {
            groupName: element.name,

            //  venue: element.venue.name,
            // default: element.group.localized_location,
            city: element.city,
            groupLink: element.link
          };
          if (element.key_photo) {
            data.picture = element.key_photo.photo_link;
          } else {
            data.picture = "https://picsum.photos/214/114";
          }
          console.log(element);
          this.futures.push(data);
        });
      });
  }
};
</script>