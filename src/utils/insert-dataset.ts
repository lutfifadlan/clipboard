import { SalaryDataset } from "../config/salary_dataset";
import { IFormattedSalaryDataset } from "../interfaces/salary-dataset.interface";
import { Redis } from "ioredis";

export const insertDatasetToRedis = async (redisClient: Redis) => {
  redisClient.flushall();

  const salaryDataHashMap: IFormattedSalaryDataset = {};

  for (const data of SalaryDataset) {
    salaryDataHashMap[data.id] = JSON.stringify(data);
  }

  redisClient.mset(salaryDataHashMap);
};
