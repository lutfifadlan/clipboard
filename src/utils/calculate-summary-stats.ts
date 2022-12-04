import _ from "underscore";
import { ISalaryDataset } from "../interfaces/salary-dataset.interface";

export const calculateSummaryStats = (salaryDataset: ISalaryDataset[]) => {
  if (salaryDataset.length === 0) {
    return {
      mean: 0,
      min: 0,
      max: 0,
    };
  }

  const salaries = _.pluck(salaryDataset, "salary");
  const salariesSum = salaries.reduce((a, b) => a + b, 0);
  const meanSalary = salariesSum / salaries.length;
  const minSalary = Math.min(...salaries);
  const maxSalary = Math.max(...salaries);

  return {
    mean: meanSalary,
    min: minSalary,
    max: maxSalary,
  };
};
