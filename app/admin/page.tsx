'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  TrendingUp, ShoppingBag, Inbox, Users, Package,
  AlertTriangle, ArrowRight, Eye, CheckCircle2
} from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'

const stats = [
  { label: 'Monthly Revenue',   value: '$24,860', delta: '+18.2%', positive: true,  icon: TrendingUp },
  { label: 'Active Orders',     value: '47',       delta: '+12 today', positive: true, icon: ShoppingBag },
  { label: 'New Inquiries',     value: '12',       delta: '3 urgent',  positive: false, icon: Inbox },
  { label: 'Total Customers',   value: '1,284',    delta: '+24 this week', positive: true, icon: Users },
]

const recentOrders = [
  { id: '#SB-2024-0891', customer: 'Sophie Anderson',  item: 'Morning Blush Peony (×20)', status: 'CONFIRMED',    total: '$360' },
  { id: '#SB-2024-0890', customer: 'The Langham Hotel', item: 'Corporate Subscription',  status: 'OUT_FOR_DELIVERY', total: '$980' },
  { id: '#SB-2024-0889', customer: 'Emma Clarke',      item: 'Wedding Package',           status: 'PROCESSING',    total: '$2,400' },
  { id: '#SB-2024-0888', customer: 'Marcus Whitfield', item: 'Twilight Velvet Orchid (×5)', status: 'DELIVERED',  total: '$175' },
  { id: '#SB-2024-0887', customer: 'Julia Prentiss',   item: 'Blue Anemone (×12)',        status: 'PENDING',       total: '$180' },
]

const lowStock = [
  { name: 'Phalaenopsis Orchid',   qty: 8,  threshold: 15, imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=100&q=80' },
  { name: 'Twilight Velvet Orchid',qty: 6,  threshold: 10, imageUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=100&q=80' },
  { name: 'Royal Protea Heirloom', qty: 12, threshold: 15, imageUrl: 'https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg?auto=compress&cs=tinysrgb&w=100' },
]

const newInquiries = [
  { name: 'Charlotte Davies',  type: 'Wedding',    date: '15 Mar 2025', budget: '$8–12k' },
  { name: 'Park Hyatt Sydney', type: 'Hospitality',date: 'Ongoing',     budget: 'Monthly' },
  { name: 'Blake Architects',  type: 'Corporate',  date: '22 Feb 2025', budget: '$3–5k' },
]

const statusColor: Record<string, string> = {
  PENDING:           'bg-amber-50 text-amber-700',
  CONFIRMED:         'bg-blue-50 text-blue-700',
  PROCESSING:        'bg-purple-50 text-purple-700',
  READY:             'bg-teal-50 text-teal-700',
  OUT_FOR_DELIVERY:  'bg-orange-50 text-orange-700',
  DELIVERED:         'bg-emerald-50 text-emerald-700',
  CANCELLED:         'bg-red-50 text-red-700',
}

export default function AdminDashboard() {
  return (
    <AdminShell title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white border border-bloomer-border p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <p className="text-[10px] tracking-[0.16em] uppercase text-bloomer-muted">{s.label}</p>
                <div className="w-8 h-8 bg-gold-50 flex items-center justify-center">
                  <Icon size={15} className="text-bloomer-gold" />
                </div>
              </div>
              <p className="font-serif text-3xl text-bloomer-dark mb-1">{s.value}</p>
              <p className={`text-[11px] font-medium ${s.positive ? 'text-emerald-600' : 'text-amber-600'}`}>
                {s.delta}
              </p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent orders */}
        <div className="xl:col-span-2 bg-white border border-bloomer-border">
          <div className="flex items-center justify-between px-6 py-4 border-b border-bloomer-border">
            <h2 className="font-serif text-lg">Recent Orders</h2>
            <Link href="/admin/orders" className="text-[10px] tracking-[0.12em] uppercase text-bloomer-gold hover-underline flex items-center gap-1">
              View All <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-bloomer-border">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between px-6 py-4 hover:bg-cream-50 transition-colors">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-medium text-bloomer-muted font-mono">{order.id}</span>
                    <span className={`badge text-[9px] ${statusColor[order.status] ?? 'bg-gray-50 text-gray-600'}`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-bloomer-dark truncate">{order.customer}</p>
                  <p className="text-[11px] text-bloomer-muted truncate">{order.item}</p>
                </div>
                <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                  <span className="font-medium text-sm text-bloomer-dark">{order.total}</span>
                  <button className="text-bloomer-muted hover:text-bloomer-dark transition-colors">
                    <Eye size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">

          {/* Low stock */}
          <div className="bg-white border border-bloomer-border">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-bloomer-border">
              <AlertTriangle size={15} className="text-amber-500" />
              <h2 className="font-serif text-base">Low Stock Alert</h2>
            </div>
            <div className="divide-y divide-bloomer-border">
              {lowStock.map(item => (
                <div key={item.name} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-10 h-10 relative overflow-hidden bg-cream-200 flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-bloomer-dark truncate">{item.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex-1 h-1 bg-bloomer-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${Math.round((item.qty / item.threshold) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-amber-600 font-medium flex-shrink-0">{item.qty} left</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3">
              <Link href="/admin/flowers" className="text-[10px] tracking-[0.12em] uppercase text-bloomer-gold hover-underline">
                Manage Inventory →
              </Link>
            </div>
          </div>

          {/* New inquiries */}
          <div className="bg-white border border-bloomer-border">
            <div className="flex items-center justify-between px-5 py-4 border-b border-bloomer-border">
              <h2 className="font-serif text-base">New Inquiries</h2>
              <span className="badge-gold">{newInquiries.length} new</span>
            </div>
            <div className="divide-y divide-bloomer-border">
              {newInquiries.map(inq => (
                <div key={inq.name} className="px-5 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-bloomer-dark">{inq.name}</p>
                    <span className="badge-blush text-[9px]">{inq.type}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-[11px] text-bloomer-muted">
                    <span>{inq.date}</span>
                    <span>·</span>
                    <span>{inq.budget}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3">
              <Link href="/admin/inquiries" className="text-[10px] tracking-[0.12em] uppercase text-bloomer-gold hover-underline">
                View All Inquiries →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
