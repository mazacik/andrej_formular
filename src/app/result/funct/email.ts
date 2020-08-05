export class ResultEmail {
  static email_dataURL(dataURL: string): void {
    // if (this.spamCheck()) return;
    var email_klient = "";
    var email_montest = "kontakt@montest.sk";
    var email_subject = "Výsledky Tvojho finančného dotazníku";
    var email_body = "";

    var elementEmailKlient = (<any>document.getElementById("result-email"));
    if (elementEmailKlient) email_klient = elementEmailKlient.value; else return;
    if (!this.isEmailValid(email_klient)) return;

    // email body
    email_body = "<div style='background-color: #fff5eb; padding: 30px;'><h1 style='text-align: center;'>Ahoj, ďakujeme za Tvoj čas pri vypĺňan&iacute; testu.</h1><h2 style='text-align: center;'>Ver&iacute;me, že Ťa naučil niečo nov&eacute;.</h2><div>&nbsp;</div><div>&nbsp;</div><blockquote><h3>Vyhodnotenie m&aacute;&scaron; teraz k dispoz&iacute;cii aj offline.</h3><h3><strong>Dostane&scaron; sa k nemu nasledovne:</strong></h3></blockquote><ol><li><p><strong>V pr&iacute;lohe klikni na 'Stiahnuť'</strong></p></li><li><p><strong>Klikni na stiahnut&yacute; s&uacute;bor a&nbsp;n&aacute;sledne na 'otvoriť&nbsp;s'</strong></p></li><li><p><strong>Vyber svoj prehliadač</strong></p></li></ol></div>";

    // email attachments
    var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + dataURL + "'></head>";
    var htmlFileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });

    var that = this;
    this.blobToDataURL(htmlFileBlob, function (htmlUrl: any) {
      that.emailSend(email_klient, email_montest, email_subject, email_body, htmlUrl);
    });
  }
  static email_ziadost(dataURL: string, data: any): void {
    // if (this.spamCheck()) return;
    // TODO MICHAL znova zapnut kontrolu

    var email_montest = "andrej.nejedlik@montest.sk";
    var email_klient = "";
    var email_subject = "Žiadosť o úvodnú konzultáciu zdarma";
    var email_body = "";

    // email from
    var elementEmailKlient = (<any>document.getElementById("email"));
    if (elementEmailKlient) email_klient = elementEmailKlient.value; else return;
    if (!this.isEmailValid(email_klient)) return;

    // telefon
    var elementTelefonKlient = (<any>document.getElementById("phone"));
    if (elementTelefonKlient) {
      email_body += "Telefónne číslo: " + elementTelefonKlient.value;
    }

    // email body
    email_body += "<br>\nData JSON: " + JSON.stringify(data);

    // email attachments
    var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + dataURL + "'></head>";
    var htmlFileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });
    var that = this;
    this.blobToDataURL(htmlFileBlob, function (htmlUrl: any) {
      // send email
      that.emailSend(email_montest, email_klient, email_subject, email_body, htmlUrl);
    });

    // potvrdenie o ziadosti
    var email_potvrdenie_subject = "Ozveme sa Ti";
    var email_potvrdenie_body = "<div style='background-color: #fff5eb; padding: 30px;'><h1 style='text-align: center;'>Ahoj, ďakujeme za z&aacute;ujem o konzult&aacute;ciu.</h1><h3 style='text-align: center;'>Ozveme sa Ti do 24 hod&iacute;n.</h3><p style='text-align: center;'><br />Zatiaľ si o n&aacute;s m&ocirc;že&scaron; zistiť viac na <a href='https://montest.sk' target='_blank' rel='noopener'>na&scaron;om webe.</a></p></div>";
    this.emailSend(email_klient, email_montest, email_potvrdenie_subject, email_potvrdenie_body);
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

    if (attachment) {
      email.send({
        // v google ucet nastaveniach treba vypnut 2-faktor autentifikaciu
        // v google ucet nastaveniach treba povolit "less secure apps"
        SecureToken: "d2e87481-99b4-4ffc-b5bb-f3a8eef61c2e",
        To: to,
        From: from,
        Subject: subject,
        Body: body,
        Attachments: [
          {
            name: "Vyhodnotenie.html",
            data: attachment
          }
        ]
      });
    } else {
      email.send({
        // v google ucet nastaveniach treba vypnut 2-faktor autentifikaciu
        // v google ucet nastaveniach treba povolit "less secure apps"
        SecureToken: "d2e87481-99b4-4ffc-b5bb-f3a8eef61c2e",
        To: to,
        From: from,
        Subject: subject,
        Body: body
      });
    }
  }

  private static isEmailValid(email: string): boolean {
    if (email.trim().length >= 6) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(email)) {
        // error - emailova adresa nezodpoveda regexu
        return false;
      }
    } else {
      // error - emailova adresa ma menej ako 6 znakov
      return;
    }
    return true;
  }
  private static blobToDataURL(blob: Blob, callback: { (htmlUrl: any): void; (htmlUrl: any): void; (arg0: string | ArrayBuffer): void; }) {
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