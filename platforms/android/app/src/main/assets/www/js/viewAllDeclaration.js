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
    allDeclations: [],
    load: true,
    fab: false,
    describ: false,
  },
  created() {
    this.getDeclartion();
    setTimeout(() => {
      this.load = false;
    }, 500);
  },

  methods: {
    getDeclartion() {
      var db = firebase.database().ref().child("Declaration/");
      db.on("value", (data) => {
        var tab = data.val();
        var keys = Object.keys(tab);

        this.allDeclations = keys.map((key) => {
          //this.id.push(key);

          return tab[key];
        });
        console.log(this.allDeclations);
      });
    },
    goToDec() {
      if (window.localStorage.getItem("name")) {
        window.location.href = "../views/addDeclaration.html";
      } else {
        window.location.href = "../user/signUp.html";
      }
    },
    top() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    goBack() {
      window.history.back();
    },
  },
});
