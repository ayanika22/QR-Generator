import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";

const app = express();
const port = 5500;

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let qr_png = qr.imageSync("This is a sample QR. Please fill in the form and click on Generate QR button to create your custom QR code. \nHappy Day!", { type: "png" });
  let qrDataUri = "data:image/png;base64," + qr_png.toString("base64");
  res.render("index.ejs", {
    qrDataUri: qrDataUri,
    Name: "",
    Email: "",
    Website: "",
    Contact: "",
    info: ""
  });
});

app.get("/generate-qr", (req, res) => {
  let name = req.query.Name;  
  let email = req.query.Email;
  let website = req.query.Website;
  let contact = req.query.Contact;
  let info = req.query.info;
  let answer = `Name: ${name},
            \nEmail: ${email},
            \nWebsite: ${website},
            \nContact: ${contact},
            \nAdditional Information: ${info}`;
  
  let qr_png = qr.imageSync(answer, { type: "png" });
  let qrDataUri = "data:image/png;base64," + qr_png.toString("base64");
  console.log(answer);
  res.render("index.ejs", {
    qrDataUri: qrDataUri,
    Name: name,
    Email: email,
    Website: website,
    Contact: contact,
    info: info
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
