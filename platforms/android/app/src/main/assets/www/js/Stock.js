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
    stocks: [],
    show: false,
    ID: "",
    auth: false,
  },
  created() {
    this.getId();
  },
  methods: {
    getId() {
      this.stocks = JSON.parse(window.localStorage.getItem("key"));
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
