import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-alistamiento',
  templateUrl: './alistamiento.page.html',
  styleUrls: ['./alistamiento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlistamientoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
