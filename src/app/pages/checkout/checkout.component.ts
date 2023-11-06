import { Component } from '@angular/core';
import { DataService } from '../products/services/data.service';
import { switchMap, tap } from 'rxjs';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { NgForm } from '@angular/forms';
import { Details, Order } from 'src/app/shared/interfaces/order.interfece';
import { Product } from '../products/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/components/header/services/shopping-cart.service';

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

  isDelivery = false;
  cart: Product[] = [];
  stores: Store[] = []

  constructor(private dataSvc: DataService, private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void {
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurretnDay(),
      pickup: this.isDelivery
    }
    this.dataSvc.saveOrder(data).pipe(
      tap(res => console.log('Order ->', res)),
      switchMap((order) => {
        const orderId = order.id;
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailsOrder({ details, orderId });
      }),
      tap(res => console.log('Finish ->', res)),
    )
      .subscribe()
  }

  private getStores(): void {
    this.dataSvc.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }

  private getCurretnDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      const { id: productId, name: productName, qty: quantity, stock } = product;
      details.push({ productId, productName, quantity });
    })
    return details;
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products)
      )
      .subscribe()

  }
}
