/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { Suspense } from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import './index.css'
import MainLayout from './container/MainLayout'
import Skeleton from './components/atoms/Skeleton'

// Import komponen-komponen yang akan digunakan
const Home = lazy(() => import('./pages/home'))
const Products = lazy(() => import('./pages/products'))
const DetailProduct = lazy(() => import('./pages/product-detail'))
const News = lazy(() => import('./pages/news'))
const ContactUs = lazy(() => import('./pages/contact-us'))
const NewsRead = lazy(() => import('./pages/news-read'))
const AboutUs = lazy(() => import('./pages/about-us'))

// Definisikan konfigurasi route menggunakan createBrowserRouter
const app = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    )
  },
  {
    path: '/products',
    element: (
      <MainLayout>
        <Products />
      </MainLayout>
    )
  },
  {
    path: '/detail-product/:id',
    element: (
      <MainLayout>
        <DetailProduct />
      </MainLayout>
    )
  },
  {
    path: '/news',
    element: (
      <MainLayout>
        <News />
      </MainLayout>
    )
  },
  {
    path: '/read-news/:id',
    element: (
      <MainLayout>
        <NewsRead />
      </MainLayout>
    )
  },
  {
    path: '/contact-us',
    element: (
      <MainLayout>
        <ContactUs />
      </MainLayout>
    )
  },
  {
    path: '/about-us',
    element: (
      <MainLayout>
        <AboutUs />
      </MainLayout>
    )
  }
])

// Buat komponen Layout sederhana

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Skeleton />}>
      <RouterProvider router={app} />
    </Suspense>
  </React.StrictMode>
)
