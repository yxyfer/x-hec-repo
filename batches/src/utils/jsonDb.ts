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
};

export class JsonDb {
  private filePath: string;
  private data: Startup[];

  constructor() {
    this.filePath = path.join(process.cwd(), "..", "data", "airtable.json");
    this.data = this.loadData();
  }

  private loadData(): Startup[] {
    try {
      const fileContent = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Error loading JSON data:", error);
      return [];
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

  public addStartup(newStartup: Startup): void {
    this.data.push(newStartup);
    this.saveData();
  }

  private saveData(): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (error) {
      console.error("Error saving JSON data:", error);
    }
  }
}