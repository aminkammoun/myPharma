var config = {
  apiKey: "AIzaSyASCbaiHQYvj65R2WAO60S0Od8raeth0So",
  authDomain: "pharmaposition-a230d.firebaseapp.com",
  databaseURL: "https://pharmaposition-a230d.firebaseio.com",
  projectId: "pharmaposition-a230d",
  storageBucket: "pharmaposition-a230d.appspot.com",
  messagingSenderId: "1014214233603",
  Id: "1:1014214233603:web:edb23cb53200911017c836",
};
firebase.initializeApp(config);
new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: {
    load: true,
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    existEmail: [],
    exist: false,
    erorpass: false,
    eroremail: false,
    loginAlert: false,
    userName: "",
    userLast: "",
  },

  created() {
    setTimeout(() => {
      this.load = false;
    }, 500);
  },
  computed: {
    formIsValid() {
      return (
        this.name !== "" &&
        this.lastname !== "" &&
        this.email !== "" &&
        this.password !== "" &&
        this.confirmPassword !== ""
      );
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
  },

  methods: {
    onSignup() {
      if (!this.formIsValid) {
        return;
      }
      var isexist = [];
      var querry = firebase
        .database()
        .ref("/user")
        .orderByChild("email")
        .equalTo(this.email);
      querry.once("value", (data) => {
        data.forEach((usersnapshot) => {
          isexist.push(usersnapshot.key);
        });

        if (isexist.length >= 1) {
          this.eroremail = true;
          setTimeout(() => {
            this.eroremail = false;
          }, 2000);
        } else {
          if (this.password.length >= 6) {
            const signupData = {
              name: this.name,
              lastname: this.lastname,
              email: this.email,
              password: this.password,
              confirmPassword: this.confirmPassword,
            };
            var signupRef = firebase.database().ref("user");
            signupRef.push(signupData);
            setTimeout(() => {
              window.location.href = "../views/viewAllDeclaration.html";
              window.localStorage.setItem("auth", true);
              window.localStorage.setItem("name", this.name);
              window.localStorage.setItem("lastname", this.lastname);
            }, 1000);
          } else {
            this.erorpass = true;
            setTimeout(() => {
              this.erorpass = false;
            }, 2000);
          }
        }
      });
    },
    Login() {
      var querry = firebase
        .database()
        .ref("/user")
        .orderByChild("email")
        .equalTo(this.email);

      querry.on("value", (data) => {
        data.forEach((usersnapshot) => {
          if (usersnapshot.val().password == this.password) {
            window.location.href = "../views/viewAllDeclaration.html";
            window.localStorage.setItem("auth", true);
            window.localStorage.setItem("name", usersnapshot.val().name);
            window.localStorage.setItem(
              "lastname",
              usersnapshot.val().lastname
            );
            this.userName = usersnapshot.val().name;
            this.userLast = usersnapshot.val().lastname;
          } else {
            this.loginAlert = true;
            setTimeout(() => {
              this.loginAlert = false;
            }, 2000);
          }
        });
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function () {
          window.localStorage.setItem("auth", true);
          window.localStorage.setItem("name", "");
          window.localStorage.setItem("lastname", "");
        })
        .catch(function (error) {
          // An error happened.
        });
    },
  },
});
