import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private location:Location){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  goBack(): void {
    this.location.back();
  }
}
