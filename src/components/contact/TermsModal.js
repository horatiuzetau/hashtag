// src/components/TermsModal.js
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';

const TermsModal = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
            <DialogTitle>Termeni și Condiții</DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6" gutterBottom>
                    1. INFORMAȚII GENERALE
                </Typography>
                <Typography variant="body1" paragraph>
                    Confidentialitatea datelor dumneavoastra cu caracter personal reprezinta una dintre
                    preocuparile principale ale SC MOVEAWAIMN S.R.L. - in calitate de operator de date.
                    <br /><br />
                    Prezenta Politica de prelucrare a datelor cu caracter personal a fost elaborata de catre
                    S.C. MOVEAWAIMN S.R.L. cu sediul social in FOCSANI JUD. VRANCEA  ,STR.8 MARTIE
                    NR.12, ET.3,AP 10 tel: 0724276957 si sediul punctului de lucru in FOCSANI, BDUL
                    BUCURESTI NR.14 JUD.VRANCEA, email: moveawaimn@gmail.com, inmatriculata la
                    Reg. Com. cu Nr.39/717/2022,CUI 46497197, reprezentata legal prin HUTUTUI
                    NICOLETA in calitate de Administrator, denumita in continuare OPERATOR, in
                    conformitate cu dispozitiile legislatiei  in vigoare, respectiv:
                </Typography>

                {/* Add more sections as needed, following the structure */}

                <Typography variant="h6" gutterBottom>
                    2. DEFINITII
                </Typography>
                <Typography variant="body1" paragraph>
                    a. Vizitator: este persoana fizica care doreste sa participe la activitatile si serviciile
                    oferite de catre Operator la punctul de lucru, in nume propriu si/sau ca reprezentant al
                    unui minor al carui parinte/tutore/insotitor este, pe care il are in ocrotire si cu privire la
                    care poate lua decizii, precum si vizitator al site-ului nostru.
                </Typography>
                <Typography variant="body1" paragraph>
                    b. Categoriile de date cu caracter personal prelucrate: date pe care le furnizati in mod
                    direct in contextul intrarii in sediul nostru, a utilizarii site-ului in cadrul sectiunii de
                    inregistrare, finalizare comanda si/sau comentarii, precum si cele completate in
                    formulare si anume: nume si prenume, adresa de email, adresa de domiciliu, data
                    nasterii, sexul, imaginea (fotografii si/sau video), inregistrari voce, numar de telefon,
                    preferinte personale pe baza de cookies in cazul navigarii pe pagina web a S.C.
                    MOVEAWAIMN.SRL
                </Typography>
                <Typography variant="body1" paragraph>
                    c. Prelucrarea datelor cu caracter personal: inseamnă orice operatiune sau set de
                    operatiuni efectuate asupra datelor cu caracter personal sau asupra seturilor de
                    operatiuni de date cu caracter personal, cu sau fara utilizare de mijloace automatizate,
                    cum ar fi: colectarea, inregistrarea, organizare, structurarea, stocarea, adaptarea sau
                    modificarea, extragerea, consultarea, utilizarea, diseminarea sau punerea la dispozitie
                    in orice alt mod, alinierea sau combinarea, restrictionarea, stergerea sau distrugerea;
                    MOVEAWAIMN.SRL
                </Typography>
                <Typography variant="body1" paragraph>
                    d. Operator de date: cu privire la datele personale pe care le prelucreaza este
                    MOVEAWAIMN SRL
                </Typography>

                <Typography variant="h6" gutterBottom>
                    3. SCOPURILE SI TEMEIURILE DE PRELUCRARII
                </Typography>
                <Typography variant="body1" paragraph>
                    Daca sunteti vizitator al S.C MOVEAWAIMN S.R.L. se vor prelucra datele dumneavoastra
                    cu caracter personal pentru urmatoarele scopuri:
                </Typography>
                <Typography variant="body1" paragraph>
                    - pentru activitati de marketing si/sau pentru transmiterea, prin intermediul mijloacelor
                    de comunicare la distanta (e-mail)/ telefon, de comunicari privind produsele noi aparute
                    pe site, oferte, reduceri, promotii, articolele noi publicate si alte informatii pe care le
                    consideram relevante;
                </Typography>
                <Typography variant="body1" paragraph>
                    - pentru permiterea participarii la activitatile si serviciile oferite de catre Operator ;
                </Typography>
                <Typography variant="body1" paragraph>
                    - pentru respectarea obligatiilor legale impuse de autoritatile nationale/ institutii publice
                    in baza unei obligatii legale care exista sau pot exista in viitor;
                </Typography>
                <Typography variant="body1" paragraph>
                    - pentru asigurarea sanatatii si securitatii in timpul tuturor activitatilor la care participa
                    vizitatorul;
                </Typography>
                <Typography variant="body1" paragraph>
                    Prelucrarea datelor dvs. pentru aceste scopuri are la baza interesul legitim al lui
                    MOVEAWAIMN S.R.L. de a asigura functionarea corecta a site-ului, precum si pentru a
                    imbunatatii permanent experienta vizitatorilor locatiei si site-ului, inclusiv pentru
                    solutionarea diferitelor comentarii, intrebari sau reclamatii.
                </Typography>
                <Typography variant="body1" paragraph>
                    Furnizarea datelor dumneavoastra este voluntara, refuzul furnizarii datelor pentru
                    aceste scopuri nu va avea urmari negative pentru dumneavoastra, insa este posibil ca
                    exercitarea dreptului de a obiecta sa ne impiedice sa va permitem dvs. sau minorului pe
                    care il aveti in ocrotire accesul in spatiul nostru.
                </Typography>


                <Typography variant="h6" gutterBottom>
                    4. COLECTAREA, STOCAREA SI TRANSFERUL DATELOR
                </Typography>
                <Typography variant="body1" paragraph>
                    Semnarea acestui formular consituie acordul expres si neechivoc de a avea acces la
                    datele dvs. cu caracter personal ca urmare a accesarii Site-ului Web, furnizate direct
                    (prin completarea si semnarea formularelor disponibile la punctul de lucru al
                    operatorului sau prin simpla intrare in punctul de lucru.) sau indirect (prin aprobarea
                    folosirii cookies-urilor);
                </Typography>
                <Typography variant="body1" paragraph>
                    Va vom solicita numai datele care vor fi relevante si necesare pentru furnizarea
                    serviciului solicitat;
                </Typography>
                <Typography variant="body1" paragraph>
                    Vom prelucra datele dumneavoastra personale atat in varianta scrisa, pe suport de
                    hartie, cat si in varianta computerizata, printr-un sistem informatic, dupa caz, si va
                    asiguram ca toate datele vor fi pastrate cu respectarea conditiilor de confidentialitate si
                    securitate.
                </Typography>
                <Typography variant="body1" paragraph>
                    Datele dvs. nu vor fi divulgate altor persoane, cu exceptia cazului in care acest lucru
                    este impus de legea in vigoare sau dacă nu este semnat un acord corespunzător care să
                    garanteze protectia drepturilor dumneavoastra.
                </Typography>
                <Typography variant="body1" paragraph>
                    Datele dvs. vor fi procesate pana cand va veti retrage consimtamantul pentru o astfel de
                    prelucrare, in măsura an care temeiul colectarii datelor a fost consimtamantul si nu:
                    executarea contractului, scop legitim, prevederile legale, etc.
                </Typography>
                <Typography variant="body1" paragraph>
                    Operatorul poate transfera datele cu caracter personal următoarelor categorii de
                    destinatari: autoritati publice, persoane fizice sau juridice in legatura cu desfasurarea
                    activitatii operatorului conform obiectului de activitate, fuziunea dintre operator si alta
                    societate etc.
                </Typography>


                <Typography variant="h6" gutterBottom>
                    5. DURATA PENTRU CARE VA PRELUCRAM DATELE
                </Typography>
                <Typography variant="body1" paragraph>
                    Ca principiu, S.C. MOVEAWAIMN S.R.L. va prelucra datele dumneavoastra cu caracter
                    personal, pana la retragerea consimtamantului, atat cat este necesar pentru realizarea
                    scopurilor de prelucrare mentionate mai sus.
                </Typography>
                <Typography variant="body1" paragraph>
                    Daca va retrageti consimtamantul pentru prelucrarea datelor in scop de marketing, S.C.
                    MOVEAWAIMN S.R.L. va inceta prelucrarea datelor dumneavoastra cu caracter personal
                    in acest scop, fara insa a afecta prelucrarile desfasurate de S.C. MOVEAWAIMN S.R.L.
                    pe baza consimtamantului exprimat de catre dumneavoastra inainte de retragerea
                    acestuia.
                </Typography>

                <Typography variant="h6" gutterBottom>
                    6. DEZVALUIREA DATELOR CU CARACTER PERSONAL
                </Typography>
                <Typography variant="body1" paragraph>
                    Pentru indeplinirea scopurilor de prelucrare, S.C. MOVEAWAIMN S.R.L. poate dezvalui
                    datele dumneavoastra catre parteneri, catre terte persoane sau entitati care sprijina
                    operatorul in desfasurarea activitatii la punctul de lucru, prin intermediul site-ului (de
                    exemplu furnizori de servicii IT, firme de curierat), ori catre autoritatile publice
                    centrale/locale, in urmatoarele cazuri exemplificativ enumerate:
                </Typography>
                <Typography variant="body1" paragraph>
                    - pentru administrarea site-ului;
                </Typography>
                <Typography variant="body1" paragraph>
                    - pentru finalizarea rezervarilor realizate prin intermediul site-ului;
                </Typography>
                <Typography variant="body1" paragraph>
                    - in situatiile in care aceasta comunicare ar fi necesara pentru atribuirea de premii sau
                    alte facilitati persoanelor vizate, obtinute ca urmare a participarii lor la diverse campanii
                    promotionale organizate de catre SC MOVEAWAIMN S.R.L.;
                </Typography>
                <Typography variant="body1" paragraph>
                    - pentru mentinerea, personalizarea si imbunatatirea site-ului si a paginilor firmei pe
                    diverse conturi de socializare, pentru imbunatatilea serviciilor derulate etc;
                </Typography>
                <Typography variant="body1" paragraph>
                    - pentru efectuarea analizei datelor, testarea si cercetarea, monitorizarea tendintelor de
                    utilizare si activitate, dezvoltarea caracteristicilor de siguranta si autentificarea
                    utilizatorilor;
                </Typography>
                <Typography variant="body1" paragraph>
                    - pentru transmiterea de comunicari comerciale de marketing, in conditiile si limitele
                    prevazute de lege;
                </Typography>
                <Typography variant="body1" paragraph>
                    - atunci cand dezvaluirea datelor cu caracter personal este prevazuta de lege etc.
                </Typography>


                <Typography variant="h6" gutterBottom>
                    7. DREPTURILE BENEFICIARILOR
                </Typography>
                <Typography variant="body1" paragraph>
                    In conditiile prevazute de legislatia in materia prelucrarii datelor cu caracter personal, in
                    calitate de persoane vizate, beneficiati de urmatoarele drepturi:
                </Typography>
                <Typography variant="body1" paragraph>
                    - dreptul la informare, respectiv dreptul de a primi detalii privind activitatile de prelucrare
                    efectuate de catre S.C. MOVEAWAIMN S.R.L. conform celor descrise in prezentul
                    document;
                </Typography>
                <Typography variant="body1" paragraph>
                    - dreptul de acces la date, puteti solicita in scris accesul la propriile informatii cu caracter
                    personal;
                </Typography>
                <Typography variant="body1" paragraph>
                    - dreptul la rectificare, respectiv dreptul de a obtine corectarea datelor cu caracter
                    personal inexacte, precum si completarea datelor incomplete;
                </Typography>
                <Typography variant="body1" paragraph>
                    - dreptul la stergerea datelor fara intarzieri nejustificate („dreptul de a fi uitat”), in cazul in
                    care considerati ca datele dvs. nu mai sunt necesare si solicitati in scris acest lucru la
                    adresa moveawaimn@gmail.com
                </Typography>
                <Typography variant="body1" paragraph>
                    - dreptul la restrictionarea prelucrarii datelor in masura in care persoana contesta
                    exactitatea datelor
                </Typography>
                <Typography variant="body1" paragraph>
                    - prelucrarea este ilegala, operatorul nu mai are nevoie de datele cu caracter
                    personal in scopul prelucrarii, persoana vizata s-a opus prelucrarii (altele decat cele de
                    marketing direct).
                </Typography>

                <Typography variant="body1" paragraph>
                    - prelucrarea este ilegala, operatorul nu mai are nevoie de datele cu caracter
                    personal in scopul prelucrarii, persoana vizata s-a opus prelucrarii (altele decat cele de
                    marketing direct).
                </Typography>


                <Typography variant="body1" paragraph>
                    - dreptul la portabilitatea datelor, respectiv dreptul de a primi datele cu caracter personal
                    intr-o modalitate structurata, folosita in mod obisnuit si intr-un format usor de citit,
                    precum si dreptul ca aceste date sa fie transmise de catre operator catre alt operator de
                    date, in masura in care sunt indeplinite conditiile prevazute de lege;
                </Typography>


                <Typography variant="body1" paragraph>
                    - dreptul la opozitie – in ceea ce priveste activitatile de prelucrare se poate exercita prin
                    transmiterea unei solicitari conform celor indicate mai jos:
                </Typography>


                <Typography variant="body1" paragraph>
                    ---- in orice moment, din motive legate de situatia particulara in care se afla persoana
                    vizata, ca datele care o vizeaza sa fie prelucrate in temeiul interesului legitim al
                    operatorului sau in temeiul interesului public, cu exceptia cazurilor in care operatorul
                    poate demonstra ca are motive legitime si imperioase care justifica prelucrarea si care
                    prevaleaza asupra intereselor, drepturilor si libertatilor persoanelor vizate sau ca scopul
                    este constatarea, exercitarea sau apararea unui drept in instanta;
                </Typography>


                <Typography variant="body1" paragraph>
                    ---- in orice moment, in mod gratuit si fara nicio justificare, ca datele care o vizeaza sa fie
                    prelucrate in scop de marketing direct.
                </Typography>


                <Typography variant="body1" paragraph>
                    - dreptul de a va adresa Autoritatii Nationale de Supraveghere a Prelucrarii Datelor cu
                    Caracter Personal care este o autoritate de supraveghere cu privire la protectia datelor
                    cu caracter personal, avand urmatoarele date de contact Mun. Bucuresti, Bd. G-ral.
                    Gheorghe Magheru, nr. 28-30, sector 1, telefon: +4 318.059.211, +4 318.059.212, fax+4
                    318.059.602, website: www.dataprotection.ro sau instantelor competente, in masura in
                    care considerati că v-am incalcat orice drept cu privire la datele cu caracter personal si
                    nu am dat curs solicitării dvs. din petitia formulata.
                </Typography>


                <Typography variant="body1" paragraph>
                    Pentru orice intrebari suplimentare cu privire la modul in care datele cu caracter
                    personal sunt prelucrate si pentru a va exercita drepturile mentionate mai sus, va rugam
                    sa va adresati la adresa de email: <a href="mailto:moveawaimn@gmail.com">moveawaimn@gmail.com</a>
                </Typography>


                <Typography variant="body1" paragraph>
                    Paginile de internet <a href="wwww.lasertagfocsani.ro">www.lasertagfocsani.ro</a> si <a href='www.rezervari.lasertagfocsani.ro'>www.rezervari.lasertagfocsani.ro</a>
                    folosesc fisiere de tip cookie. Pentru mai multe informatii cu privire la modul in care se folosesc aceste fisiere, va rugam sa
                    accesati urmatorul link: Politica de utilizare Cookies.
                </Typography>


                {/* Add all remaining sections from the document similarly */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Închide
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TermsModal;