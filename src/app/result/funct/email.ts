export class ResultEmail {
  static email_dataURL(dataURL: string): void {
    if (this.spamCheck()) return;

    var to = "";
    var from = "andrej@otestujsa.sk";
    var subject = "Výsledky Tvojho finančného dotazníku";
    var body = "";

    // email from
    var toElement = (<any>document.getElementById("emailKlientaVysledok"));
    if (toElement) to = toElement.value; else return;
    if (to.trim().length >= 7) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(to)) {
        // error - emailova adresa nezodpoveda regexu
        return;
      }
    } else {
      // error - emailova adresa ma menej ako 7 znakov
      return;
    }

    // email body
    body = "Gratulujeme k vyplneniu bla bla bla, vysledok je v prilohe";

    // email attachments
    var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + dataURL + "'></head>";
    var htmlFileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });

    var _this = this;
    this.blobToDataURL(htmlFileBlob, function (htmlUrl: any) {
      _this.emailSend(to, from, subject, body, htmlUrl);
    });
  }
  static email_ziadost(dataURL: string, data: any): void {
    if (this.spamCheck()) return;

    var to = "mazak.miso@gmail.com";
    var from = "";
    var subject = "Žiadosť o úvodnú konzultáciu zdarma";
    var body = "";

    // email from
    var fromElement = (<any>document.getElementById("emailKlientaZiadost"));
    if (fromElement) from = fromElement.value; else return;
    if (from.trim().length >= 7) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(from)) {
        // error - emailova adresa nezodpoveda regexu
        return;
      }
    } else {
      // error - emailova adresa ma menej ako 7 znakov
      return;
    }

    // email body
    var bodyElement = document.getElementById("emailText");
    if (bodyElement) body = bodyElement.innerText;
    if (body.trim().length <= 0) body = "empty email body";
    body += "<br><br>" + JSON.stringify(data);

    // email attachments
    var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + dataURL + "'></head>";
    var htmlFileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });
    var _this = this;
    this.blobToDataURL(htmlFileBlob, function (htmlUrl: any) {
      // send email
      _this.emailSend(to, from, subject, body, htmlUrl);
    });
  }
  static emailSend(to: string, from: string, subject: string, body: string, attachment: any = undefined): void {
    var email = {
      send: function (jsonData) {
        return new Promise(function () {
          jsonData.nocache = Math.floor(1e6 * Math.random() + 1), jsonData.Action = "Send";
          var jsonString = JSON.stringify(jsonData);
          var request = new XMLHttpRequest;
          request.open("POST", "https://smtpjs.com/v3/smtpjs.aspx?", !0);
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          request.send(jsonString);
        });
      }
    };

    // Email.send({
    //   // v google ucet nastaveniach treba vypnut 2-faktor autentifikaciu
    //   // v google ucet nastaveniach treba povolit "less secure apps"
    //   SecureToken : "2cb4ec7b-33de-4bb2-81ff-2dfecdd3f063",
    //   To: to,
    //   From: from,
    //   Subject: subject,
    //   Body: body
    // });

    if (attachment) {
      email.send({
        // v google ucet nastaveniach treba vypnut 2-faktor autentifikaciu
        // v google ucet nastaveniach treba povolit "less secure apps"
        Host: "smtp.gmail.com",
        Username: "surveyemailer123",
        Password: "surveyemailerandrej123",
        To: to,
        From: from,
        Subject: subject,
        Body: body,
        Attachments: [
          {
            name: "Vysledok.html",
            data: attachment
          }
        ]
      });
    } else {
      email.send({
        // v google ucet nastaveniach treba vypnut 2-faktor autentifikaciu
        // v google ucet nastaveniach treba povolit "less secure apps"
        Host: "smtp.gmail.com",
        Username: "surveyemailer123",
        Password: "surveyemailerandrej123",
        To: to,
        From: from,
        Subject: subject,
        Body: body
      });
    }

    alert("Email bol odoslaný.");
  }
  static blobToDataURL(blob: Blob, callback: { (htmlUrl: any): void; (htmlUrl: any): void; (arg0: string | ArrayBuffer): void; }) {
    var fileReader = new FileReader();
    fileReader.onload = function (event) { callback(event.target.result); }
    fileReader.readAsDataURL(blob);
  }
  private static spamCheck(): boolean {
    // primitivna anti-spam kontrola
    var limit = 5;

    var emailCount = parseInt(localStorage.getItem("emailCount")) || 0;
    var emailTime: number = parseInt(localStorage.getItem("emailTime")) || 0;

    if (Date.now() >= emailTime + 86400000) {
      // od poslania posledneho emailu uplynulo 24h
      localStorage.setItem("emailCount", "1");
      localStorage.setItem("emailTime", Date.now().toString());
    } else if (emailCount >= limit) {
      // clovek poslal "limit" emailov za poslednych 24h
      alert("Za posledných 24 hodín si už poslal(a) " + limit + " emailov.");
      return true;
    } else {
      // clovek poslal menej ako "limit" emailov za poslednych 24h
      localStorage.setItem("emailCount", (emailCount + 1).toString());
    }
    return false;
  }
}