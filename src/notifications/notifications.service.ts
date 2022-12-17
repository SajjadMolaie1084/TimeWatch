import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs';
// import { initializeApp, cert } from 'firebase-admin/app';

@Injectable()
export class NotificationsService {
  constructor(private readonly httpService: HttpService) { }
  public async sendAll() {

    return 0;
  }
  public async send(to, body, title, subtitle) {
    var axios = require('axios');
    // "cHARET4zTli0V8iZj5DLfp:APA91bGNGl14Hcb-icWQlWRENREwhoJ-6e6c1nWNUCQv3l_LDSUpdoZIbPofqqjLAoN5y1vwBu448VduuNhvLlU00YMjmjMn5Wj0X5uwpvs9TGcwPwG3xDz6_qGap73KF2sNVnRcTQzd"
    var data = JSON.stringify({
      "registration_ids": to,
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
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  public async send2(to, body, title, subtitle) {
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
      data: data
    };
    return this.httpService.post("https://fcm.googleapis.com/fcm/send", data, config).pipe(
      map((response) => {
        console.log(response.data);

        return response.data;
      }),
    )
  }
  public async send2a(to:string[], body, title, subtitle) {
    if (to.length==0) {
      return 0;
    }
    var admin = require("firebase-admin");
    var config = {
      "type": "service_account",
      "project_id": "karteam-aa9e5",
      "private_key_id": "59976221d5c06abf0efea28ef1f7bc5f2a9a82ba",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCrhhqxIlT2zjLg\nOPkI4/c5l1oFYWMWPv02WlpQYXCJxgD77ZuSEVztguUba520dTjkJB3ICnFnoxfq\nnsm+M2A6+caZLoArYlbXRCZhQ0UsY4tXq3NqGDA2KQCpbWb3N4D7DVJUrEDH5uze\nXFWCc0fLnGYkwcO+kxG0qhRZzSn1hJCCmbvYaZMPzlBTC0ExSvLXiq4X+YPDxBg+\naAUczSpxMrGxaZKGvFqTGu2Pp8ru9xhgpSuosPA8KFc2rnvLg0VW0CiaxhZ52Voe\nOJ/vLCXjshedMt+cGCSlkjako3bsT9ZAzNnJJ90ajRbyTq0bJRvwFBB1/L6wrA3R\n34NLeWtlAgMBAAECggEASKapwaOIF23pcL3RBeoBOnyYHbVNUgvmFtKYdHmBQGoE\n2rCe93SxRsztm/quNtR7/24oyyVZOYuEQtV1IEIEnZZUf2eJ1FZ38AAmvYXP0+hq\nCf1OCn8qVJZzeFAlj8sLr8rJt6GqYsG2TM0RTwrjOyQIw8Lq1VrX4g00R4E2J46I\nKO+wAARYjuAUtVDh81X6zUTkkLHEQsbIHb3MOTmADQ1zwC+3QOEYGKxK0/87khjD\nTMgJJb+6q/JFpBxI52SSvazB0T9smNo1A/PtdVDVmxRBb8+NBN3ujh0wkglP+6Vh\nEp1YICZn5rKDviQZhxrbbVo15cqSvTuWaP9TobxTdQKBgQDcDFgV6M7eU04wfe5h\n5lrHEOUULOQMPmSiW2n/DSJVRLgrHD4PFIwyRX8c2JfF0KL/jb7tU6ZoF7mffElV\ntJvJWn06Ynw/Ud2i5Zy+z/LNl8VLcgzcTFwoDvilG6G/817Iq3tx0tk/QdscXeuH\npts3Bi+xNPHo0cIpVJMek3f32wKBgQDHjDKSByLiq5S9aLyiwYcLpLY9W8kk4n+l\npy17S0XuAQ5CLO1ABqmyjkoxo1qmehPS1M4n2bHkndy3D4H+7PUFdY4KYBSE2F6Z\nBE9lRjs6GpGhiJaZe4NBvtIFTL/sUsy6saK4j1YAzNKHfUTDGOSL0NH2Us8ppbbe\nhGufkxItvwKBgDDpEX81Mx4ZuCxxIVZjZFQQ/kogvEO4bpfj58iIO9RmJOV4Lpcd\ngxf9eIaJ4hpXCJPzBrgrurYyZ9D6SDajoWj9Ew6yK1nLsY7uqIuFHzvxeyoM3Kzu\n0CEbSsswPCC1UKEb9KFVM3KrCa/hdGO/g8RUPK+PzCFq1lRndxf5wVW3AoGAMXW6\ngx9psi09LMVtHBpD0sr8sLCzZoUNho2tZEYAC0IPuq9QDvKX1T4Xfb4zldfkWfmN\nL6txwGywbF9XpUwuXzAICOJPs629pMfAtiV2QKydNCCa02gd3InjnJStbXIIdK3a\n20wL0R7zf8m45XKiE1Wq9RcJahU9AmJoGqFlfBkCgYBxDYMd27aBHQ7OEYAWTlKv\n0vzJPXi57gATovEio619cK9+krYcTdpChdVdrOdwvI5HVfDdanumzJPwdTmSHDtW\nLSL09XP3JY/lKp7ABJdBwl3dlHOGQXa6bs+Rktj+ZAvKIJjJIDQnmrLQ24nD2+Zu\nW4gmr9MvfgHR+ulRvm5kJA==\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-vqzh1@karteam-aa9e5.iam.gserviceaccount.com",
      "client_id": "118075836237910348397",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vqzh1%40karteam-aa9e5.iam.gserviceaccount.com"
    }
    // const serviceAccount = require("karteam-aa9e5-firebase-adminsdk-vqzh1-59976221d5.json");
    try {
      admin.initializeApp({
        credential: admin.credential.cert(config),
        databaseURL: "https://sample-project-e1a84.firebaseio.com"
      });
    } catch (error) {

    }


    const message = {
      notification: {
        body: `${body} ${subtitle}`,
        title: title
      },
      tokens: to,
    };

    admin.messaging().sendMulticast(message)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  public async send3(to, body, title, subtitle) {
    var FCM = require('fcm-node');
    var serverKey = 'AAAABrSqXSk:APA91bHBGFl297z9sTefJlpNvcA31i7R4-pO8mTHARayXxIqByFar13pb0kV2Zqc0DQv5dhhKIU0awDI64qzxAnWIRvI6VXB8odn69HOWcWZ10VNK3NV5wrrEWJQcPBdHWN3uWnpuUff'; //put your server key here
    var fcm = new FCM(serverKey);

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: 'e4h2lEDcTiaPXTUSlGdSRP:APA91bHPG1mXDr73vmEQo6eGiui-Ux72_zIQQKMVPFyWOqhbWwVJbbNnzgVTf2G_iRLkfPx-Bf83EYNS316Aj5Awm26EGcVuaE0LND2Oubsnga45tJbR0yAOUpVxOx8_HlLTfkJzvDky',
      collapse_key: 'your_collapse_key',

      notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
      },

      data: {  //you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
      }
    };

    fcm.send(message, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
  }
  public async send4(to, body, title, subtitle) {
    var FCM = require('fcm-node');
    // var serverKey = require('karteam-aa9e5-firebase-adminsdk-vqzh1-59976221d5.json') //put the generated private key path here    
    var config = {
      "type": "service_account",
      "project_id": "karteam-aa9e5",
      "private_key_id": "59976221d5c06abf0efea28ef1f7bc5f2a9a82ba",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCrhhqxIlT2zjLg\nOPkI4/c5l1oFYWMWPv02WlpQYXCJxgD77ZuSEVztguUba520dTjkJB3ICnFnoxfq\nnsm+M2A6+caZLoArYlbXRCZhQ0UsY4tXq3NqGDA2KQCpbWb3N4D7DVJUrEDH5uze\nXFWCc0fLnGYkwcO+kxG0qhRZzSn1hJCCmbvYaZMPzlBTC0ExSvLXiq4X+YPDxBg+\naAUczSpxMrGxaZKGvFqTGu2Pp8ru9xhgpSuosPA8KFc2rnvLg0VW0CiaxhZ52Voe\nOJ/vLCXjshedMt+cGCSlkjako3bsT9ZAzNnJJ90ajRbyTq0bJRvwFBB1/L6wrA3R\n34NLeWtlAgMBAAECggEASKapwaOIF23pcL3RBeoBOnyYHbVNUgvmFtKYdHmBQGoE\n2rCe93SxRsztm/quNtR7/24oyyVZOYuEQtV1IEIEnZZUf2eJ1FZ38AAmvYXP0+hq\nCf1OCn8qVJZzeFAlj8sLr8rJt6GqYsG2TM0RTwrjOyQIw8Lq1VrX4g00R4E2J46I\nKO+wAARYjuAUtVDh81X6zUTkkLHEQsbIHb3MOTmADQ1zwC+3QOEYGKxK0/87khjD\nTMgJJb+6q/JFpBxI52SSvazB0T9smNo1A/PtdVDVmxRBb8+NBN3ujh0wkglP+6Vh\nEp1YICZn5rKDviQZhxrbbVo15cqSvTuWaP9TobxTdQKBgQDcDFgV6M7eU04wfe5h\n5lrHEOUULOQMPmSiW2n/DSJVRLgrHD4PFIwyRX8c2JfF0KL/jb7tU6ZoF7mffElV\ntJvJWn06Ynw/Ud2i5Zy+z/LNl8VLcgzcTFwoDvilG6G/817Iq3tx0tk/QdscXeuH\npts3Bi+xNPHo0cIpVJMek3f32wKBgQDHjDKSByLiq5S9aLyiwYcLpLY9W8kk4n+l\npy17S0XuAQ5CLO1ABqmyjkoxo1qmehPS1M4n2bHkndy3D4H+7PUFdY4KYBSE2F6Z\nBE9lRjs6GpGhiJaZe4NBvtIFTL/sUsy6saK4j1YAzNKHfUTDGOSL0NH2Us8ppbbe\nhGufkxItvwKBgDDpEX81Mx4ZuCxxIVZjZFQQ/kogvEO4bpfj58iIO9RmJOV4Lpcd\ngxf9eIaJ4hpXCJPzBrgrurYyZ9D6SDajoWj9Ew6yK1nLsY7uqIuFHzvxeyoM3Kzu\n0CEbSsswPCC1UKEb9KFVM3KrCa/hdGO/g8RUPK+PzCFq1lRndxf5wVW3AoGAMXW6\ngx9psi09LMVtHBpD0sr8sLCzZoUNho2tZEYAC0IPuq9QDvKX1T4Xfb4zldfkWfmN\nL6txwGywbF9XpUwuXzAICOJPs629pMfAtiV2QKydNCCa02gd3InjnJStbXIIdK3a\n20wL0R7zf8m45XKiE1Wq9RcJahU9AmJoGqFlfBkCgYBxDYMd27aBHQ7OEYAWTlKv\n0vzJPXi57gATovEio619cK9+krYcTdpChdVdrOdwvI5HVfDdanumzJPwdTmSHDtW\nLSL09XP3JY/lKp7ABJdBwl3dlHOGQXa6bs+Rktj+ZAvKIJjJIDQnmrLQ24nD2+Zu\nW4gmr9MvfgHR+ulRvm5kJA==\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-vqzh1@karteam-aa9e5.iam.gserviceaccount.com",
      "client_id": "118075836237910348397",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vqzh1%40karteam-aa9e5.iam.gserviceaccount.com"
    }
    var fcm = new FCM(config)

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: 'cSWPqs7GQAmTXm2ZVMnUoI:APA91bF_pazBwXLdDWKGwMNX6UKvEORR7bfLS3jOKdt8AGi2spnKhHVUrjF0oI8IeGEYvLUS5l7Ndeuzl4AZwq_JAfXaABC0ouc_4oXOlAkvzyJpp2xuRI4YLucVhiN6SzAx_9hUoRyh',
      collapse_key: 'your_collapse_key',
      notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
      },
      data: {  //you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
      }
    };

    fcm.send(message, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
  }
}