import { Component } from '@angular/core';
import { DataService } from '../products/services/data.service';
import { tap } from 'rxjs';
import { Store } from 'src/app/shared/interfaces/stores.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  };

  stores: Store[] = [

  ]

  constructor(private dataSvc: DataService) {

  }

  ngOnInit(): void {
    this.getStores();
  }

  onPickupOrDelivery(value: boolean): void {
    console.log(value);
  }

  onSubmit(): void {
    console.log('Guardar');
  }

  getStores(): void {
    this.dataSvc.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }
}
