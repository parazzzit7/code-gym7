'use client'

import { useEffect, useState, type ReactNode } from 'react'

import { setupListeners } from '@reduxjs/toolkit/query'
import { Provider } from 'react-redux'

import { makeStore, type AppStore } from '@/app/store/store'

type StoreProviderProps = {
  children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState<AppStore>(() => makeStore())

  useEffect(() => {
    return setupListeners(store.dispatch)
  }, [store])

  return <Provider store={store}>{children}</Provider>
}
