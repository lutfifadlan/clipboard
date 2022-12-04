import _ from "underscore";
import {
  ISalaryDataset,
  IDepartmentAndSubDepartmentSalaryDataset,
} from "../interfaces/salary-dataset.interface";
import {
  IDepartmentSalarySummaryStats,
  IDepartmentAndSubDepartmentSalarySummaryStats,
} from "../interfaces/summary-stats.interface";

export const calculateSummaryStats = (salaryDataset: ISalaryDataset[]) => {
  if (salaryDataset.length === 0) {
    return null;
  }

  const salaries = _.pluck(salaryDataset, "salary");
  const salariesSum = salaries.reduce((a, b) => a + b, 0);
  const meanSalary = Math.round(salariesSum / salaries.length);
  const minSalary = Math.min(...salaries);
  const maxSalary = Math.max(...salaries);

  return {
    mean: meanSalary,
    min: minSalary,
    max: maxSalary,
  };
};

export const calculateDepartmentSalarySummaryStats = (
  salaryDataset: ISalaryDataset[]
) => {
  if (salaryDataset.length === 0) {
    return null;
  }

  const departmentSalaries = _.groupBy(salaryDataset, "department");

  const summaryStats: IDepartmentSalarySummaryStats = {};

  for (const [key, values] of Object.entries(departmentSalaries)) {
    const salaries = _.pluck(values, "salary");
    const salariesSum = salaries.reduce((a, b) => a + b, 0);
    const meanSalary = Math.round(salariesSum / salaries.length);
    const minSalary = Math.min(...salaries);
    const maxSalary = Math.max(...salaries);

    summaryStats[key] = {
      mean: meanSalary,
      min: minSalary,
      max: maxSalary,
    };
  }

  return summaryStats;
};

export const calculateDepartmentAndSubDepartmentSalarySummaryStats = (
  salaryDataset: ISalaryDataset[]
) => {
  if (salaryDataset.length === 0) {
    return null;
  }

  const departmentSalaries = _.groupBy(salaryDataset, "department");

  const departmentAndSubDepartmentSalaries: IDepartmentAndSubDepartmentSalaryDataset =
    {};

  for (const [key, values] of Object.entries(departmentSalaries)) {
    for (const value of values) {
      if (!departmentAndSubDepartmentSalaries[key]) {
        departmentAndSubDepartmentSalaries[key] = {};
        departmentAndSubDepartmentSalaries[key][value.sub_department] = [value];
      } else {
        if (!departmentAndSubDepartmentSalaries[key][value.sub_department]) {
          departmentAndSubDepartmentSalaries[key][value.sub_department] = [
            value,
          ];
        } else {
          departmentAndSubDepartmentSalaries[key][value.sub_department].push(
            value
          );
        }
      }
    }
  }

  const summaryStats: IDepartmentAndSubDepartmentSalarySummaryStats = {};

  for (const [key, value] of Object.entries(
    departmentAndSubDepartmentSalaries
  )) {
    let i = 0;

    for (const subDepartment of Object.keys(value)) {
      const salaries = _.pluck(Object.values(value)[i], "salary");
      const salariesSum = salaries.reduce((a, b) => a + b, 0);
      const meanSalary = Math.round(salariesSum / salaries.length);
      const minSalary = Math.min(...salaries);
      const maxSalary = Math.max(...salaries);

      if (!summaryStats[key]) {
        summaryStats[key] = {};
      }

      summaryStats[key][subDepartment] = {
        mean: meanSalary,
        min: minSalary,
        max: maxSalary,
      };

      i++;
    }
  }

  return summaryStats;
};
