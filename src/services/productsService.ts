import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '@/constants/url'
import type { TransformProductItem } from '@/types'
import {
  parseLoadedAllProducts,
  parseLoadedSingleProduct,
  parseSearchProducts,
} from '@/helpers/responseTransform'

export const productApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: API.BASE_URL }),
  endpoints: build => ({
    getAllProducts: build.query<TransformProductItem[], number>({
      query: (limit: number = 5) => ({
        url: '/products',
        params: {
          limit: limit,
        },
      }),
      transformResponse: parseLoadedAllProducts,
    }),
    getProduct: build.query({
      query: (id: string | undefined) => ({
        url: `/products/${id}`,
      }),
      transformResponse: parseLoadedSingleProduct,
    }),
    searchProducts: build.query<TransformProductItem[], string>({
      query: () => ({
        url: '/products',
      }),
      transformResponse: parseSearchProducts,
    }),
  }),
})

export const { useGetAllProductsQuery, useGetProductQuery } = productApi
