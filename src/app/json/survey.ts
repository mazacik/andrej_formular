export default {
  "showTitle": false,
  "goNextPageAutomatic": true,
  "textUpdateMode": "onTyping",
  "focusFirstQuestionAutomatic": true,
  "maxTextLength": 50,
  "maxOthersLength": 50,
  "startSurveyText": "Začať",
  "pagePrevText": "← späť",
  "pageNextText": "ďalej →",
  "completeText": "Dokončiť",
  "showNavigationButtons": false,
  "showQuestionNumbers": "off",
  "editText": "Upraviť",
  "pages": [
    {
      "name": "pageMeno",
      "elements": [
        {
          "type": "html",
          "name": "meno_title",
          "html": "<h5 class='question-text sv_q_title'><span>Vítame Ťa v teste Findemy, v ktorom sa dozvieš ako pracuješ s peniazmi.</span><br><span>Najskôr najdôležitejšia otázka, ako si želáš, aby sme Ťa oslovovali?</span></h5>"
        },
        {
          "type": "text",
          "name": "meno",
          "title": "",
          "titleLocation": "hidden",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná."
        }
      ]
    },
    {
      "name": "pageZaciatokUvodnychOtazok",
      "elements": [
        {
          "type": "html",
          "name": "zaciatokUvodnychOtazok",
          "html": "<h5 class='question-text sv_q_title'><span>Ahoj <strong>{meno}</strong>, na úvod Ťa chceme informovať, že vyhodnotenie testu dostaneš bez nutnosti zadania emailu alebo bez akýchkoľvek dodatočných podmienok.</span></h5><input id='surveyNextAlternative' onclick='survey.nextPage();' type='button' value='Začať test' class='sv_next_btn sv_next_btn--alternative'>"
        }
      ]
    },
    {
      "name": "pageVyskaPrijmu",
      "elements": [
        {
          "type": "text",
          "name": "vyskaPrijmu",
          "title": "Aký je Tvoj príjem?",
          "isRequired": true,
          "description": "Bez toho, aby sme vedeli Tvoj príjem, nedokážeme Tvoju prácu s peniazmi vyhodnotiť naozaj na mieru. O svoje informácie sa nemusíš obávať nakoľko sa hneď po vyhodnotení zmažú.",
          "requiredErrorText": "Otázka je povinná.",
          "inputType": "number",
          "min": "0",
          "placeHolder": "Hodnota v €"
        }
      ]
    },
    {
      "name": "pageOdkladaniePenaziVyska",
      "elements": [
        {
          "type": "text",
          "name": "odkladaniePenaziVyska",
          "title": "Koľko máš odložených peňazí, ktoré vnímaš ako finančnú rezervu?",
          "description": "Peniaze, ktoré neplánuješ minúť a máš ich odložené na neočakávané udalosti.",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "inputType": "number",
          "min": "0",
          "placeHolder": "Hodnota v €"
        }
      ]
    },
    {
      "name": "pageProduktyZivotnePoistenie",
      "elements": [
        {
          "type": "radiogroup",
          "name": "produktyZivotnePoistenie",
          "title": "Máš životné poistenie?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "produktyZivotnePoistenieAno",
              "text": "áno"
            },
            {
              "value": "produktyZivotnePoistenieNie",
              "text": "nie"
            },
            {
              "value": "produktyZivotnePoistenieRodicia",
              "text": "áno, ale platí mi ho niekto iný"
            }
          ]
        }
      ]
    },
    {
      "name": "pageProduktyZivotnePoistenieKolkoPlati",
      "elements": [
        {
          "type": "text",
          "name": "produktyZivotnePoistenieKolkoPlati",
          "title": "Koľko priemerne mesačne platíš za svoje poistenie?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "inputType": "number",
          "min": "0",
          "placeHolder": "Mesačná čiastka v €"
        }
      ],
      "visibleIf": "{produktyZivotnePoistenie} = 'produktyZivotnePoistenieAno'"
    },
    {
      "name": "pageProduktyZivotnePoistenieInvesticia",
      "elements": [
        {
          "type": "radiogroup",
          "name": "produktyZivotnePoistenieInvesticia",
          "title": "Máš poistenie spojené so sporením alebo investovaním?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "produktyZivotnePoistenieInvesticiaAno",
              "text": "áno"
            },
            {
              "value": "produktyZivotnePoistenieInvesticiaNie",
              "text": "nie"
            },
            {
              "value": "produktyZivotnePoistenieInvesticiaNeviem",
              "text": "neviem"
            }
          ]
        }
      ],
      "visibleIf": "{produktyZivotnePoistenie} = 'produktyZivotnePoistenieAno'"
    },
    {
      "name": "pageMajetokBytDom",
      "elements": [
        {
          "type": "radiogroup",
          "name": "majetokBytDom",
          "title": "Vlastníš byt alebo dom?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "majetokBytDomAno",
              "text": "áno"
            },
            {
              "value": "majetokBytDomNie",
              "text": "nie"
            }
          ]
        }
      ]
    },
    {
      "name": "pageMajetokBytDomPoistenie",
      "elements": [
        {
          "type": "radiogroup",
          "name": "majetokBytDomPoistenie",
          "title": "Máš poistenú svoju nehnuteľnosť komplexne? (todo tooltip)",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "majetokBytDomPoistenieVobec",
              "text": "nemám ju poistenú vôbec"
            },
            {
              "value": "majetokBytDomPoistenieNeviemAko",
              "text": "mám ju poistenú, ale neviem presne ako"
            },
            {
              "value": "majetokBytDomPoistenieKomplexne",
              "text": "mám ju poistenú komplexne"
            },
            {
              "value": "majetokBytDomPoistenieNieKomplexne",
              "text": "mám ju poistenú, ale nie komplexne"
            }
          ]
        }
      ],
      "visibleIf": "{majetokBytDom} = 'majetokBytDomAno'"
    },
    {
      "name": "pageProduktyInvesticie",
      "elements": [
        {
          "type": "radiogroup",
          "name": "produktyInvesticie",
          "title": "Investuješ?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "produktyInvesticieAno",
              "text": "áno"
            },
            {
              "value": "produktyInvesticieNie",
              "text": "nie"
            }
          ]
        }
      ]
    },
    {
      "name": "pageProduktyInvesticieMesacne",
      "elements": [
        {
          "type": "text",
          "name": "produktyInvesticieMesacne",
          "title": "Koľko v priemere mesačne investuješ?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "inputType": "number",
          "min": "0",
          "placeHolder": "Mesačná čiastka v €"
        }
      ],
      "visibleIf": "{produktyInvesticie} = 'produktyInvesticieAno'"
    },
    {
      "name": "pageProduktyDruhyPilier",
      "elements": [
        {
          "type": "radiogroup",
          "name": "produktyDruhyPilier",
          "title": "Máš založený druhý pilier?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "produktyDruhyPilierAno",
              "text": "áno"
            },
            {
              "value": "produktyDruhyPilierNie",
              "text": "nie"
            },
            {
              "value": "produktyDruhyPilierNeviem",
              "text": "neviem"
            }
          ]
        }
      ]
    },
    {
      "name": "pageProduktyDruhyPilierFondy",
      "elements": [
        {
          "type": "radiogroup",
          "name": "produktyDruhyPilierFondy",
          "title": "V akých fondoch máš druhý pilier?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "produktyDruhyPilierFondyIndexove",
              "text": "indexové negarantované"
            },
            {
              "value": "produktyDruhyPilierFondyAkciove",
              "text": "akciové negarantované"
            },
            {
              "value": "produktyDruhyPilierFondyDlhopisove",
              "text": "dlhopisové garantované"
            },
            {
              "value": "produktyDruhyPilierFondyZmiesane",
              "text": "zmiešané"
            },
            {
              "value": "produktyDruhyPilierFondyNeviem",
              "text": "neviem"
            }
          ]
        }
      ],
      "visibleIf": "{produktyDruhyPilier} = 'produktyDruhyPilierAno'"
    },
    {
      "name": "pageProduktyTretiPilier",
      "elements": [
        {
          "type": "radiogroup",
          "name": "produktyTretiPilier",
          "title": "Máš založený tretí pilier?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "produktyTretiPilierAnoZamestnavatelPrispieva",
              "text": "mám, prispieva mi zamestnávateľ"
            },
            {
              "value": "produktyTretiPilierAnoZamestnavatelNeprispieva",
              "text": "mám, zamestnávateľ mi neprispieva"
            },
            {
              "value": "produktyTretiPilierNemam",
              "text": "nemám"
            },
            {
              "value": "produktyTretiPilierNeviem",
              "text": "neviem"
            }
          ]
        }
      ]
    },
    {
      "name": "pageProduktyTretiPilierFondy",
      "elements": [
        {
          "type": "radiogroup",
          "name": "produktyTretiPilierFondy",
          "title": "V akých fondoch máš tretí pilier?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "produktyTretiPilierFondyIndexove",
              "text": "indexové negarantované"
            },
            {
              "value": "produktyTretiPilierFondyAkciove",
              "text": "akciové negarantované"
            },
            {
              "value": "produktyTretiPilierFondyDlhopisove",
              "text": "dlhopisové garantované"
            },
            {
              "value": "produktyTretiPilierFondyZmiesane",
              "text": "zmiešané"
            },
            {
              "value": "produktyTretiPilierFondyNeviem",
              "text": "neviem"
            }
          ]
        }
      ],
      "visibleIf": "{produktyTretiPilier} anyof ['produktyTretiPilierAnoZamestnavatelPrispieva', 'produktyTretiPilierAnoZamestnavatelNePrispieva']"
    },
    {
      "name": "pageProduktyUverHypotekaPozicka",
      "elements": [
        {
          "type": "checkbox",
          "name": "produktyUverHypotekaPozicka",
          "title": "Máš požičané peniaze?",
          "description": "(hypotéka, úver, pôžička)",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "produktyUverHypotekaPozickaNie",
              "text": "nie"
            },
            {
              "value": "produktyUverHypotekaPozickaAnoHypoteka",
              "text": "áno, mám hypotéku"
            },
            {
              "value": "produktyUverHypotekaPozickaAnoUverPozicka",
              "text": "áno, mám úver alebo pôžičku"
            }
          ]
        }
      ]
    },
    {
      "name": "pageProduktyHypotekaVyskaSplatky",
      "elements": [
        {
          "type": "text",
          "name": "produktyHypotekaVyskaSplatky",
          "title": "Aká je Tvoja mesačná splátka hypotéky?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "inputType": "number",
          "min": "0",
          "placeHolder": "Mesačná splátka v €"
        }
      ],
      "visibleIf": "{produktyUverHypotekaPozicka} contains 'produktyUverHypotekaPozickaAnoHypoteka'"
    },
    {
      "name": "pageProduktyHypotekaUrok",
      "elements": [
        {
          "type": "radiogroup",
          "name": "produktyHypotekaUrok",
          "title": "Aký máš na hypotéke úrok?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "produktyHypotekaUrokDo1",
              "text": "menej ako 1%"
            },
            {
              "value": "produktyHypotekaUrok1az2",
              "text": "1 až 2%"
            },
            {
              "value": "produktyHypotekaUrokViacAko2",
              "text": "viac ako 2%"
            },
            {
              "value": "produktyHypotekaUrokNeviem",
              "text": "neviem"
            }
          ]
        }
      ],
      "visibleIf": "{produktyUverHypotekaPozicka} contains 'produktyUverHypotekaPozickaAnoHypoteka'"
    },
    {
      "name": "pageProduktyUverPozickaVyskaSplatky",
      "elements": [
        {
          "type": "text",
          "name": "produktyUverPozickaVyskaSplatky",
          "title": "Aká je Tvoja mesačná splátka úveru alebo pôžičky?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "inputType": "number",
          "min": "0",
          "placeHolder": "mesačná splátka v €"
        }
      ],
      "visibleIf": "{produktyUverHypotekaPozicka} contains 'produktyUverHypotekaPozickaAnoUverPozicka'"
    },
    {
      "name": "pageProduktyUverPozickaUrok",
      "elements": [
        {
          "type": "radiogroup",
          "name": "produktyUverPozickaUrok",
          "title": "Aké máš úroky?",
          "isRequired": true,
          "requiredErrorText": "Otázka je povinná.",
          "choices": [
            {
              "value": "produktyUverPozickaUrokDo5",
              "text": "menej ako 5%"
            },
            {
              "value": "produktyUverPozickaUrok5az10",
              "text": "5 až 10%"
            },
            {
              "value": "produktyUverPozickaUrokViacAko10",
              "text": "viac ako 10%"
            },
            {
              "value": "produktyUverPozickaUrokNeviem",
              "text": "neviem"
            }
          ]
        }
      ],
      "visibleIf": "{produktyUverHypotekaPozicka} contains 'produktyUverHypotekaPozickaAnoUverPozicka'"
    }
  ]
}