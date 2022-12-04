import Redis from "ioredis";
import { calculateSummaryStats } from "../utils/calculate-summary-stats";

export class SummaryStatisticController {
  private redisClient: Redis;

  constructor(redisClient: Redis) {
    this.redisClient = redisClient;
  }

  private async getAllRedisValues() {
    const redisKeys = await this.redisClient.keys("*");
    const redisValues = await this.redisClient.mget(redisKeys);

    return redisValues.map((value) => {
      return JSON.parse(value as string);
    });
  }

  async fetchSummaryStatsForAllSalaries() {
    const salaries = await this.getAllRedisValues();
    return calculateSummaryStats(salaries);
  }

  async fetchSummaryStatsForAllOnContractSalaries() {
    const allSalaries = await this.getAllRedisValues();
    const filteredSalaries = allSalaries.filter(
      (salary) => salary.on_contract === true
    );
    return calculateSummaryStats(filteredSalaries);
  }

  async fetchSummaryStatsForEachDepartment(department: string) {
    const allSalaries = await this.getAllRedisValues();
    const filteredSalaries = allSalaries.filter(
      (salary) => salary.department === department
    );
    return calculateSummaryStats(filteredSalaries);
  }

  async fetchSummaryStatsForEachDepartmentAndSubDepartment({
    department,
    subDepartment,
  }: {
    department: string;
    subDepartment: string;
  }) {
    const allSalaries = await this.getAllRedisValues();
    const filteredSalaries = allSalaries.filter(
      (salary) =>
        salary.department === department &&
        salary.sub_department === subDepartment
    );
    return calculateSummaryStats(filteredSalaries);
  }
}
