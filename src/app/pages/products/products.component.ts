import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { tap } from 'rxjs/operators';
import { Product } from './interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Product[];

  constructor(private productsSvc: ProductsService) { }

  ngOnInit(): void {
    this.productsSvc.getProducts()
      .pipe(
        tap((products: Product[]) => this.products = products)
        )
      .subscribe()
  }

addToCartClick(product:Product):void{
  console.log('Add to cart',product);
}

}
