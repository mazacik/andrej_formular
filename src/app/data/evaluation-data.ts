import { EvaluationQuestion } from "../model/evaluation-question.model";
import { AnswerID } from "../enum/answer-id.enum";
import { QuestionID } from "../enum/question-id.enum";
import { AnswerType } from "../enum/answer-type.enum";

export const EvaluationData: EvaluationQuestion[] = [{
  id: QuestionID.odkladaniePenaziVyska,
  weight: 1,
  answers: [{
    id: AnswerID.odkladaniePenaziVyskaDo1x,
    type: AnswerType.NEGATIVE,
    text: 'Nemáš takmer žiadnu finančnú rezervu. Finančná rezerva by mala byť min. 3-násobok, ideálne 6-násobok Tvojho mesačného príjmu.'
  }, {
    id: AnswerID.odkladaniePenaziVyskaDo3x,
    type: AnswerType.NEGATIVE,
    text: 'Nemáš dostatočnú finančnú rezervu. Finančná rezerva by mala byť min. 3-násobok, ideálne 6-násobok Tvojho mesačného príjmu.'
  }, {
    id: AnswerID.odkladaniePenaziVyskaDo6x,
    type: AnswerType.POSITIVE,
    text: 'Máš dostatočnú finačnú rezervu. Finančná rezerva by mala byť min. 3-násobok, ideálne 6-násobok Tvojho mesačného príjmu.'
  }, {
    id: AnswerID.odkladaniePenaziVyskaNad6x,
    type: AnswerType.NEUTRAL,
    text: 'Je výbroné, že máš finančnú rezervu, ale máš v nej viac ako treba. Peniaze Ti strácajú na hodnote. Finančná rezerva by mala byť min. 3-násobok, ideálne 6-násobok Tvojho mesačného príjmu.'
  }]
}, {
  id: QuestionID.kolkoMesacneOstavaNaUcte,
  weight: 3,
  answers: [{
    id: AnswerID.kolkoMesacneOstavaNaUcteDo10,
    type: AnswerType.NEGATIVE,
    text: 'Mali by sme si odkladať minimálne 10, ideálne až 30% z príjmu. Pozor! Neodkladáš si ani minimum!'
  }, {
    id: AnswerID.kolkoMesacneOstavaNaUcteDo30,
    type: AnswerType.NEUTRAL,
    text: 'Mali by sme si odkladať minimálne 10, ideálne až 30% z príjmu. Stále máš priestor na zlepšenie.'
  }, {
    id: AnswerID.kolkoMesacneOstavaNaUcteNad30,
    type: AnswerType.POSITIVE,
    text: 'Mali by sme si odkladať minimálne 10, ideálne až 30% z príjmu. Odkladáš si dostatok peňazí.'
  }]
}, {
  id: QuestionID.kolkoMesacneSpori,
  weight: 1,
  answers: [{
    id: AnswerID.kolkoMesacneSporiDo5,
    type: AnswerType.NEUTRAL,
    text: 'Odporúčame zvýšiť mesačnú sumu, ktorú odkladáš do rezervy. '
  }, {
    id: AnswerID.kolkoMesacneSporiNad5,
    type: AnswerType.POSITIVE,
    text: 'Na finančnú rezervu si odkladáš dostatočnú sumu.'
  }, {
    id: AnswerID.kolkoMesacneSporiNic,
    type: AnswerType.NEGATIVE,
    text: 'Netvoríš si finančnú rezervu. Ak to nezmeníš, môžeš sa dostať do finančných problémov.'
  }]
}, {
  id: QuestionID.zivotnePoistenie,
  weight: 3,
  answers: [{
    id: AnswerID.zivotnePoistenieMa,
    type: AnswerType.POSITIVE,
    text: 'Máš životné poistenie. Myslíš na pokrytie výpadku príjmu.'
  }, {
    id: AnswerID.zivotnePoisteniePlatiNiektoIny,
    type: AnswerType.NEUTRAL,
    text: 'Životné poistenie Ti platí niekto iný. Prosím skontroluj, či máš dostatočne krytý výpadok príjmu.'
  }, {
    id: AnswerID.zivotnePoistenieNema,
    type: AnswerType.NEGATIVE,
    text: 'Nemáš životné poistenie. Vôbec nemáš pokrytý výpadok príjmu.'
  }]
}, {
  id: QuestionID.zivotnePoistenieKolkoPlati,
  weight: 1,
  answers: [{
    id: AnswerID.zivotnePoistenieKolkoPlatiPod3,
    type: AnswerType.NEUTRAL,
    text: 'Máš nízko nastavené životné poistenie. Nemáš dostatočne krytý príjem!'
  }, {
    id: AnswerID.zivotnePoistenieKolkoPlati3az5,
    type: AnswerType.POSITIVE,
    text: 'Máš dobre nastavenú sumu za životné poistenie.'
  }, {
    id: AnswerID.zivotnePoistenieKolkoPlatiNad5,
    type: AnswerType.NEUTRAL,
    text: 'Za životné poistenie platíš príliš veľa. Odporúčame ho skontrolovať.'
  }]
}, {
  id: QuestionID.zivotnePoistenieInvesticia,
  weight: 1,
  answers: [{
    id: AnswerID.zivotnePoistenieInvesticiaAno,
    type: AnswerType.NEGATIVE,
    text: 'Tvoje poistenie obsahuje sporiacu zložku! Sporenie cez poistenie sa neoplatí. Prichádzaš v poistení o veľa peňazí.'
  }, {
    id: AnswerID.zivotnePoistenieInvesticiaNie,
    type: AnswerType.POSITIVE,
    text: 'Tvoje poistenie neobsahuje sporiacu zložku.'
  }, {
    id: AnswerID.zivotnePoistenieInvesticiaNeviem,
    type: AnswerType.NEUTRAL,
    text: 'Odporúčame skontrolovať Tvoje poistenie. Ak obsahuje sporiacu zložku, pravdepodobne prichádzaš o veľa peňazí.'
  }]
}, {
  id: QuestionID.majetokBytDomPoistenie,
  weight: 1,
  answers: [{
    id: AnswerID.majetokBytDomPoistenieVobec,
    type: AnswerType.NEGATIVE,
    text: 'Nemáš poistenú nehnuteľnosť. Môže sa stať, že prídeš o veľa peňazí.'
  }, {
    id: AnswerID.majetokBytDomPoistenieNeviemAko,
    type: AnswerType.NEUTRAL,
    text: 'Odporúčame skontrolovať nastavenie poistenia. Je dôležité, aby bola nehnuteľnosť poistená komplexne, inak hrozí, že zbytočne prídeš o peniaze.'
  }, {
    id: AnswerID.majetokBytDomPoistenieKomplexne,
    type: AnswerType.POSITIVE,
    text: 'Tvoja nehnuteľnosť je poistená komplexne.'
  }, {
    id: AnswerID.majetokBytDomPoistenieNieKomplexne,
    type: AnswerType.NEGATIVE,
    text: 'Je dôležité, aby bola nehnuteľnosť poistená komplexne, inak hrozí, že zbytočne prídeš o peniaze.'
  }]
}, {
  id: QuestionID.investicie,
  weight: 3,
  answers: [{
    id: AnswerID.investicieAno,
    type: AnswerType.POSITIVE,
    text: 'Investuješ a teda zhodnocuješ svoje peniaze.'
  }, {
    id: AnswerID.investicieNie,
    type: AnswerType.NEGATIVE,
    text: 'Neinvestuješ. Tvoje peniaze sa nezhodnocujú a prichádzaš o ich hodnotu.'
  }]
}, {
  id: QuestionID.investicieMesacne,
  weight: 1,
  answers: [{
    id: AnswerID.investicieMesacneDo5,
    type: AnswerType.NEGATIVE,
    text: 'Vzhľadom na Tvoj príjem investuješ príliš nízku. Malo by sa Ti zhodnocovať viac peňazí.'
  }, {
    id: AnswerID.investicieMesacneDo10,
    type: AnswerType.NEUTRAL,
    text: 'Je dobré, že investuješ a zhodnocuješ svoje peniaze, ale vzhľadom na Tvoj príjem je potrebné investovať viac.'
  }, {
    id: AnswerID.investicieMesacneNad10,
    type: AnswerType.POSITIVE,
    text: 'Investuješ dostatočnú sumu vzhľadom na Tvoj príjem.'
  }]
}, {
  id: QuestionID.druhyPilier,
  weight: 1,
  answers: [{
    id: AnswerID.druhyPilierAno,
    type: AnswerType.POSITIVE,
    text: 'Máš druhý pilier. Získavaš od štátu peniaze v podstate zadarmo.'
  }, {
    id: AnswerID.druhyPilierNie,
    type: AnswerType.NEGATIVE,
    text: 'Nemáš druhý pilier! Prichádzaš o peniaze, ktoré by si mohol získať od štátu v podstate zadarmo.'
  }, {
    id: AnswerID.druhyPilierNeviem,
    type: AnswerType.NEUTRAL,
    text: 'Nevieš, či máš druhý pilier. Odporúčame to zistiť. Cez druhý pilier získaváš od štátu peniaze v podstate zadarmo.'
  }]
}, {
  id: QuestionID.druhyPilierFondy,
  weight: 1,
  answers: [{
    id: AnswerID.druhyPilierFondyIndexove,
    type: AnswerType.POSITIVE,
    text: 'V druhom pilieri máš tie najvýnosnejšie fondy. Tvoje peniaze sa zhodnocujú.'
  }, {
    id: AnswerID.druhyPilierFondyAkciove,
    type: AnswerType.NEUTRAL,
    text: 'V druhom pilieri máš zle nastavené fondy. Prichádzaš o peniaze.'
  }, {
    id: AnswerID.druhyPilierFondyDlhopisove,
    type: AnswerType.NEGATIVE,
    text: 'V druhom pilieri máš zle nastavené fondy. Prichádzaš o peniaze.'
  }, {
    id: AnswerID.druhyPilierFondyZmiesane,
    type: AnswerType.NEGATIVE,
    text: 'V druhom pilieri máš zle nastavené fondy. Prichádzaš o peniaze.'
  }, {
    id: AnswerID.druhyPilierFondyNeviem,
    type: AnswerType.NEGATIVE,
    text: 'Určite si zisti, aké máš fondy v 2. pilieri. Ak ich máš nastavené zle, zbytočne prichádzaš o peniaze.'
  }]
}, {
  id: QuestionID.tretiPilier,
  weight: 1,
  answers: [{
    id: AnswerID.tretiPilierAnoZamestnavatelPrispieva,
    type: AnswerType.POSITIVE,
    text: 'Máš tretí pilier a získavaš zadarmo peniaze od Tvojho zamestnávateľa.'
  }, {
    id: AnswerID.tretiPilierAnoZamestnavatelNeprispieva,
    type: AnswerType.NEGATIVE,
    text: 'Odporúčame neprispievať si do 3. piliera ak neprispieva aj zamestnávateľ. Existujú výnosnejšie a flexibilnjšie alternatívy ako si sporiť na dôchodok.'
  }, {
    id: AnswerID.tretiPilierNemam,
    type: AnswerType.NEUTRAL,
    text: ''
  }, {
    id: AnswerID.tretiPilierNeviem,
    type: AnswerType.NEUTRAL,
    text: 'Nevieš, či máš tretí pilier. Odporúčame to zistiť. V prípade, že Tvoj zamestnávateľ prispieva na 3. pilier, môžeš získať peniaze v podstate zadarmo.'
  }]
}, {
  id: QuestionID.tretiPilierFondy,
  weight: 1,
  answers: [{
    id: AnswerID.tretiPilierFondyIndexove,
    type: AnswerType.POSITIVE,
    text: 'V treťom pilieri máš najvýnosnejšie fondy. Tvoje peniaze sa zhodnocujú.'
  }, {
    id: AnswerID.tretiPilierFondyAkciove,
    type: AnswerType.NEUTRAL,
    text: 'V treťom pilieri máš zle nastavené fondy. Prichádzaš o peniaze.'
  }, {
    id: AnswerID.tretiPilierFondyDlhopisove,
    type: AnswerType.NEGATIVE,
    text: 'V treťom pilieri máš zle nastavené fondy. Prichádzaš o peniaze.'
  }, {
    id: AnswerID.tretiPilierFondyZmiesane,
    type: AnswerType.NEGATIVE,
    text: 'V treťom pilieri máš zle nastavené fondy. Prichádzaš o peniaze.'
  }, {
    id: AnswerID.tretiPilierFondyNeviem,
    type: AnswerType.NEGATIVE,
    text: 'Určite si zisti, aké máš fondy v 2. pilieri. Ak ich máš nastavené zle, zbytočne prichádzaš o peniaze.'
  }]
}, {
  id: QuestionID.uverHypotekaPozicka,
  weight: 1,
  answers: [{
    id: AnswerID.uverHypotekaPozickaDo20,
    type: AnswerType.POSITIVE,
    text: 'Splátky Tvojich úverov sú v optimálnej úrovni vzhľadom na Tvoj príjem.'
  }, {
    id: AnswerID.uverHypotekaPozickaDo30,
    type: AnswerType.NEUTRAL,
    text: 'Si na hranici optimálnej výšky splátok Tvojich úverov. Odporúčame sa ďalej nezadlžovať.'
  }, {
    id: AnswerID.uverHypotekaPozickaNad30,
    type: AnswerType.NEGATIVE,
    text: 'Vzhľadom na Tvoj príjem máš vysoké splátky úverov. Odporúčame to zmeniť, inak sa môžeš dostať do finančných problémov.'
  }]
}, {
  id: QuestionID.hypotekaUrok,
  weight: 1,
  answers: [{
    id: AnswerID.hypotekaUrokDo1,
    type: AnswerType.POSITIVE,
    text: 'Máš dobrý úrok na hypotéke.'
  }, {
    id: AnswerID.hypotekaUrok1az2,
    type: AnswerType.NEUTRAL,
    text: 'Odporúčame prehodnotiť sadzbu na Tvojej hypotéke. Môžeš ušetriť zaujímavé peniaze.'
  }, {
    id: AnswerID.hypotekaUrokViacAko2,
    type: AnswerType.NEGATIVE,
    text: 'Máš príliš vysoký úrok na hypotéke. Prichádzaš o peniaze. Odporúčame úrok prehodnotiť.'
  }, {
    id: AnswerID.hypotekaUrokNeviem,
    type: AnswerType.NEGATIVE,
    text: 'Určite si zisti, aký máš úrok na hypotéke. Ak ho máš vysoký, zbytočne prichádzaš o peniaze. Úrok sa dá prehodnotiť.'
  }]
}, {
  id: QuestionID.uverPozickaUrok,
  weight: 1,
  answers: [{
    id: AnswerID.uverPozickaUrokDo5,
    type: AnswerType.NEUTRAL,
    text: 'Máš dobrý úrok na pôžičke.'
  }, {
    id: AnswerID.uverPozickaUrok5az10,
    type: AnswerType.NEUTRAL,
    text: 'Odporúčame prehodnotiť sadzbu na pôžičke. Môžeš ušetriť peniaze.'
  }, {
    id: AnswerID.uverPozickaUrokViacAko10,
    type: AnswerType.NEGATIVE,
    text: 'Máš príliš vysoký úrok na pôžičke. Prichádzaš o peniaze. Odporúčame úrok prehodnotiť.'
  }, {
    id: AnswerID.uverPozickaUrokNeviem,
    type: AnswerType.NEGATIVE,
    text: 'Určite si zisti aký máš úrok na pôžičke. Ak ho máš vysoký, zbytočne prichádzaš o peniaze. Úrok sa dá prehodnotiť.'
  }]
}];