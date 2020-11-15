'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  // HUOM! Älä käytä root:n tunnusta tuotantokoneella!!!!
  password : '',
  database : 'asiakas'
});

module.exports = 
{
    fetchTypes: function (req, res) {  
      connection.query('SELECT AVAIN, LYHENNE, SELITE FROM asiakastyyppi', function(error, results, fields){
        if ( error ){
          console.log("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
          res.send({"status": 500, "error": error, "response": null}); 
        }
        else
        {
          console.log("Data = " + JSON.stringify(results));
          res.json(results);
          
        }
    });

    },

    fetchAll: function (req, res) {
      var sql = "SELECT * FROM ASIAKAS WHERE 1=1";
  
      if (req.query.nimi != undefined) {
        var nimi = req.query.nimi;
        sql = sql + " AND nimi like '" + nimi + "%'";
      }
      if (req.query.osoite != undefined) {
        var osoite = req.query.osoite
        sql = sql + " AND osoite like '" + osoite + "%'";
      }
      if (req.query.asty_avain != undefined) {
        var asty_avain = req.query.asty_avain
        sql = sql + " AND asty_avain like '" + asty_avain + "%'";
      }
  
      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.log("Virhe haettaessa dataa!: " + error);
          res.status(500);
          res.json({ "status": "ei toimi" });
        }
        else {
          console.log("Data = " + JSON.stringify(results));
          res.json(results);
        }
      });
  
  
      console.log("Body = " + JSON.stringify(req.body));
      console.log("Params = " + JSON.stringify(req.query));
      console.log(req.query.nimi);
    },

	
    create: function (req, res) {
      var sql = "INSERT INTO ASIAKAS (nimi, osoite, postinro, postitmp, luontipvm, asty_avain) VALUES('";
  
      if (req.body.nimi != undefined) {
        var nimi = req.body.nimi;
        sql = sql + nimi + "', '";
      }
      if (req.body.osoite != undefined) {
        var osoite = req.body.osoite
        sql = sql + osoite + "', '";
      }
      if (req.body.postinro != undefined) {
        var postinro = req.body.postinro
        sql = sql + postinro + "', '";
      }
      if (req.body.postitmp != undefined) {
        var postitmp = req.body.postitmp
        sql = sql + postitmp + "', '";
        var date = new Date();
      var vuosi = date.getFullYear();
      var kuukausi = new Array();
      kuukausi[0] = "01";
      kuukausi[1] = "02";
      kuukausi[2] = "03";
      kuukausi[3] = "04";
      kuukausi[4] = "05";
      kuukausi[5] = "06";
      kuukausi[6] = "07";
      kuukausi[7] = "08";
      kuukausi[8] = "09";
      kuukausi[9] = "10";
      kuukausi[10] = "11";
      kuukausi[11] = "12";
      var n = kuukausi[date.getMonth()];
      var paiva = date.getDate();
      var luontipvm = vuosi + "-" + n + "-" + paiva;
      sql = sql + luontipvm + "', '"
      }
      if (req.body.asty_avain != undefined) {
        var asty_avain = req.body.asty_avain
        sql = sql + asty_avain + "')";
        console.log(sql);
      }
  
      connection.query(sql, function (error, results, fields) {
        if (error) {
          console.log("Virhe datan lisäämisessä. : " + error);
          res.status(400);
          res.json({ "status": "ei toimi" });
        }
        else {
          console.log("Data = " + JSON.stringify(req.body.nimi));
          res.json("OK")
        }
      })
    },
    

    update: function(req, res){

    },

	
    delete: function (req, res) {
        console.log("Body = " + JSON.stringify(req.body));
        console.log("Params = " + JSON.stringify(req.params));
        
		var sql = "DELETE FROM `asiakas` WHERE `AVAIN`='" + req.params.id + "'" ;
		
		connection.query(sql, function(error, results, fields){
        if ( error ){
          console.log("Virhe poistaessa asiakasta: " + error);
          res.send({"status": 234, "error": error, "response": null}); 
        }
        else
        {
          res.json(results);
        }
    });
    }
}





















