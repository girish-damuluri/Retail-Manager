import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { users } from '../user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { City } from '../City';
import { } from 'googlemaps';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  data = {};
  closeResult: string;
  display: boolean = false;
  users: users[];
  status: City[];
  addShop: FormGroup;
  submitted = false;

  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', { static: false }) addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;
  successMsg: string;

  constructor(private userData: UserServiceService, private fb: FormBuilder) {
    this.addShop = this.fb.group({
      ShopName: '',
      Category: '',
      Address: '',
      OwnerName: ''
    });


  }




  // convenience getter for easy access to form fields
  get f() { return this.addShop.controls; }

  ngOnInit() {
    this.loadShops();
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'IN' },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

  showDialog() {
    this.display = true;
  }
  loadShops() {
    this.userData.getShopsData().subscribe((result: any) => {
      this.users = result;
    });
  }
  addShops(type: string, message: string): void {
    let reqObj = {
      storeName: this.addShop.get('StoreName').value,
      category: this.addShop.get('Category').value,
      storeAddress: this.addShop.get('Address').value,
      ownerName: this.addShop.get('OwnerName').value
    };
    this.userData.addShops(reqObj).subscribe((result: any) => {
      if (result.status == 200) {
        this.successMsg = "Data Saved sucecssfully"
      }
    });
   
  }

  }




}
