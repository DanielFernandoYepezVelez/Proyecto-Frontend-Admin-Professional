import { Component, OnInit } from '@angular/core';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/auth/models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
})
export class HospitalsComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public cargando: boolean;

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals() {
    this.cargando = true;

    this.hospitalService.getAllHospitals().subscribe((hospitals) => {
      console.log(hospitals);

      this.cargando = false;
      this.hospitales = hospitals;

      console.log(this.hospitales);
    });
  }
}
