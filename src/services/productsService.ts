import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '@/constants'
import type { TransformProductItem } from '@/types'
import { parseLoadedAllProducts, parseLoadedSingleProduct } from '@/helpers'

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
      transformResponse: parseLoadedAllProducts,
    }),
    getProduct: build.query({
      query: (id: string | undefined) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      transformResponse: parseLoadedSingleProduct,
    }),
  }),
})

export const { useGetAllProductsQuery, useGetProductQuery } = productApi
