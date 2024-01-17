import { Component, Inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { BasketItem } from '../basket/basket.types';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  protected products: Product[] = [];

 

  constructor(
    @Inject('WELCOME_MSG') protected welcomeMsg: string,
    private apiService: ApiService,
    private basketService: BasketService,
  ) {
    this.apiService.getProducts().subscribe((products) => (this.products = products));
    

    this.basketService.fetch().subscribe();
  }

  protected get basketTotal(): number {
    return this.basketService.total;
  }

  protected addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe((basketItem) => {
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    product.stock -= 1;
  }

  protected isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  protected get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }
}
