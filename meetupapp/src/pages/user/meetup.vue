<template>
  <div class="parent">
    <div class="base row justify-content-center" style="max-width: 95vw !important; ">
      <div class="col-lg-8">
        <div v-if="show===true" class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
        <div
          class="test text-center mt-4 mb-2"
          v-if="!futures.length && !pasts.length"
          style="font-family:'Arimo'; text-decoration:underline ;font-size: 30px; "
        >No events</div>
        <div
          class="test text-center mt-4 mb-2"
          v-if="futures.length"
          style="font-family:'Arimo'; text-decoration:underline ;font-size: 30px; "
        >Upcoming Events</div>
        <div class="row">
          <div
            class="col-lg-4 mb-4"
            style="max-height: 25vh"
            v-for="future in futures"
            :key="future.id"
          >
            <div class="card col-lg-12" style="min-height: 25vh">
              <div class="card-body">
                <h6 class="card-title">{{ future.eventname }}</h6>
                <h7 class="card-subtitle mb-2 text-muted">{{future.organizedby}}</h7>
                <p class="card-text">on {{future.dateandtime}}</p>
                <div class="justify-space-between">
                  <a :href="future.groupLink" class="card-link align-self-left">Open group</a>
                </div>
                <div
                  id="widget"
                  class="align-self-right"
                  style="right:15px !important; bottom: 20px !important; position:absolute !important;"
                >
                  <div class="btn-o" data-scribe="component:button" style="width: 76px;">
                    <a :href="future.tweetLink" class="btn" id="b">
                      <i class="fab fa-1x fa-twitter"></i>
                      <span class="label" id="l">Tweet</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="base row justify-content-center" style="max-width: 95vw !important; ">
      <div class="col-lg-8">
        <div
          class="test text-center mt-4 mb-2"
          v-if="pasts.length"
          style="font-family:'Arimo'; text-decoration:underline ;font-size: 30px; font-family:'Arimo'"
        >Events Attended</div>
        <div class="row">
          <div class="col-lg-4 mb-4" style="max-height: 25vh" v-for="past in pasts" :key="past.id">
            <div class="card col-lg-12" style="min-height: 25vh">
              <div class="card-body">
                <h6 class="card-title">{{ past.eventname }}</h6>
                <h7 class="card-subtitle mb-2 text-muted">{{past.organizedby}}</h7>
                <p class="card-text">on {{past.dateandtime}}</p>
                <a :href="past.groupLink" class="card-link">Open group</a>
                <div
                  id="widget"
                  class="align-self-right"
                  style="right:15px !important; bottom: 20px !important; position:absolute !important;"
                >
                  <div class="btn-o" data-scribe="component:button" style="width: 76px;">
                    <a :href="past.tweetLink" class="btn" id="b">
                      <i class="fab fa-1x fa-twitter"></i>
                      <span class="label" id="l">Tweet</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style >
@import "https://use.fontawesome.com/releases/v5.6.3/css/all.css";
* {
  margin: 0;
  padding: 0;
}
#count,
.btn,
.btn .label,
.btn-o,
.count-o {
  display: inline-block;
  vertical-align: top;
  zoom: 1;
}
.btn-o {
  width: 76px;
  text-align: left;
  white-space: nowrap;
  max-width: 100%;
}
.btn {
  position: relative;
  height: auto;
  box-sizing: border-box;
  padding: 1px 8px 1px 6px;
  background-color: #1b95e0;
  color: #fff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
}
#count,
.btn,
.btn .label,
.btn-o,
.count-o {
  display: inline-block;
  vertical-align: top;
  zoom: 1;
}
a {
  outline: 0;
  text-decoration: none;
}
#widget {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
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
      status: false,

      show: true
    };
  },

  mounted() {
    let self = this;
    axios
      .get("http://127.0.0.1:5000/meetup/eventdetails", {
        params: {
          _id: this.id
        }
      })
      .then(response => {
        self.show = false;
        console.log(response);
        response.data.forEach(element => {
          var x =
            "https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flocalhost%3A8080%2F&amp;ref_src=twsrc%5Etfw&amp;text=Check out this event : " +
            "' " +
            element.name +
            " ' " +
            ",&amp;tw_p=tweetbutton&amp;url=" +
            element.link;
          var data = {
            eventname: element.name,
            dateandtime: element.local_date + " @" + element.local_time,
            organizedby: element.group.name,
            groupLink: element.link,
            tweetLink: x
          };
          console.log(data.tweetLink);
          // console.log(data.tweetLink);
          if (element.status == "past") {
            console.log("Old : " + element.name);

            this.pasts.push(data);
          } else {
            console.log("Future : " + element.name);
            this.futures.push(data);
          }
        });
      });
  }
};
</script>