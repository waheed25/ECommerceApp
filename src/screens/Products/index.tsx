import React, { useCallback, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { MainStackProps } from '../../../@types/navigation';
import Toast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';
import { useGetProductsQuery } from '../../services/modules/products';

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

const Products = ({ navigation }: MainStackProps) => {
  const { cartItems } = useSelector(
    (state: { cart: { cartItems: Product[] } }) => state.cart,
  );
  // const navigation = useNavigation();
  const { colors } = useTheme();

  const CartHeaderButton = useCallback(() => {
    return (
      <Button icon="cart" onPress={() => navigation.navigate('Cart')}>
        {cartItems?.length > 0 ? cartItems.length : ''}
      </Button>
    );
  }, [cartItems]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: CartHeaderButton,
    });
  }, [cartItems]);

  const dispatch = useDispatch();

  const { data, isLoading, isFetching }: any = useGetProductsQuery('/products');

  const onAddToCart = useCallback((item: Product) => {
    dispatch(addItemToCart({ item }));
    Toast.show('Item is added in the cart.', Toast.SHORT);
  }, []);

  const onRemoveFromCart = useCallback((item: Product) => {
    dispatch(removeItemFromCart({ item }));
    Toast.show('Item is removed from the cart.', Toast.SHORT);
  }, []);

  const onUpdateQuantity = useCallback((item: Product) => {
    dispatch(updateItemFromCart({ item }));
  }, []);

  // ListItem component
  const Item = useCallback(
    ({ item }: { item: Product }) => {
      const isInCart = cartItems?.find(cartItem => cartItem?.id === item.id);
      return (
        <TouchableOpacity
          style={[styles.card]}
          testID={`cart-navigation-${item.id}`}
          onPress={() => navigation.navigate('Cart')}
        >
          {/* tweak resizeMode to see image in different dimensions */}
          <FastImage source={{ uri: item.img }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
          {isInCart ? (
            <View style={styles.cartActions}>
              <Button mode="contained" onPress={() => onRemoveFromCart(item)}>
                Remove from Cart
              </Button>
              <Button
                icon="plus"
                onPress={() =>
                  onUpdateQuantity({ ...item, quantity: isInCart.quantity + 1 })
                }
              >
                <></>
              </Button>
              <Text>{isInCart.quantity}</Text>
              <Button
                disabled={isInCart.quantity <= 1}
                icon="minus"
                onPress={() =>
                  onUpdateQuantity({ ...item, quantity: isInCart.quantity - 1 })
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
        </TouchableOpacity>
      );
    },
    [cartItems, colors, navigation],
  );

  // Loading state of the products
  if (isLoading || isFetching) {
    return (
      <View style={styles.centerAlign}>
        <ActivityIndicator testID="loading-indicator" />
      </View>
    );
  }

  // FlatList is not much efficient, recommend to use recyclerview
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={(item: Product) => item.id.toString()}
      style={styles.list}
    />
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#282828',
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    padding: 16,
  },
  image: {
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  centerAlign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
