//Class to create tables and seed new database
import { DataSource } from "typeorm";
import { DBConfiguration } from "./Configuration";
import { SettingsEntity } from "./db/Settings.entity";
//autogenerate imports based on resources
import { MicrosoftExcelEntity } from "./db/MicrosoftExcel.entity";
import { MicrosoftPowerBIEntity } from "./db/MicrosoftPowerBI.entity";
import { DataAnalyticsEntity } from "./db/DataAnalytics.entity";
import { ProjectManagementEntity } from "./db/ProjectManagement.entity";
import { DataScienceEntity } from "./db/DataScience.entity";

export class Database {
  static dbConfiguration: DBConfiguration;
  public static ds: DataSource;

  static async Initialize(dbConfiguration: DBConfiguration) {
    Database.dbConfiguration = dbConfiguration;
    let dbConfig: any = dbConfiguration as any;
    //Autogenerate entities array from resource names

    dbConfig.entities = [SettingsEntity, MicrosoftExcelEntity, MicrosoftPowerBIEntity, DataAnalyticsEntity, ProjectManagementEntity, DataScienceEntity];
    Database.ds = new DataSource(dbConfig);
    await Database.ds.initialize();

    //TODO: Drop all tables


    await Database.Seed();
  }
  static async Seed() {
    let data: any = {"MicrosoftExcel":[{"title":"title 1","description":"description 1","price":0.03,"duration":1,"exercises":"exercises 1","id":20},{"title":"title 2","description":"description 2","price":0.08,"duration":2,"exercises":"exercises 2","id":70},{"title":"title 3","description":"description 3","price":0.92,"duration":3,"exercises":"exercises 3","id":96},{"title":"title 4","description":"description 4","price":0.64,"duration":4,"exercises":"exercises 4","id":57},{"title":"title 5","description":"description 5","price":0.29,"duration":5,"exercises":"exercises 5","id":20}],"MicrosoftPowerBI":[{"title":"title 1","description":"description 1","price":0.45,"duration":1,"exercises":"exercises 1","id":53},{"title":"title 2","description":"description 2","price":0.48,"duration":2,"exercises":"exercises 2","id":41},{"title":"title 3","description":"description 3","price":0.82,"duration":3,"exercises":"exercises 3","id":21},{"title":"title 4","description":"description 4","price":0.72,"duration":4,"exercises":"exercises 4","id":63},{"title":"title 5","description":"description 5","price":0.25,"duration":5,"exercises":"exercises 5","id":98}],"DataAnalytics":[{"title":"title 1","description":"description 1","price":0.69,"duration":1,"exercises":"exercises 1","id":39},{"title":"title 2","description":"description 2","price":0.79,"duration":2,"exercises":"exercises 2","id":11},{"title":"title 3","description":"description 3","price":0.78,"duration":3,"exercises":"exercises 3","id":45},{"title":"title 4","description":"description 4","price":0.79,"duration":4,"exercises":"exercises 4","id":89},{"title":"title 5","description":"description 5","price":1,"duration":5,"exercises":"exercises 5","id":99}],"ProjectManagement":[{"title":"title 1","description":"description 1","price":0.18,"duration":1,"exercises":"exercises 1","id":81},{"title":"title 2","description":"description 2","price":0.48,"duration":2,"exercises":"exercises 2","id":59},{"title":"title 3","description":"description 3","price":0.67,"duration":3,"exercises":"exercises 3","id":14},{"title":"title 4","description":"description 4","price":0.14,"duration":4,"exercises":"exercises 4","id":43},{"title":"title 5","description":"description 5","price":0.57,"duration":5,"exercises":"exercises 5","id":4}],"DataScience":[{"title":"title 1","description":"description 1","price":1,"duration":1,"exercises":"exercises 1","id":40},{"title":"title 2","description":"description 2","price":0.54,"duration":2,"exercises":"exercises 2","id":77},{"title":"title 3","description":"description 3","price":0.17,"duration":3,"exercises":"exercises 3","id":5},{"title":"title 4","description":"description 4","price":0.24,"duration":4,"exercises":"exercises 4","id":73},{"title":"title 5","description":"description 5","price":0.99,"duration":5,"exercises":"exercises 5","id":44}]};
    //Autogenerate multiple such calls ie for each resource and its data object
    let isSeeded = await this.IsSeeded();
    //if (!isSeeded) {
    //forcing app recreation
    if (true){
      console.log('   Seeding database...');
      await this.SeedResource("MicrosoftExcelEntity", data.MicrosoftExcel);
await this.SeedResource("MicrosoftPowerBIEntity", data.MicrosoftPowerBI);
await this.SeedResource("DataAnalyticsEntity", data.DataAnalytics);
await this.SeedResource("ProjectManagementEntity", data.ProjectManagement);
await this.SeedResource("DataScienceEntity", data.DataScience); 
      await this.SeedResource("SettingsEntity", {
        settingname: "isSeeded",
        settingvalue: "true",
      });
    }else{
      console.log('   Database seeded already!');
    }
  }
  static async IsSeeded() {
    const repo = Database.ds.getRepository("SettingsEntity");
    let rec: any = await repo.findOne({
      select: {
        settingname: true,
        settingvalue: true,
      },
      where: {
        settingname: "isSeeded",
      },
    });
    if (rec && rec.settingvalue) return true;
    return false;
  }
  static async SeedResource(resourceName: any, resourceData: any) {
    const repo = Database.ds.getRepository(resourceName);
    //await repo.clear();
    console.log('   Seeding table '+resourceName);
    await repo.upsert(resourceData, ["id"]);
  }
}

