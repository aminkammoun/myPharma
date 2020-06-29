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
    title: "",
    location: "",
    imageUrl: "",
    description: "",
    auth: false,
    logoutAlt:false
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
  },
  created() {
    this.auth = window.localStorage.getItem("auth");
    setTimeout(() => {
      this.load = false;
    }, 500);
  },

  methods: {
    onCreateDec() {
      if (!this.formIsValid) {
        return;
      }
      var declarationRef = firebase.database().ref("/Declaration");
      const declarationData = {
        username: window.localStorage.getItem("name"),
        userlastname: window.localStorage.getItem("lastname"),
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
      };
      declarationRef.push(declarationData);
      alert("added");
      window.location.href = "../views/viewAllDeclaration.html";
    },
    goBack() {
      window.history.back();
    },
    logout() {

      window.localStorage.removeItem("auth");
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("lastname");
      window.location.href = "../views/viewAllDeclaration.html";
    },
  },
});
