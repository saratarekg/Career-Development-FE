import {ApprovalStatus} from "../enums/approval-status.enum";

export interface ArticleDTO {
  id: string;
  title: string;
  author: string;
  submissionDate: Date;
  approvalStatus: ApprovalStatus;
  comment: string;
  document: string;
}
