import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs';

@Injectable()
export class NotificationsService {
  constructor(private readonly httpService: HttpService) { }
  public async sendAll() {

    return 0;
  }
  public async send(to,body,title,subtitle) {
    var axios = require('axios');
    // "cHARET4zTli0V8iZj5DLfp:APA91bGNGl14Hcb-icWQlWRENREwhoJ-6e6c1nWNUCQv3l_LDSUpdoZIbPofqqjLAoN5y1vwBu448VduuNhvLlU00YMjmjMn5Wj0X5uwpvs9TGcwPwG3xDz6_qGap73KF2sNVnRcTQzd"
    var data = JSON.stringify({
      "registration_ids":to,
      "notification": {
        "body": `${body} ${subtitle}`,
        "title": title
      }
    });
    
    var config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: { 
        'Authorization': 'key=AAAABrSqXSk:APA91bHBGFl297z9sTefJlpNvcA31i7R4-pO8mTHARayXxIqByFar13pb0kV2Zqc0DQv5dhhKIU0awDI64qzxAnWIRvI6VXB8odn69HOWcWZ10VNK3NV5wrrEWJQcPBdHWN3uWnpuUff', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  public async send2(to,body,title,subtitle) {
    const axios = require('axios');
    var data = {
      //"cHARET4zTli0V8iZj5DLfp:APA91bGNGl14Hcb-icWQlWRENREwhoJ-6e6c1nWNUCQv3l_LDSUpdoZIbPofqqjLAoN5y1vwBu448VduuNhvLlU00YMjmjMn5Wj0X5uwpvs9TGcwPwG3xDz6_qGap73KF2sNVnRcTQzd"
      "to": to,
      "notification": {
        "body": body,
        "title": title,
        "subtitle": subtitle
      }
    };
    
    var config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: { 
        'Authorization': 'key=AAAABrSqXSk:APA91bHBGFl297z9sTefJlpNvcA31i7R4-pO8mTHARayXxIqByFar13pb0kV2Zqc0DQv5dhhKIU0awDI64qzxAnWIRvI6VXB8odn69HOWcWZ10VNK3NV5wrrEWJQcPBdHWN3uWnpuUff', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    return this.httpService.post("https://fcm.googleapis.com/fcm/send", data,config).pipe(
      map((response) => {
        console.log(response.data);
        
        return response.data;
      }),
    )
  }
}