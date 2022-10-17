import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import * as shell from 'shelljs';

@Injectable()
export class NotificationsService {
  public async sendAll(messages: firebase.messaging.TokenMessage[], dryRun?: boolean): Promise<BatchResponse> {
    // if (process.env.NODE_ENV === 'local') {
    //   for (const { notification, token } of messages) {
    //     shell.exec(
    //       `echo '{ "aps": { "alert": ${JSON.stringify(notification)}, "token": "${token}" } }' | xcrun simctl push booted com.company.appname -`,
    //     );
    //   }
    // }
    return firebase.messaging().sendAll(messages, dryRun);
  }
}