import { strings } from '@/localization';

const userName = 'marina';
const pw = '123';
export class UserController {
  static login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === userName && password === pw) {
          resolve({ username });
        } else {
          reject(new Error(strings.login.invalidCredentials));
        }
      }, 250);
    });
  }

  static logout() {
    return new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
  }
}
