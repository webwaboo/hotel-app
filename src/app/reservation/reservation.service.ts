import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = []
  private apiUrl = "http://localhost:3000"

  /*constructor(){
    //this var is set to receive the data with corresponding keyword reservations
    let savedReservations = localStorage.getItem("reservations")
    //if savedReservations exist, get it and parse else create empty array
    this.reservations = savedReservations ? JSON.parse(savedReservations) : []
  }*/

  constructor(private http: HttpClient){}

  //get all the reservations
  getReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations")
  }

  //get reservation via id
  getReservation(id:string): Observable<Reservation>{
  return this.http.get<Reservation>(this.apiUrl + "/reservation/"+id)
  }

  //add one reservation to the array    
  addReservation(reservation: Reservation): Observable<void>{
    return this.http.post<void>(this.apiUrl + "/reservation", reservation)
      /*//create "unique" id...
      reservation.id = Date.now().toString()

      //add a reservation to the array
      this.reservations.push(reservation)
      
      //put the updated reservation in localStorage with keyword reservation as a JSON string
      //localStorage.setItem("reservations", JSON.stringify(this.reservations))
      console.log(this.reservations)*/
  }

  //delete a reservation via id
  deleteReservation(id: string): Observable<void>{
    return this.http.delete<void>(this.apiUrl + "/reservation/"+id)
    //put the updated reservation in localStorage with keyword reservation as a JSON string
    //localStorage.setItem("reservations", JSON.stringify(this.reservations))
  }

  //replace reservation with an updated reservation
  updateReservation(id: string, updatedReservation: Reservation): Observable<void>{
    return this.http.put<void>(this.apiUrl + "/reservation/" +id, updatedReservation)
    //put the updated reservation in localStorage with keyword reservation as a JSON string
    //localStorage.setItem("reservations", JSON.stringify(this.reservations))
  }
}
