import Redis from "ioredis";
import { ISalaryDataset } from "../interfaces/salary-dataset.interface";
import { v4 } from "uuid";
import _ from "underscore";

export class SalaryController {
  private redisClient: Redis;

  constructor(redisClient: Redis) {
    this.redisClient = redisClient;
  }

  async addSalary(salaryData: ISalaryDataset) {
    const id = v4();
    const addedSalaryData = _.defaults({ id }, salaryData);

    await this.redisClient.set(id, JSON.stringify(addedSalaryData));

    return addedSalaryData;
  }

  async deleteSalary(id: string) {
    const deletedSalary = await this.redisClient.getdel(id);

    if (!deletedSalary) {
      return null;
    }

    return JSON.parse(deletedSalary);
  }

  async getAllSalaries() {
    const redisKeys = await this.redisClient.keys("*");
    const redisValues = await this.redisClient.mget(redisKeys);

    return redisValues.map((value) => {
      return JSON.parse(value as string);
    });
  }
}
