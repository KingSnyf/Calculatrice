(function () {
    var ecran = document.getElementById("ecran");
    var boutons = document.querySelectorAll("button");
    var valeurActuelle = "";
    var operation = null;
    var precedent = null;
    var nouveauNombre = false;
    // --- Gestion des boutons ---
    boutons.forEach(function (bouton) {
        var nombre = bouton.getAttribute("data-nombre");
        var action = bouton.getAttribute("data-action");
        var fonction = bouton.getAttribute("data-fonction");
        bouton.addEventListener("click", function () {
            // --- Boutons numériques ---
            if (nombre !== null) {
                if (nouveauNombre) {
                    valeurActuelle = nombre;
                    nouveauNombre = false;
                }
                else {
                    if (nombre === "." && valeurActuelle.indexOf(".") !== -1)
                        return;
                    valeurActuelle = valeurActuelle === "0" ? nombre : valeurActuelle + nombre;
                }
                majEcran();
                return;
            }
            // --- Actions ---
            if (action !== null) {
                switch (action) {
                    case "clear": // Supprime le dernier caractère
                        valeurActuelle = valeurActuelle.slice(0, -1);
                        if (valeurActuelle === "")
                            valeurActuelle = "0";
                        majEcran();
                        break;
                    case "plus": // Efface tout
                        valeurActuelle = "0";
                        precedent = null;
                        operation = null;
                        majEcran();
                        break;
                    case "pourcentage":
                        valeurActuelle = (parseFloat(valeurActuelle) / 100).toString();
                        majEcran();
                        break;
                    case "diviser":
                    case "multiplier":
                    case "enlever":
                    case "ajouter":
                        definirOperation(action);
                        break;
                    case "egal":
                        calculerResultat();
                        break;
                }
                return;
            }
            // --- Fonctions scientifiques ---
            if (fonction !== null) {
                appliquerFonction(fonction);
                return;
            }
        });
    });
    // --- Fonctions principales ---
    function majEcran() {
        ecran.textContent = valeurActuelle;
    }
    function definirOperation(op) {
        if (precedent === null)
            precedent = parseFloat(valeurActuelle);
        else
            calculerResultat();
        operation = op;
        nouveauNombre = true;
    }
    function calculerResultat() {
        if (operation === null || precedent === null)
            return;
        var courant = parseFloat(valeurActuelle);
        var resultat = 0;
        switch (operation) {
            case "ajouter":
                resultat = precedent + courant;
                break;
            case "enlever":
                resultat = precedent - courant;
                break;
            case "multiplier":
                resultat = precedent * courant;
                break;
            case "diviser":
                resultat = courant !== 0 ? precedent / courant : NaN;
                break;
        }
        valeurActuelle = resultat.toString();
        operation = null;
        precedent = null;
        majEcran();
        nouveauNombre = true;
    }
    function appliquerFonction(f) {
        var x = parseFloat(valeurActuelle);
        var res = x;
        switch (f) {
            case "sin":
                res = Math.sin(x);
                break;
            case "cos":
                res = Math.cos(x);
                break;
            case "tan":
                res = Math.tan(x);
                break;
            case "sqrt":
                res = Math.sqrt(x);
                break;
            case "ln":
                res = Math.log(x);
                break;
            case "Espo":
                res = Math.exp(x);
                break;
        }
        valeurActuelle = res.toString();
        majEcran();
        nouveauNombre = true;
    }
    // --- Affichage du mode scientifique ---
    var boutonSci = document.getElementById("bouton-sci");
    var blocSci = document.getElementById("sci");
    if (boutonSci && blocSci) {
        boutonSci.addEventListener("click", function () {
            blocSci.classList.toggle("cacher");
        });
    }
})();
