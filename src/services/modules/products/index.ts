import { api } from '../../api';

export type Products = {
  id: number;
  colour: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
};

export const productsApi = api.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<Products, any>({
      query: url => `/products/${url}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productsApi;
