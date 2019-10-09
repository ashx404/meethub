<template>
  <div class="base row justify-content-center" style="max-width: 99vw !important; ">
    <div class="col-lg-8 mb-4">
      <div
        class="test text-center mt-5 mb-5"
        v-if="futures.length"
        style="font-family:'Arimo'; text-decoration:underline ;font-size: 30px; "
      >Explore events</div>
      <div
        class="row justify-content-center"
        style="margin-bottom:7vh !important;"
        v-for="future in futures"
        :key="future.id"
      >
        <div class="col-lg-8" style="max-height: 15vh; ">
          <a :href="future.eventLink" class="upper" style="text-decoration:none !important;">
            <div class="raise card col-lg-12" style="min-height:15vh">
              <div class="card-body" style=" margin:0 !important;">
                <h6 class="card-title">{{ future.eventName }}</h6>

                <br />

                <pre class="card-text" style="font-family :'hans'; font-size:1.75vh">Date: {{future.date}}               Time: {{ future.time}}</pre>
                <br />
                <div
                  id="widget"
                  class="align-self-right"
                  style="right:15px !important; bottom: 20px !important; position:absolute !important;"
                >
                  <button
                    v-on:click="auth(future.eventUrlName,future.eventId,1)"
                    type="button"
                    class="btn btn-primary"
                  >Going</button>
                  <button
                    v-on:click="auth(future.eventUrlName,future.eventId,0)"
                    type="button"
                    class="btn btn-danger ml-3 mr-2"
                    style="right:0 !important;"
                  >Not Going</button>
                </div>
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
.raise {
  transition-duration: 0.3s;
}
.raise:hover,
.raise:focus {
  transform: translate(-0.4vmax, -0.4vmax);
  box-shadow: 0.35vmax 0.35vmax rgba(56, 198, 233, 0.527);
}
.btn {
  max-height: 30px;
  line-height: 15px;
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
      status: false,
      show: true
    };
  },
  methods: {
    auth(a, b, c) {
      let res = c === 1 ? "yes" : "no";
      axios.get("http://127.0.0.1:5000/meetup/rsvp", {
        params: {
          _id: this.id,
          urlname: a,
          eventid: b,
          res: res
        }
      });
      console.log(a, b);
    },
    toggle() {
      this.show = !this.show;
    }
  },
  mounted() {
    axios
      .get("http://127.0.0.1:5000/meetup/findevents", {
        params: {
          _id: this.id
        }
      })
      .then(response => {
        console.log(response.data.events);
        response.data.events.forEach(element => {
          var data = {
            eventName: element.name,
            date: element.local_date,
            time: element.local_time,
            eventLink: "#",
            eventUrlName: element.group.urlname,
            eventId: element.id
          };

          this.futures.push(data);
        });
      });
  }
};
</script>