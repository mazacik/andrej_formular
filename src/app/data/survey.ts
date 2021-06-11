export default {
  "showTitle": false,
  "textUpdateMode": "onTyping",
  "requiredText": "",
  "maxTextLength": 50,
  "maxOthersLength": 50,
  "showNavigationButtons": false,
  "showQuestionNumbers": "off",
  "showCompletedPage": false,
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
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "placeHolder": "Tvoju odpoveď napíš sem..."
        }
      ]
    },
    {
      "name": "pageZaciatokUvodnychOtazok",
      "elements": [
        {
          "type": "html",
          "name": "zaciatokUvodnychOtazok",
          "html": "<h5 class='question-text sv_q_title'><span>Ahoj <strong>{meno}</strong>, na úvod Ťa chceme informovať, že vyhodnotenie testu dostaneš bez nutnosti zadania emailu alebo bez akýchkoľvek dodatočných podmienok.</span></h5>"
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
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "inputType": "number",
          "min": "0",
          "minErrorText": "Hodnota nemôže byť negatívna.",
          "placeHolder": "Tvoju odpoveď napíš sem..."
        }
      ]
    },
    {
      "name": "pageKolkoMesacneOstavaNaUcte",
      "elements": [
        {
          "type": "text",
          "name": "kolkoMesacneOstavaNaUcte",
          "title": "Koľko Ti v priemere ostáva na konci mesiaca na účte?",
          "isRequired": true,
          "description": "Po zaplatení všetkých výdavkov, účtov, sporení, poistení, úverov, atď.",
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "inputType": "number",
          "min": "0",
          "minErrorText": "Hodnota nemôže byť negatívna.",
          "placeHolder": "Tvoju odpoveď napíš sem..."
        }
      ]
    },
    {
      "name": "pageKolkoMesacneSpori",
      "elements": [
        {
          "type": "text",
          "name": "kolkoMesacneSpori",
          "title": "Koľko si mesačne sporíš?",
          "isRequired": true,
          "description": "Sporiace účty, odkladanie do \"šuflíka\" a iné sporiace produkty. Nerátaj investičné produkty.",
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "inputType": "number",
          "min": "0",
          "minErrorText": "Hodnota nemôže byť negatívna.",
          "placeHolder": "Tvoju odpoveď napíš sem..."
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
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "inputType": "number",
          "min": "0",
          "minErrorText": "Hodnota nemôže byť negatívna.",
          "placeHolder": "Tvoju odpoveď napíš sem..."
        }
      ]
    },
    {
      "name": "pageZivotnePoistenie",
      "elements": [
        {
          "type": "radiogroup",
          "name": "zivotnePoistenie",
          "title": "Máš životné poistenie?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "choices": [
            {
              "value": "zivotnePoistenieMa",
              "text": "áno"
            },
            {
              "value": "zivotnePoistenieNema",
              "text": "nie"
            },
            {
              "value": "zivotnePoisteniePlatiNiektoIny",
              "text": "áno, ale platí mi ho niekto iný"
            }
          ]
        }
      ]
    },
    {
      "name": "pageZivotnePoistenieKolkoPlati",
      "elements": [
        {
          "type": "text",
          "name": "zivotnePoistenieKolkoPlati",
          "title": "Koľko priemerne mesačne platíš za svoje poistenie?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "inputType": "number",
          "min": "0",
          "minErrorText": "Hodnota nemôže byť negatívna.",
          "placeHolder": "Tvoju odpoveď napíš sem..."
        }
      ],
      "visibleIf": "{zivotnePoistenie} = 'zivotnePoistenieMa'"
    },
    {
      "name": "pageZivotnePoistenieInvesticia",
      "elements": [
        {
          "type": "radiogroup",
          "name": "zivotnePoistenieInvesticia",
          "title": "Máš poistenie spojené so sporením alebo investovaním?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "choices": [
            {
              "value": "zivotnePoistenieInvesticiaAno",
              "text": "áno"
            },
            {
              "value": "zivotnePoistenieInvesticiaNie",
              "text": "nie"
            },
            {
              "value": "zivotnePoistenieInvesticiaNeviem",
              "text": "neviem"
            }
          ]
        }
      ],
      "visibleIf": "{zivotnePoistenie} = 'zivotnePoistenieMa'"
    },
    {
      "name": "pageMajetokBytDom",
      "elements": [
        {
          "type": "radiogroup",
          "name": "majetokBytDom",
          "title": "Vlastníš byt alebo dom?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
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
          "title": "Máš poistenú svoju nehnuteľnosť komplexne?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
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
      "name": "pageInvesticie",
      "elements": [
        {
          "type": "radiogroup",
          "name": "investicie",
          "title": "Investuješ?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "choices": [
            {
              "value": "investicieAno",
              "text": "áno"
            },
            {
              "value": "investicieNie",
              "text": "nie"
            }
          ]
        }
      ]
    },
    {
      "name": "pageInvesticieMesacne",
      "elements": [
        {
          "type": "text",
          "name": "investicieMesacne",
          "title": "Koľko v priemere mesačne investuješ?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "inputType": "number",
          "min": "0",
          "minErrorText": "Hodnota nemôže byť negatívna.",
          "placeHolder": "Tvoju odpoveď napíš sem..."
        }
      ],
      "visibleIf": "{investicie} = 'investicieAno'"
    },
    {
      "name": "pageDruhyPilier",
      "elements": [
        {
          "type": "radiogroup",
          "name": "druhyPilier",
          "title": "Máš založený druhý pilier?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "choices": [
            {
              "value": "druhyPilierAno",
              "text": "áno"
            },
            {
              "value": "druhyPilierNie",
              "text": "nie"
            },
            {
              "value": "druhyPilierNeviem",
              "text": "neviem"
            }
          ]
        }
      ]
    },
    {
      "name": "pageDruhyPilierFondy",
      "elements": [
        {
          "type": "radiogroup",
          "name": "druhyPilierFondy",
          "title": "V akých fondoch máš druhý pilier?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "choices": [
            {
              "value": "druhyPilierFondyIndexove",
              "text": "indexové negarantované"
            },
            {
              "value": "druhyPilierFondyAkciove",
              "text": "akciové negarantované"
            },
            {
              "value": "druhyPilierFondyDlhopisove",
              "text": "dlhopisové garantované"
            },
            {
              "value": "druhyPilierFondyZmiesane",
              "text": "zmiešané"
            },
            {
              "value": "druhyPilierFondyNeviem",
              "text": "neviem"
            }
          ]
        }
      ],
      "visibleIf": "{druhyPilier} = 'druhyPilierAno'"
    },
    {
      "name": "pageTretiPilier",
      "elements": [
        {
          "type": "radiogroup",
          "name": "tretiPilier",
          "title": "Máš založený tretí pilier?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "choices": [
            {
              "value": "tretiPilierAnoZamestnavatelPrispieva",
              "text": "mám, prispieva mi zamestnávateľ"
            },
            {
              "value": "tretiPilierAnoZamestnavatelNeprispieva",
              "text": "mám, zamestnávateľ mi neprispieva"
            },
            {
              "value": "tretiPilierNemam",
              "text": "nemám"
            },
            {
              "value": "tretiPilierNeviem",
              "text": "neviem"
            }
          ]
        }
      ]
    },
    {
      "name": "pageTretiPilierFondy",
      "elements": [
        {
          "type": "radiogroup",
          "name": "tretiPilierFondy",
          "title": "V akých fondoch máš tretí pilier?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "choices": [
            {
              "value": "tretiPilierFondyIndexove",
              "text": "indexové negarantované"
            },
            {
              "value": "tretiPilierFondyAkciove",
              "text": "akciové negarantované"
            },
            {
              "value": "tretiPilierFondyDlhopisove",
              "text": "dlhopisové garantované"
            },
            {
              "value": "tretiPilierFondyZmiesane",
              "text": "zmiešané"
            },
            {
              "value": "tretiPilierFondyNeviem",
              "text": "neviem"
            }
          ]
        }
      ],
      "visibleIf": "{tretiPilier} anyof ['tretiPilierAnoZamestnavatelPrispieva', 'tretiPilierAnoZamestnavatelNeprispieva']"
    },
    {
      "name": "pageUverHypotekaPozicka",
      "elements": [
        {
          "type": "checkbox",
          "name": "uverHypotekaPozicka",
          "title": "Máš požičané peniaze?",
          "description": "(hypotéka, úver, pôžička)",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "choices": [
            {
              "value": "uverHypotekaPozickaNie",
              "text": "nie"
            },
            {
              "value": "uverHypotekaPozickaAnoHypoteka",
              "text": "áno, mám hypotéku"
            },
            {
              "value": "uverHypotekaPozickaAnoUverPozicka",
              "text": "áno, mám úver alebo pôžičku"
            }
          ]
        }
      ]
    },
    {
      "name": "pageHypotekaVyskaSplatky",
      "elements": [
        {
          "type": "text",
          "name": "hypotekaVyskaSplatky",
          "title": "Aká je Tvoja mesačná splátka hypotéky?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "inputType": "number",
          "min": "0",
          "minErrorText": "Hodnota nemôže byť negatívna.",
          "placeHolder": "Tvoju odpoveď napíš sem..."
        }
      ],
      "visibleIf": "{uverHypotekaPozicka} contains 'uverHypotekaPozickaAnoHypoteka'"
    },
    {
      "name": "pageHypotekaUrok",
      "elements": [
        {
          "type": "radiogroup",
          "name": "hypotekaUrok",
          "title": "Aký máš na hypotéke úrok?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "choices": [
            {
              "value": "hypotekaUrokDo1",
              "text": "menej ako 1%"
            },
            {
              "value": "hypotekaUrok1az2",
              "text": "1 až 2%"
            },
            {
              "value": "hypotekaUrokViacAko2",
              "text": "viac ako 2%"
            },
            {
              "value": "hypotekaUrokNeviem",
              "text": "neviem"
            }
          ]
        }
      ],
      "visibleIf": "{uverHypotekaPozicka} contains 'uverHypotekaPozickaAnoHypoteka'"
    },
    {
      "name": "pageUverPozickaVyskaSplatky",
      "elements": [
        {
          "type": "text",
          "name": "uverPozickaVyskaSplatky",
          "title": "Aká je Tvoja mesačná splátka úveru alebo pôžičky?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "inputType": "number",
          "min": "0",
          "minErrorText": "Hodnota nemôže byť negatívna.",
          "placeHolder": "Tvoju odpoveď napíš sem..."
        }
      ],
      "visibleIf": "{uverHypotekaPozicka} contains 'uverHypotekaPozickaAnoUverPozicka'"
    },
    {
      "name": "pageUverPozickaUrok",
      "elements": [
        {
          "type": "radiogroup",
          "name": "uverPozickaUrok",
          "title": "Aké máš úroky?",
          "isRequired": true,
          "requiredErrorText": "Prosím, vyplň túto odpoveď.",
          "choices": [
            {
              "value": "uverPozickaUrokDo5",
              "text": "menej ako 5%"
            },
            {
              "value": "uverPozickaUrok5az10",
              "text": "5 až 10%"
            },
            {
              "value": "uverPozickaUrokViacAko10",
              "text": "viac ako 10%"
            },
            {
              "value": "uverPozickaUrokNeviem",
              "text": "neviem"
            }
          ]
        }
      ],
      "visibleIf": "{uverHypotekaPozicka} contains 'uverHypotekaPozickaAnoUverPozicka'"
    }
  ]
}