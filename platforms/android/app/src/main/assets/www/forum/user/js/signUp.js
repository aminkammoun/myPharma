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
        window.location.href =
              "../views/viewAllDeclaration.html";
          window.localStorage.setItem("name", this.name);
          window.localStorage.setItem("lastname", this.lastname);
      }, 1000);

      // this.$store.dispatch("createMeetup", meetupData);
      // this.$router.push("/meetups");
    },
  },
});
