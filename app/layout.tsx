import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FertilityTracker - Personal Fertility & Ovulation Tracking',
  description: 'Track your fertility, predict ovulation, log symptoms, and access educational resources with our comprehensive fertility tracking application.',
  generator: 'FertilityTracker',
  keywords: 'fertility tracking, ovulation prediction, cycle tracking, pregnancy planning, basal body temperature, cervical fluid, fertility education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
