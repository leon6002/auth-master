'use client'

import dynamic from 'next/dynamic'
import { AttractionSkeleton } from './attraction-skeleton'
import { AttractionsSkeleton } from './attractions-skeleton'
import { EventsSkeleton } from './events-skeleton'

export { spinner } from './spinner'
export { BotCard, BotMessage, SystemMessage } from './message'

const Attraction = dynamic(
  () => import('./attraction').then(mod => mod.Attraction),
  {
    ssr: false,
    loading: () => <AttractionSkeleton />
  }
)

const Purchase = dynamic(
  () => import('./ticket-purchase').then(mod => mod.Purchase),
  {
    ssr: false,
    loading: () => (
      <div className="h-[375px] rounded-xl border bg-zinc-950 p-4 text-green-400 sm:h-[314px]" />
    )
  }
)

const Attractions = dynamic(
  () => import('./attractions').then(mod => mod.Attractions),
  {
    ssr: false,
    loading: () => <AttractionsSkeleton />
  }
)

const Events = dynamic(() => import('./events').then(mod => mod.Events), {
  ssr: false,
  loading: () => <EventsSkeleton />
})

export { Attraction, Purchase, Attractions, Events }
