import type { Metadata } from 'next'
import ShopClient from './ShopClient'

export const metadata: Metadata = {
  title: "The Botanist's Selection",
  description: 'Browse our full collection of premium seasonal and imported flowers.',
}

export default function ShopPage() {
  return <ShopClient />
}
