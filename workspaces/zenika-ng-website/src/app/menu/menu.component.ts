import { Component } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  protected get numberOfBasketItems() {
    return this.basketService.numberOfItems;
  }

  constructor(private basketService: BasketService) {}
}
