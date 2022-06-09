import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

  readonly users = ['Dulanga', 'Sasitha', 'Thanura', 'Loshi', 'Thilina', 'Admin', 'Lahiru',
    'Chamma', 'Sajith', 'Kawwa', 'Shakya', 'Thakshila', 'Bashi', 'Hashadhi'];
  principal: string| null = null;

  constructor() {
  }

  login(name: string): boolean{
    if (this.users.includes(name)){
      this.principal = name;
      return true;
    }else{
      this.principal = null;
      return false;
    }
  }

  getPrincipal(): string | null {
    return this.principal;
  }

}
