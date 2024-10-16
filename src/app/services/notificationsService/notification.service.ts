import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environment";
import {ActionsDTO, NotificationDataDTO, NotificationDTO} from "../../models/notificationsDTO";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private actionsAPI = environment.actionsAPI;
  private notificationsAPI= environment.notificationsAPI;
  private notificationsDataAPI = environment.notificationsDataAPI

  constructor(private http: HttpClient) {}

  getActionById(id: string): Observable<ActionsDTO> {
    return this.http.get<ActionsDTO>(`${this.actionsAPI}/${id}`, {
      withCredentials: true,
    });
  }

  getNotificationData(id: string): Observable<NotificationDataDTO> {
    return this.http.get<NotificationDataDTO>(`${this.notificationsDataAPI}/${id}`, {
      withCredentials: true,
    });
  }

  getAllNotifications(userId: string): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(`${this.notificationsAPI}/all/${userId}`, {
      withCredentials: true,
    });
  }

  markAsSeen(id: string): Observable<string> {
    return this.http.post<string>(`${this.notificationsAPI}/markAsSeen/${id}`, {
      withCredentials: true,
    });
  }
}
