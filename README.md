# subscription-maker-api
Projekat na ovom repozitorijumu predstavlja backend aplikacije implementiran u Node.js-u.
U samom index.js fajlu nalazi se konekcija sa Mongo bazom podataka, ciji je test sadrzaj eskportovan u json fajlove. Eksportovani sadrzaj nalazi se u okviru ovog repozitorijuma u folderu MongoDB Data.
Osim konekcije ka bazi, u index.js fajlu nalaze se sve potrebne funkcije koje kveruju bazu. Projekat obuhvata sve CRUD operacije.
Kverijima se:
    -proverava autenticnost korisnika
        (kao parametar prosledjuje se email korisnika, to moze biti user, admin ili staff, razlikuju se po rollID redom 2, 0, 1)
    -kreira se novi korisnik tipa User za potrebe sklapanja ugovora kao novi korisnik
        (kao parametri prosledjuju se rollID, email, password, name, surname)
    -dobijaju se svi postojeci ugovori koje je konkretan korisnik sklopio
        (kao parametar prosledjuje se email korisnika)
    -dobijaju se svi moguci dodaci na koje korisnik dodatno moze da se pretplati
    -kreira se novi dodatak
        (kao parametri prosledjuju se tip i naziv dodatka)
    -dodaje se odabrani dodatak u paket korisnika
        (kao parametri prosledjuju se email, target i naziv paketa za pronalazenje potrebnog paketa, kao i naziv dodatka)
    -uklanja se odabrani dodatak iz paketa korisnika
        (kao parametri prosledjuju se email, target i naziv paketa, kao i naziv dodatka)
    -dobija spisak svih paketa iz baze
    -kreira se novi paket
        (kao parametri prosledjuju se naziv, cena i niz usluga)
    -omogucuje izmenu posotjeceg paketa
        (kao parametri prosledjuju se stari naziv, novi naziv, nova cena i novi niz usluga)
    -omogucuje uklanjanje nekog paketa
        (kao parametar prosledjuje se naziv paketa)
    -omogucuje pretrazivanje baze za korisnikom
        (kao parametar se salje email)
    -kreira se novi ugovor
        (kao parametri prosledjuju se email, target, paket)
    -omogucuje se brisanje ugovora
        (kao parametri salju se email i target)

Backend se pokrece na http://localhost:4000.