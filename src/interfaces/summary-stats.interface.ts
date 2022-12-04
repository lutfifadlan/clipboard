export interface IDepartmentSalarySummaryStats {
  [key: string]: {
    mean: number;
    min: number;
    max: number;
  };
}

export interface IDepartmentAndSubDepartmentSalarySummaryStats {
  [key: string]: {
    [key: string]: {
      mean: number;
      min: number;
      max: number;
    };
  };
}
