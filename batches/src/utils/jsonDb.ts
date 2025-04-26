import fs from "fs";
import path from "path";

type Startup = {
  Startup: string;
  inception_year: number;
  founder_1?: string;
  founder_2?: string;
  founder_3?: string;
  lien_founder_1?: string;
  lien_founder_2?: string;
  lien_founder_3?: string;
  Linkedin_entreprise?: string;
  Programme?: string[];
  Founders?: string[];
  lien_entreprise?: string;
  Sector?: string;
  Statut?: string[];
};

export class JsonDb {
  private data: Startup[] = [];
  private isLoaded: boolean = false;

  constructor() {
    // Le constructeur ne fait plus rien de bloquant
  }

  public async loadData(): Promise<void> {
    if (this.isLoaded) return;
    
    try {
      const response = await fetch('/airtable.json');
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      this.data = await response.json();
      this.isLoaded = true;
    } catch (error) {
      console.error("Erreur lors du chargement des données JSON:", error);
      this.data = [];
    }
  }

  public getAll(): Startup[] {
    return this.data;
  }

  public findByStartupName(name: string): Startup | undefined {
    return this.data.find((startup) => startup.Startup.toLowerCase() === name.toLowerCase());
  }

  public filterByYear(year: number): Startup[] {
    return this.data.filter((startup) => startup.inception_year === year);
  }

  // Méthodes de modification supprimées car un site statique ne peut pas modifier les fichiers
}