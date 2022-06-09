import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name = "";
  invalid = false;
  @ViewChild("txtName")
  txtNameWrapper!: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService,
              private routerService: Router) {
  }

  ngOnInit(): void {
    if (this.userService.getPrincipal()){
      this.routerService.navigateByUrl('/dashboard');
    }
  }

  enter(): void{
    if (this.userService.login(this.name)){
      this.invalid = false;
      this.routerService.navigateByUrl('/dashboard');
    }else{
      this.invalid = true;
      this.txtNameWrapper.nativeElement.select();
      this.txtNameWrapper.nativeElement.focus();
    }
  }

}
