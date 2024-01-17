import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent {
  protected get basketItems() {
    return this.basketService.items;
  }

  protected customer: Customer = { name: '', address: '', creditCard: '' };

  constructor(
    private basketService: BasketService,
    private router: Router,
  ) {
    this.basketService.fetch().subscribe();
  }

  protected get basketTotal(): number {
    return this.basketService.total;
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.customer).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
