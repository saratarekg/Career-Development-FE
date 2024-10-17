import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NotificationService} from './notification.service';
import {ActionsDTO, EntityType, NotificationDataDTO, NotificationDTO} from '../../models/notificationsDTO';
import {environment} from '../../../environment';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  const mockAction: ActionsDTO = {
    id: '1',
    name: 'Action Name',
  };

  const mockNotificationData: NotificationDataDTO = {
    id: '1',
    action_id: '1',
    date: new Date('2024-10-01'),
    entityType: EntityType.User,
  };

  const mockNotification: NotificationDTO = {
    id: '1',
    notification_data_id: '1',
    receiverId: '123',
    seen: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService],
    });

    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get action by ID', () => {
    const actionId = '1';
    service.getActionById(actionId).subscribe((action) => {
      expect(action).toEqual(mockAction);
    });

    const req = httpMock.expectOne(`${environment.actionsAPI}/${actionId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAction);
  });

  it('should get notification data by ID', () => {
    const notificationDataId = '1';
    service.getNotificationData(notificationDataId).subscribe((data) => {
      expect(data).toEqual(mockNotificationData);
    });

    const req = httpMock.expectOne(`${environment.notificationsDataAPI}/${notificationDataId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNotificationData);
  });

  it('should get all notifications for a user', () => {
    const userId = '123';
    const mockNotifications: NotificationDTO[] = [mockNotification];

    service.getAllNotifications(userId).subscribe((notifications) => {
      expect(notifications).toEqual(mockNotifications);
    });

    const req = httpMock.expectOne(`${environment.notificationsAPI}/all/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNotifications);
  });

  it('should mark a notification as seen', () => {
    const notificationId = '1';
    service.markAsSeen(notificationId).subscribe((response) => {
      expect(response).toBe('Notification marked as seen');
    });

    const req = httpMock.expectOne(`${environment.notificationsAPI}/markAsSeen/${notificationId}`);
    expect(req.request.method).toBe('POST');
    req.flush('Notification marked as seen');
  });
});
