import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-empaque',
  templateUrl: './empaque.page.html',
  styleUrls: ['./empaque.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EmpaquePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
