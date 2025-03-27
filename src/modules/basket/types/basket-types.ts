export type FoodItemsInBasket = {
  name: string,
  price: number,
  count: number,
  image?: string,
  foodId: number,
  supplierId: number,
  description?: string,
  total_amount: number,
  supplierName?: string,
  discountCode?: string,
  payment_amount: number,
  supplierImage?: string,
  discount_amount: number,
}


export type BasketType = {
  foodList: FoodItemsInBasket[]
  total_amount: number,
  payment_amount: number,
  total_discount_amount: number,
}