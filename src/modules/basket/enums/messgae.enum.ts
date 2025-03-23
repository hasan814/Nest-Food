export enum BasketMessage {
  USER_NOT_FOUND = 'User not found or invalid user ID',
  FOOD_NOT_FOUND = 'Food not found',
  BASKET_ITEM_NOT_FOUND = 'Basket item not found',
  DISCOUNT_NOT_FOUND_OR_INACTIVE = 'Discount not found or inactive',
  DISCOUNT_LIMIT_REACHED = 'Discount usage limit reached',
  DISCOUNT_EXPIRED = 'Discount has expired',
  DISCOUNT_ALREADY_USED = 'Discount already applied to basket',
  SUPPLIER_DISCOUNT_CONFLICT = 'Another discount from this supplier already exists',
  SUPPLIER_HAS_NO_ITEMS = 'Basket has no items from this supplier',
  EMPTY_BASKET = 'Basket is empty',
  DISCOUNT_NOT_FOUND_IN_BASKET = 'Discount not found in basket',
}
