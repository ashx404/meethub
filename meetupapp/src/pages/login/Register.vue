<template>
  <div class="row justify-content-center">
    <div class="col-lg-2 mr-2 ml-2">
      <div
        style="font-size: 50px; font-weight: 700; margin-top: 12vh; margin-bottom: 24px; text-align: center; line-height: 1.1;"
      >Sign Up</div>

      <div v-on:submit.prevent>
        <p v-if="errors.length"></p>

        <div v-for="error in errors" :key="error.id">
          <div
            class="alert alert-danger"
            style="margin-bottom : 0.5vh ;  height: 2vw; line-height: 0.7vw; width:100%"
            role="alert"
          >{{error}}</div>
          <div>{{empty(errors)}}</div>
        </div>
      </div>
      <div v-on:submit.prevent>
        <div v-if="success===true">
          <div
            class="alert alert-success"
            style="margin-bottom : 1vh ;  height: 2vw; line-height: 0.7vw; width:100%"
            role="alert"
          >
            Account created. Please
            <a href="#/login" class="alert-link">login</a>
          </div>
        </div>
      </div>
      <div class="formfill" autocomplete="off">
        <div class="form-group">
          <input
            type="text"
            v-model="User.name"
            class="form-control"
            name="name"
            placeholder="Name"
            autocomplete="off"
            readonly
            onfocus="this.removeAttribute('readonly')"
          />
        </div>
        <div class="form-group" autocomplete="off">
          <input
            type="email"
            v-model="User.email"
            class="form-control"
            name="email"
            placeholder=" Email"
            autocomplete="off"
            readonly
            onfocus="this.removeAttribute('readonly')"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="User.password"
            class="form-control"
            name="password"
            placeholder=" Password"
          />

          <small id="passwordHelpInline" class="text-muted">Must be 8-20 characters long.</small>
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="User.password2"
            class="form-control"
            name="password2"
            placeholder="Re-enter password"
          />
        </div>

        <button
          class="btn btn-grad btn-lg btn-block"
          type="submit"
          style=" height: 2.2vw;        
        line-height: 1.1vw;
         "
          v-on:click="checkForm();  "
        >
          <div>Register</div>
        </button>
      </div>
      <hr />
      <div
        class="loginemail text-center mb-4"
        style="font-family: Lato ;  font-style: bold; -moz-user-select: none;"
      >Or</div>
      <div
        class="google"
        style="cursor: pointer; -moz-user-select: none; transition: background 120ms ease-in 0s; display: inline-flex; align-items: center; white-space: nowrap; height: 36px; border-radius: 3px; color: rgb(235, 87, 87); font-size: 14px; line-height: 1; padding-left: 12px; padding-right: 12px; background: rgba(152, 240, 250, 0.06) none repeat scroll 0% 0%; font-weight: 500; box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px, rgba(18, 129, 219, 0.3) 0px 0px 0px 1px inset; width: 100%; justify-content: center;"
        v-on:click="authG()"
      >
        <svg
          viewBox="0 0 15 15"
          style="width: 14px; height: 14px; display: block; fill: rgb(235, 87, 87); flex-shrink: 0; backface-visibility: hidden; margin-right: 6px;"
        >
          <path
            d="M 7.28571 6.4125L 7.28571 9L 11.3929 9C 11.2143 10.0875 10.1429 12.225 7.28571 12.225C 4.78571 12.225 2.78571 10.0875 2.78571 7.5C 2.78571 4.9125 4.82143 2.775 7.28571 2.775C 8.71429 2.775 9.64286 3.4125 10.1786 3.9375L 12.1429 1.9875C 10.8929 0.75 9.25 0 7.28571 0C 3.25 0 0 3.3375 0 7.5C 0 11.6625 3.25 15 7.28571 15C 11.5 15 14.25 11.9625 14.25 7.6875C 14.25 7.2 14.2143 6.825 14.1429 6.45L 7.28571 6.45L 7.28571 6.4125Z"
          />
        </svg>Sign up with Google
      </div>
      <div
        class="twitter"
        style="cursor: pointer;  margin-top:8px;-moz-user-select: none;  transition: background 120ms ease-in 0s; display: inline-flex; align-items: center; white-space: nowrap; height: 36px; border-radius: 3px; color: rgb(87, 173, 235); font-size: 14px; line-height: 1; padding-left: 12px; padding-right: 12px; background: rgba(152, 240, 250, 0.06) none repeat scroll 0% 0%; font-weight: 500; box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px, rgba(18, 129, 219, 0.3) 0px 0px 0px 1px inset; width: 100%; justify-content: center;"
        v-on:click="authT()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="20"
          height="20"
          viewBox="805.497 805.497 60.006 60.006"
        >
          <image
            x="817"
            y="821"
            width="36"
            height="30"
            xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAMAAAC38k/IAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAllBMVEUdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIdofIAAADB70CjAAAAMHRSTlMAKxspz/ChVEqS2iHOnFrndRAt6z415uDc/bdXoAqZ1gdT3fs7JExp6OxHLLH245iD5XaiAAAAAWJLR0Qx2dsdcgAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+MIDw4OHcMM9EYAAABkSURBVAjXY2BkYgACZhZWNnYOBk4ubiCHxwAIeBn4DPgFBIVAbGERBlExAwNxCUkgR4qBQdoABmQYGGTlYBw+oF4RKFteAWSsohKIrawCZKqqqWsA2ZpaIHFtHQNdTT19VRAbABG4DXne1nLyAAAAAElFTkSuQmCC"
          />
        </svg>
        Sign up with Twitter
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
input[type=email], input[type=password], input[type=text-emphasis none] {
  border: 1px solid rgba(18, 129, 219, 0.3);
  height: 1.78vw;
  margin: 0;
}

.form-group {
  margin-bottom: 7px !important;
}

.btn-grad {
  background-image: linear-gradient(to right, #d0ffae 0%, #34ebe9 100%);
}

.form-control {
  background: rgba(152, 240, 250, 0.06);
}

input::placeholder {
  color: #359ec4;
}
</style>


<script>
import axios from "axios";

export default {
  data() {
    return {
      errors: [],
      success: false,
      User: { name: "", email: "", password: "", password2: "" },
      Message: " "
    };
  },
  methods: {
    empty(arr) {
      arr = [];
    },
    checkForm: function(e) {
      var x;

      this.errors = [];

      if (!this.User.name) {
        this.errors.push("Name required.");
      }
      if (!this.User.email) {
        this.errors.push("Invalid Email.");
      }
      if (!this.User.password) {
        this.errors.push("Password required.");
      }
      if (this.User.password != this.User.password2) {
        this.errors.push("Passwords don't match");
      }

      if (!this.errors.length) {
        let self = this;
        {
          axios
            .post("http://127.0.0.1:5000/users/register", {
              email: this.User.email,
              name: this.User.name,
              password: this.User.password
            })
            .then(function(response) {
              self.success = false;
              console.log(response);
              if (response.data.register == false) {
                // alert("Email already registered");
                self.errors.push("Email already registered");
                console.log(self.errors);
              } else {
                // alert("Account created. Please Login");
                self.success = true;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
      this.User.name = "";
      this.User.password = "";
      this.User.email = "";
      this.User.password2 = "";
    },
    authG() {
      window.location.replace("http://127.0.0.1:5000/users/auth/google");
    },
    authT() {
      window.location.replace("http://127.0.0.1:5000/users/auth/twitter");
    }
  }
};
</script>