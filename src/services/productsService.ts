import { API } from '@/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ProductItem } from '@/types'

export const productApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: API.BASE_URL }),
  endpoints: build => ({
    getAllProducts: build.query<ProductItem[], number>({
      query: (limit: number = 5) => ({
        url: '/products',
        method: 'GET',
        params: {
          limit: limit,
        },
      }),
    }),
    getProduct: build.query({
      query: (id: number) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllProductsQuery, useGetProductQuery } = productApi
