import { Component, EventEmitter } from '@angular/core';
import { AjaxService } from './ajax.service';
import { SearchPipe } from './search.pipe';
import { MaterializeAction } from 'angular2-materialize';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  allPatients = new Array();
  searchKey: string = "";
  constructor(private ajax: AjaxService) {
    this.ajax.getMethod("/").subscribe(
      (data) => this.gotPatients(data),
      err => this.error(err)
    )
  }
  modalActions = new EventEmitter<string | MaterializeAction>();
  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
  gotPatients(data) {
    if (data.status == 200) {
      this.allPatients = data.patient;
    } else {

    }
  }
  validatePhone(phone) {
    var reg = /^\d{10}$/;
    if (phone.match(reg)) {
      return true;
    }
    else {
      return false;
    }
  }

  validateAge(age){
    var reg = /^[0-9]*$/;///^[0-9]*$
    if (age.match(reg) && parseInt(age) < 100 && parseInt(age) > 1) {
      return true;
    }
    else {
      return false;
    }
  }
  error(err) {

  }
  addPatient() {
    this.openModal();
  }
  add(fname, lname, age, dob, gender, phone, free) {
    // console.log(fname, lname, age, dob, gender, phone, free);
    var sdate = moment(dob, 'DD/MM/YYYY', true).format();//moment(dob).format("DD/MM/YYYY");
    if (fname == "" || age == '' || dob == '' || phone == '') {
      this.modalActions.emit({ action: "toast", params: ['Please fill all the fields before submitting', 4000] });
    } else if (!this.validateAge(age)){
      this.modalActions.emit({ action: "toast", params: ['Please enter a valid age', 4000] });
    } else if (sdate == "Invalid date") {
      this.modalActions.emit({ action: "toast", params: ['Please enter valid date', 4000] });
    } else if (!this.validatePhone(phone)) {
      this.modalActions.emit({ action: "toast", params: ['Please enter 10 digit valid phone number', 4000] });
    } else {
      var json = '{\
                "first_name": "'+ fname + '",\
                "last_name": "'+ lname + '",\
                "age": "'+ age + '",\
                "dob": "'+ dob + '",\
                "gender": "'+ gender + '",\
                "phone": "'+ phone + '",\
                "free_text": "'+ free
        + '"\
              }';
      this.ajax.postMethod('/create', json).subscribe(
        (data) => this.patientAdded(data),
        (err) => console.log(err)
      );
    }
  }
  patientAdded(data) {
    if (data.status == 200) {
      this.closeModal();
      this.allPatients.push(data.patient);
      this.modalActions.emit({ action: "toast", params: ['Patient Successfully Added.', 4000] });

    } else {
      this.modalActions.emit({ action: "toast", params: ['Something went wrong. PLease try again later.', 4000] });
    }
  }
  deletePatient(id, i) {
    this.ajax.deleteMethod("/" + id).subscribe(
      (data) => this.patientDeleted(data, i),
      (err) => console.log(err)
    )
  }

  patientDeleted(data, i) {
    if (data.status == 200) {
      this.modalActions.emit({ action: "toast", params: ['Patient Deleted.', 4000] });
      this.allPatients.splice(i, 1);
      this.searchKey = "";
    } else {
      this.modalActions.emit({ action: "toast", params: ['Could not delete patient. Please try again later', 4000] });
    }
  }
}
