import { Request, Response, Router } from "express";
import { SummaryStatisticController } from "../controllers/SummaryStatisticsController";
import Redis from "ioredis";

class SummaryStatisticsRoute {
  private redisClient = new Redis({
    host: "redis",
    port: 6379,
  });
  private summaryStatsController = new SummaryStatisticController(
    this.redisClient
  );
  public router = Router();

  constructor() {
    this.router.get("/", async (req: Request, res: Response) => {
      const allSalarySummaryStats =
        await this.summaryStatsController.fetchSummaryStatsForAllSalaries();

      res.send(allSalarySummaryStats);
    });

    this.router.get("/on-contract", async (req: Request, res: Response) => {
      const onContractSalarySummaryStats =
        await this.summaryStatsController.fetchSummaryStatsForAllOnContractSalaries();

      res.send(onContractSalarySummaryStats);
    });

    this.router.get("/each-department", async (req: Request, res: Response) => {
      const eachDepartmentSalarySummaryStats =
        await this.summaryStatsController.fetchSummaryStatsForEachDepartment();

      res.send(eachDepartmentSalarySummaryStats);
    });

    this.router.get(
      "/each-department-and-sub-department",
      async (req: Request, res: Response) => {
        const eachDepartmentAndSubDepartmentSalarySummaryStats =
          await this.summaryStatsController.fetchSummaryStatsForEachDepartmentAndSubDepartment();

        res.send(eachDepartmentAndSubDepartmentSalarySummaryStats);
      }
    );
  }
}

export = new SummaryStatisticsRoute().router;
