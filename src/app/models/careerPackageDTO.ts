export interface CareerPackage {
  id: string;
  title: string;
  googleDocLink: string;
}

export interface RequestCareerPackage {
  title: string;
  googleDocLink: string;
}

export interface SubmittedCP {
  submissionId: string;
  careerPackageId: string;
  userId: string;
  managerId: string;
  title: string;
  googleDocLink: string;
  status: string;
}

export interface PaginatedCareerPackages {
  content: CareerPackage[];
  totalElements: number;
  totalPages: number;
  size: number;
}

export interface PaginatedSubmittedCP {
  content: SubmittedCP[];
  totalElements: number;
  totalPages: number;
  size: number;
}

export interface RequestSubmitCPDto {
  title: string;
  userId: string;
  googleDocLink: string;
}

export interface TitlePackage {
  [key: string]: [string, string];
}
