import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '@/constants'
import type { ProductItem, TransformProductItem } from '@/types'
import { parseLoadedProducts } from '@/helpers'

export const productApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: API.BASE_URL }),
  endpoints: build => ({
    getAllProducts: build.query<TransformProductItem[], number>({
      query: (limit: number = 5) => ({
        url: '/products',
        method: 'GET',
        params: {
          limit: limit,
        },
      }),
      transformResponse: (response: ProductItem[]) => {
        return parseLoadedProducts(response) as TransformProductItem[]
      },
    }),
    getProduct: build.query({
      query: (id: string | undefined) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ProductItem) => {
        return parseLoadedProducts(response) as TransformProductItem
      },
    }),
  }),
})

export const { useGetAllProductsQuery, useGetProductQuery } = productApi
