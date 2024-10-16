
export interface NotificationResponseDTO {
  id: string;
  date: Date;
  actionName: string;
  receiverId: string;
  seen: boolean;
}

export interface NotificationDTO {
  id: string;
  notification_data_id: string;
  receiverId: string;
  seen: boolean;
}


export interface ActionsDTO {
  id: string;
  name: string;
}

export interface NotificationDataDTO {
  id: string;
  action_id: string;
  date: Date;
  entityType: EntityType;
}

export enum EntityType {
  Admin = 'Admin',
  Manager = 'Manager',
  User = 'User'
}
