import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var futureValueBeforeHold = 0;
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/monthly", (req, res) => {
  res.render("monthly.ejs");
});
app.post("/submit", (req, res) => {
  var principal = req.body.principle;
  var rateOfInterest = req.body.rateOfInterest;
  var totalTimeInvestMonth = req.body.totalTimeInvestMonth;

  var compoundedInterest = rateOfInterest / 1200;
  futureValueBeforeHold = Math.round(principal * (Math.pow((1 + compoundedInterest), totalTimeInvestMonth) - 1) * (1 + compoundedInterest) / compoundedInterest);

  console.log(futureValueBeforeHold);
  res.render("result.ejs",{
      total:futureValueBeforeHold
  });
   });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
