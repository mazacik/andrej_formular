import { data } from 'jquery';

export class ResultEmail {
  static email_opytajsa(data: any): void {
    var email_klient = "";
    var email_montest = "kontakt@montest.sk";
    var email_subject = "Človek sa chce niečo opýtať"; // TODO
    var email_body = "";

    // email klient
    var elementEmailKlient = (<any>document.getElementById("ask-email"));
    if (elementEmailKlient) email_klient = elementEmailKlient.value; else return;
    if (!this.isEmailValid(email_klient)) return;

    // email body
    var elementEmailBody = (<any>document.getElementById("popup-ask-content"));
    if (elementEmailBody) email_body = elementEmailBody.value; else return;

    // confirmation email
    var email_clovek_subject = "Montest - ďakujeme za otázku"; // TODO
    var email_clovek_body = "<div style='background-color: #fff5eb; padding: 30px; text-align: center;'><h1>Ahoj " + data.meno + ", <br />ďakujeme za ot&aacute;zku, do 24 hod&iacute;n Ťa budeme kontaktovať.</h1><br /><br /><h3>Zatiaľ n&aacute;s m&ocirc;že&scaron; sledovať na <a href='https://www.facebook.com/Montest-101434388313005'>facebooku</a> alebo si pozri n&aacute;&scaron; <a href='https://montest.sk/'>web</a>.<br /><br /></h3></div>"; // TODO

    // send email
    this.emailSend(email_montest, email_klient, email_subject, email_body);
    this.emailSend(email_klient, email_montest, email_clovek_subject, email_clovek_body);
  }
  static email_dataURL(dataURL: string, data: any): void {
    // if (this.spamCheck()) return;
    var email_klient = "";
    var email_montest = "kontakt@montest.sk";
    var email_subject = "Výsledky Tvojho finančného dotazníku";
    var email_body = "";

    var elementEmailKlient = (<any>document.getElementById("result-email"));
    if (elementEmailKlient) email_klient = elementEmailKlient.value; else return;
    if (!this.isEmailValid(email_klient)) return;

    // email body
    // email_body = "<div style='background-color: #fff5eb; padding: 30px;'><h1 style='text-align: center;'>Ahoj " + data.meno + ", ďakujeme za Tvoj čas pri vypĺňan&iacute; testu.</h1><h2 style='text-align: center;'>Ver&iacute;me, že Ťa naučil niečo nov&eacute;.</h2><div>&nbsp;</div><div>&nbsp;</div><blockquote><h3>Vyhodnotenie m&aacute;&scaron; teraz k dispoz&iacute;cii aj offline.</h3><h3><strong>Dostane&scaron; sa k nemu nasledovne:</strong></h3></blockquote><ol><li><p><strong>V pr&iacute;lohe klikni na 'Stiahnuť'</strong></p></li><li><p><strong>Klikni na stiahnut&yacute; s&uacute;bor a&nbsp;n&aacute;sledne na 'otvoriť&nbsp;s'</strong></p></li><li><p><strong>Vyber svoj prehliadač</strong></p></li></ol></div>";
    // -> ANDREJ -> tu mas tu URLku. uprav si ten "a href" element ako chces, tie parametre target a rel vobec neviem co robia.
    email_body = "<div style='background-color: #fff5eb; padding: 15px;'><h1 style='text-align: center;'>Ahoj " + data.meno + ", ďakujeme za Tvoj čas pri vypĺňan&iacute; testu.</h1><h2 style='text-align: center;'>Svoje vyhodnotenie si m&ocirc;že&scaron; kedykoľvek pozrieť <a href='" + dataURL + "' target='_blank'>TU</a>.</h2><blockquote style='background-color: #eebdb3; padding: 5px;'><p style='text-align: center;'>Upozorňujeme, že vyhodnotenie sa Ti zobraz&iacute; iba ak m&aacute;&scaron; dan&yacute; link k dispoz&iacute;cii. Ak tento mail strat&iacute;&scaron;, už sa k vyhodnoteniu nedostane&scaron;.</p></blockquote></div>";
    
    // email attachments
    // var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + dataURL + "'></head>";
    // var htmlFileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });

    // poslat email aj montestu
    var email_montest_subject = "Email nejakeho cloveka";

    // -> ANDREJ -> tuto to uprav tak isto ako hore
    var email_montest_body = "Niekto si ulozil svoje vyhodnotenie na email: " + email_klient + ", <a href='" + dataURL + "' target='_blank' rel='noopener'>jeho vyhodnotenie</a>";

    this.emailSend(email_klient, email_montest, email_subject, email_body);
    this.emailSend(email_montest, email_klient, email_montest_subject, email_montest_body);

    // var that = this;
    // this.blobToDataURL(htmlFileBlob, function (htmlUrl: any) {
    //   that.emailSend(email_klient, email_montest, email_subject, email_body, htmlUrl);
    //   that.emailSend(email_montest, email_klient, email_montest_subject, email_montest_body, htmlUrl);
    // });
  }
  static email_ziadost(dataURL: string, data: any): void {
    // if (this.spamCheck()) return;
    // TODO MICHAL znova zapnut kontrolu

    var email_montest = "kontakt@montest.sk";
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
    // -> ANDREJ -> tuto tiez
    email_body += "<br>\nData JSON: " + JSON.stringify(data) + ", <a href='" + dataURL + "' target='_blank' rel='noopener'>vyhodnotenie</a>";

    // email attachments
    // var htmlContent = "<head><meta http-equiv='refresh' content='0; URL=" + dataURL + "'></head>";
    // var htmlFileBlob = new Blob([htmlContent], { type: "text/plain;charset=utf-8" });
    // var that = this;
    // this.blobToDataURL(htmlFileBlob, function (htmlUrl: any) {
    //   // send email
    //   that.emailSend(email_montest, email_klient, email_subject, email_body, htmlUrl);
    // });

    this.emailSend(email_montest, email_klient, email_subject, email_body);

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