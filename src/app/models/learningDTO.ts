import {ApprovalStatus} from "../enums/approval-status.enum";

export interface Learning {
  title: string;
  description: string;
  type: string;
  subject: string;
  typeName: string;
  baseScore: number;
  url: string;
  lengthInHours: number;
}

export interface LearningDTO {
  id: string
  title: string;
  learningTypeId: string;
  url: string;
  description: string;
  learningSubjectId: string;
  lengthInHours: number;
}

export interface LearningTypesDTO {
  id: string
  typeName: string;
  baseScore: number;
}

export interface LearningSubjectsDTO {
  id: string
  type: string;
  subject: string;
}



export interface SubmitUserLearningDTO {
  userId: string;
  learningId?: string | null; // Optional
  proof: string;
  proofTypeId: string;
  title: string;
  activeBoosterId?: string; // Optional
  learningTypeId?: string; // Optional
  URL: string;
  description: string;
  learningSubjectId: string;
  lengthInHours: number;
  date: Date;
  approvalStatus: ApprovalStatus;
  comment: string;
}


export interface ProofTypeDTO {
  id: string;
  name: string;
}


export interface BoostersDTO {
  id: string;
  name: string;
  type: string;
  value: number;
  isActive: boolean;

}


export interface UserLearningResponseDTO {
  title: string;
  URL: string;
  proof: string;
  proofTypeName: string;
  date: Date;
  approvalStatus: ApprovalStatus;
  comment: string;
  lengthInHours: number;
  baseScore: number;
}
