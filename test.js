const HummusRecipe = require("hummus-recipe");
const path = require("path");

const pdfDoc = new HummusRecipe("./encrypt/Faizaan Shaikh.pdf", "output.pdf");

pdfDoc
  .encrypt({
    userPassword: "1234",
    ownerPassword: "1234",
    userProtectionFlag: 4,
  })
  .endPDF();
