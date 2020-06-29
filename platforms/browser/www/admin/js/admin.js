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
    itemss: [],
    telRules: [(v) => (v && v.length == 10) || "Name must be 8 characters"],
    nomPH: "",
    categorie: "",
    adress: "",
    telephone: "",
    longittude: "",
    attitide: "",
    ouvre: "",
    ferme: "",
    image: "",
    items: [],
    select: "",
    stock: "",
    date: "",
    NomMed: "",
    description: "",
    snackbar: false,
    text: "please fill all the field",
    time: null,
    time1: null,
    menu1: false,
    menu2: false,
    modal2: false,
    email: "",
    password: "",
    authentication: false,
    tab: false,
    tab1:false,
    dashItems: [
      { name: "utilisateurs", link: "../user.html" },
      { name: "tous les pharmacies" },
      { name: "ajouter Pharma" },
      { name: "ajouter stocke" },
    ],
  },
  created() {
    this.getpha();
  },
  methods: {
    stockForm(e) {
      e.preventDefault();

      this.saveStock(this.select, this.NomMed, this.stock, this.description);
    },

    saveStock(namePha, NomMed, stock, Description) {
      var query = firebase
        .database()
        .ref("/coord")
        .orderByChild("name")
        .equalTo(this.select);
      query.once("value", (data) => {
        data.forEach((userSnapshot) => {
          let key = userSnapshot.key;
          if (
            namePha != "" &&
            NomMed != "" &&
            stock != "" &&
            Description != ""
          ) {
            var contactRef = firebase.database().ref(`coord/${key}/stock`);
            var data = {
              NamePha: namePha,
              NomMed: NomMed,
              Stock: stock,
              Description: Description,
            };

            contactRef.push(data);
          } else {
            this.snackbar = true;
          }
        });
      });
    },

    ajouterPH(e) {
      e.preventDefault();
      this.saveForm(
        this.nomPH,
        this.categorie,
        this.adress,
        this.telephone,
        this.longittude,
        this.attitide,
        this.ouvre,
        this.ferme
      );
    },
    saveForm(
      name,
      categorie,
      address,
      telephone,
      longittude,
      attitude,
      ouvre,
      ferme
    ) {
      if (
        name != "" &&
        categorie != "" &&
        address != "" &&
        longittude != "" &&
        attitude != "" &&
        ferme != "" &&
        ouvre != ""
      ) {
        if (this.isFloat(longittude) && this.isFloat(attitude)) {
          var phRef = firebase.database().ref("/coord");
          var data = {
            name: name,
            adress: address,
            cat: categorie,
            ouvre: ouvre,
            ferme: ferme,
            x: longittude,
            y: attitude,
            tel: telephone,
          };
          console.log("okay");
          phRef.push(data);
        } else {
          console.log("logittude et attitude ");
        }
      } else {
        this.snackbar = true;
      }
    },
    getpha() {
      var db = firebase.database().ref().child("coord/");
      db.on("value", (data) => {
        var tab = data.val();
        var keys = Object.keys(tab);
        this.items = keys.map((key) => {
          return tab[key].name;
        });
      });
    },

    isFloat(n) {
      return !isNaN(parseFloat(n));
    },
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.authentication = true;
          window.location.href = "../../../www/admin/addPharmacie.html";
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    },
  },
});
