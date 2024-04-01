import React, { useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  addItemToCart,
  removeItemFromCart,
  updateItemFromCart,
} from '../../store/cart';

interface Product {
  id: number;
  colour: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const { cartItems } = useSelector(
    (state: { cart: { cartItems: Product[] } }) => state.cart,
  );
  const dispatch = useDispatch();

  // total price of the items inside the cart
  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum: number, item: Product) => item.price * item.quantity + sum,
        0,
      ),
    [cartItems],
  );

  // On Add items into cart
  const onAddToCart = useCallback((item: Product) => {
    dispatch(addItemToCart({ item }));
    Toast.show('Item is added in the cart.', Toast.SHORT);
  }, []);

  // On remove items from cart
  const onRemoveFromCart = useCallback((item: Product) => {
    dispatch(removeItemFromCart({ item }));
    Toast.show('Item is removed from the cart.', Toast.SHORT);
  }, []);

  // On update quantity of the item from the cart
  const onUpdateQuantity = useCallback((item: Product) => {
    dispatch(updateItemFromCart({ item }));
  }, []);

  // ListItem component for cart
  const Item = useCallback(
    ({ item }: { item: Product }) => {
      const isInCart = cartItems?.find(
        (cartItem: Product) => cartItem?.id === item.id,
      );
      return (
        <View style={styles.card}>
          <View style={styles.row}>
            <FastImage
              source={{ uri: item.img }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.content}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                {item.name}
              </Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>

          {isInCart ? (
            <View style={styles.cartActions}>
              <Button icon="delete" onPress={() => onRemoveFromCart(item)}>
                <></>
              </Button>
              <Button
                testID={`plus-${item.id}`}
                icon="plus"
                onPress={() =>
                  onUpdateQuantity({
                    ...item,
                    quantity: isInCart.quantity + 1,
                  })
                }
              >
                <></>
              </Button>
              <Text testID={`quantity-${item.id}`}>{isInCart.quantity}</Text>
              <Button
                testID={`minus-${item.id}`}
                disabled={isInCart.quantity <= 1}
                icon="minus"
                onPress={() =>
                  onUpdateQuantity({
                    ...item,
                    quantity: isInCart.quantity - 1,
                  })
                }
              >
                <></>
              </Button>
            </View>
          ) : (
            <Button onPress={() => onAddToCart(item)} mode="contained">
              Add to Cart
            </Button>
          )}
        </View>
      );
    },
    [cartItems],
  );

  // Empty state of the List
  const ListEmptyComponent = useCallback(
    () => (
      <View style={styles.centerAlign}>
        <Text>Cart is Empty</Text>
      </View>
    ),
    [],
  );

  // FlatList is not much efficient, recommend to use recyclerview
  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item: Product) => item.id.toString()}
        style={styles.list}
        ListEmptyComponent={ListEmptyComponent}
      />
      <View style={styles.total}>
        <Text>Total is: {total}</Text>
      </View>
    </>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  total: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#181818',
  },
  list: {
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    paddingVertical: 16,
    backgroundColor: '#282828',
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    borderBottomWidth: 1,
  },
  image: {
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  content: {
    padding: 10,
    width: 200,
  },
  title: {
    fontSize: 12,
    width: 220,
  },
  price: {
    fontSize: 14,
    marginTop: 5,
  },
  cartActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  centerAlign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
