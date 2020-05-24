export const addItemCart = (cartItems, cartItemToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingItem) {
    // Use map to return a new array and update the quantity of existing item
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // If item is not present in cart add it to the cart
  // with an quantity key
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
