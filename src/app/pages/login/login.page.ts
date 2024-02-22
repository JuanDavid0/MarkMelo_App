import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiRestFullService } from 'src/app/services/api-rest-full.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule , SharedModule]
})
export class LoginPage implements OnInit {

  characters:any[] = [];
  params ={} as any;

  constructor(
    private apiRestFull : ApiRestFullService
  ) { }

  getUserLogin(){
    this.apiRestFull.getUserApi()
    .subscribe(
      (data)=>{console.log(this.params=data);},
      (error)=>{console.log(error);}
    )
    
  }

  ngOnInit() {
    this.params.page = 0;
    this.getUserLogin();
  }



}
