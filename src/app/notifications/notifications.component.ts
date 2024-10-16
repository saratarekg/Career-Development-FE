import { Component, OnInit } from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { NotificationService } from "../services/notificationsService/notification.service";
import {NotificationDTO, NotificationResponseDTO} from "../models/notificationsDTO";
import {MatMenuModule} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../services/auth.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-notification',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [
    NgForOf,
    MatIcon,
    NgIf,
    DatePipe,
    NgClass,
    MatMenuModule,
    MatButton,
    MatTooltip
  ],
  styleUrls: ['./notifications.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: NotificationResponseDTO[] = [];
  unseenCount = 0;
  userId: string = 'YOUR_USER_ID';

  constructor(private notificationService: NotificationService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe(userId => this.userId = userId!);

    this.userId = this.authService.getUserId()!;

    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getAllNotifications(this.userId).subscribe((notifications: NotificationDTO[]) => {
      this.notifications = [];
      this.unseenCount = 0;

      notifications.forEach(notification => {
        this.notificationService.getNotificationData(notification.notification_data_id).subscribe(notificationData => {
          this.notificationService.getActionById(notificationData.action_id).subscribe(action => {
            const notificationResponse: NotificationResponseDTO = {
              id: notification.id,
              date: notificationData.date,
              actionName: action.name,
              receiverId: notification.receiverId,
              seen: notification.seen
            };
            this.notifications.push(notificationResponse);

            if (!notification.seen) {
              this.unseenCount++;
            }
          });
        });
      });
    });
  }

  markAsSeen(notificationId: string): void {
    this.notificationService.markAsSeen(notificationId).subscribe(() => {
    });
  }

  markOneAsSeen(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (!notification!.seen) {
        this.markAsSeen(notification!.id);
        notification!.seen = true;
        this.unseenCount--;
      }
  }

  markAllAsSeen(): void {
    this.notifications.forEach(notification => {
      if (!notification.seen) {
        this.markAsSeen(notification.id);
        notification.seen = true;
        this.unseenCount--;
      }
    });
  }
}
