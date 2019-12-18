## Nadoknada 2

Dorade se rađene nad branchom `plan-wk4`.

Dodali smo u registraciju mogućnost odabira tipa korisnika. Taj podatak spremili smo u zaseban `collection` i učitali ga nakon logina za svakog korisnika. Kao ključ dokumenta koristili smo email korisnika.

Također otkrili smo da u Firebase projektu treba omogućiti pisanje podataka na način da promijenimo `Database/Rules` sekciju u Firebase konzoli na sljedeće:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```