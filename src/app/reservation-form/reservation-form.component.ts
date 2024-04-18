import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{
  
  reservationForm: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate:['', Validators.required],
      checkOutDate:['', Validators.required],
      guestName:['', Validators.required],
      guestEmail:['', [Validators.required, Validators.email]],
      roomNumber:['', Validators.required],
    })

    //var that that contains the parameters attached to the current route/ url(here: the id)
    let id = this.activatedRoute.snapshot.paramMap.get('id')

    //if there is an id, get the reservation associated with it, and fill the form with it
    if(id){
      let reservation = this.reservationService.getReservation(id).subscribe(reservation => {
        if(reservation){
          this.reservationForm.patchValue(reservation)
        }
      })
    }
  }

  onSubmit(){
    if(this.reservationForm.valid){
      //var that contains the reservation form that we want to save (the one we just made)
      let reservation: Reservation= this.reservationForm.value

      //var that that contains the parameters attached to the current route/ url(here: the id)
      let id = this.activatedRoute.snapshot.paramMap.get('id')

      //if there is an id, update the form else create a new form
      if(id){
        //update
        this.reservationService.updateReservation(id, reservation).subscribe(() =>
        console.log("Update request processed"))
      }else{
        //call method to add a reservation
        this.reservationService.addReservation(reservation).subscribe(() =>
        console.log("Create request processed"))
      }

      //redirect to list page
      this.router.navigate(['/list'])
    }
  }
  
}
