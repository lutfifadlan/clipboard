export interface ISalaryDataset {
  name: string;
  salary: number;
  currency: string;
  department: string;
  on_contract?: boolean;
  sub_department: string;
}

export interface IFormattedSalaryDataset {
  [key: string]: string;
}

export interface IDepartmentAndSubDepartmentSalaryDataset {
  [key: string]: {
    [key: string]: ISalaryDataset[];
  };
}
