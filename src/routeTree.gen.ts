/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TableIndexImport } from './routes/table/index'
import { Route as TableTable2Import } from './routes/table/table2'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TableIndexRoute = TableIndexImport.update({
  path: '/table/',
  getParentRoute: () => rootRoute,
} as any)

const TableTable2Route = TableTable2Import.update({
  path: '/table/table2',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/table/table2': {
      id: '/table/table2'
      path: '/table/table2'
      fullPath: '/table/table2'
      preLoaderRoute: typeof TableTable2Import
      parentRoute: typeof rootRoute
    }
    '/table/': {
      id: '/table/'
      path: '/table'
      fullPath: '/table'
      preLoaderRoute: typeof TableIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  TableTable2Route,
  TableIndexRoute,
})

/* prettier-ignore-end */
