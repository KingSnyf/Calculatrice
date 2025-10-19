(() => {
  const ecran = document.getElementById("ecran") as HTMLDivElement;
  const boutons = document.querySelectorAll("button");

  let valeurActuelle = "";
  let operation: string | null = null;
  let precedent: number | null = null;
  let nouveauNombre = false;

  // --- Gestion des boutons ---
  boutons.forEach((bouton) => {
    const nombre = bouton.getAttribute("data-nombre");
    const action = bouton.getAttribute("data-action");
    const fonction = bouton.getAttribute("data-fonction");

    bouton.addEventListener("click", () => {
      // --- Boutons numériques ---
      if (nombre !== null) {
        if (nouveauNombre) {
          valeurActuelle = nombre;
          nouveauNombre = false;
        } else {
          if (nombre === "." && valeurActuelle.indexOf(".") !== -1) return;
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
            if (valeurActuelle === "") valeurActuelle = "0";
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
  function majEcran(): void {
    ecran.textContent = valeurActuelle;
  }

  function definirOperation(op: string): void {
    if (precedent === null) precedent = parseFloat(valeurActuelle);
    else calculerResultat();
    operation = op;
    nouveauNombre = true;
  }

  function calculerResultat(): void {
    if (operation === null || precedent === null) return;
    const courant = parseFloat(valeurActuelle);
    let resultat = 0;

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

  function appliquerFonction(f: string): void {
    const x = parseFloat(valeurActuelle);
    let res = x;

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
  const boutonSci = document.getElementById("bouton-sci") as HTMLButtonElement;
  const blocSci = document.getElementById("sci") as HTMLDivElement;

  if (boutonSci && blocSci) {
    boutonSci.addEventListener("click", () => {
      blocSci.classList.toggle("cacher");
    });
  }
})();
