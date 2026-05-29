import { PrismaClient, Season, FlowerOrigin, UserRole, GalleryCategory, EventType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌸 Seeding Sydney Bloomer database...')

  // ─── Admin User ───────────────────────────────────────────
  const adminPassword = await bcrypt.hash('admin123!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sydneybloomer.com.au' },
    update: {},
    create: {
      email: 'admin@sydneybloomer.com.au',
      name: 'Sydney Bloomer Admin',
      password: adminPassword,
      role: UserRole.ADMIN,
      emailVerified: new Date(),
    },
  })

  const customerPassword = await bcrypt.hash('customer123!', 12)
  await prisma.user.upsert({
    where: { email: 'wholesale@example.com' },
    update: {},
    create: {
      email: 'wholesale@example.com',
      name: 'Floral Wholesale Co.',
      password: customerPassword,
      role: UserRole.WHOLESALE,
      company: 'Floral Wholesale Co.',
      phone: '+61 2 9000 0001',
      emailVerified: new Date(),
    },
  })

  // ─── Categories ───────────────────────────────────────────
  const categories = await Promise.all([
    prisma.flowerCategory.upsert({
      where: { slug: 'roses' },
      update: {},
      create: { name: 'Roses', slug: 'roses', description: 'Classic and romantic roses in every shade', sortOrder: 1 },
    }),
    prisma.flowerCategory.upsert({
      where: { slug: 'peonies' },
      update: {},
      create: { name: 'Peonies', slug: 'peonies', description: 'Lush, full blooms perfect for weddings', sortOrder: 2 },
    }),
    prisma.flowerCategory.upsert({
      where: { slug: 'orchids' },
      update: {},
      create: { name: 'Orchids', slug: 'orchids', description: 'Exotic and long-lasting orchid varieties', sortOrder: 3 },
    }),
    prisma.flowerCategory.upsert({
      where: { slug: 'tulips' },
      update: {},
      create: { name: 'Tulips', slug: 'tulips', description: 'Spring favourites in a rainbow of colours', sortOrder: 4 },
    }),
    prisma.flowerCategory.upsert({
      where: { slug: 'ranunculus' },
      update: {},
      create: { name: 'Ranunculus', slug: 'ranunculus', description: 'Delicate multi-petalled blooms', sortOrder: 5 },
    }),
    prisma.flowerCategory.upsert({
      where: { slug: 'natives' },
      update: {},
      create: { name: 'Australian Natives', slug: 'natives', description: 'Locally sourced native Australian flowers', sortOrder: 6 },
    }),
    prisma.flowerCategory.upsert({
      where: { slug: 'wildflowers' },
      update: {},
      create: { name: 'Wildflowers', slug: 'wildflowers', description: 'Seasonal wild and meadow blooms', sortOrder: 7 },
    }),
    prisma.flowerCategory.upsert({
      where: { slug: 'proteas' },
      update: {},
      create: { name: 'Proteas', slug: 'proteas', description: 'Statement native protea varieties', sortOrder: 8 },
    }),
  ])

  // ─── Flowers ──────────────────────────────────────────────
  const flowersData = [
    {
      name: 'Morning Blush Peony',
      slug: 'morning-blush-peony',
      description: 'Luxurious soft pink peonies sourced from the Sydney Basin. Full, lush blooms perfect for bridal and event styling.',
      imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: ['https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800'],
      price: 18,
      wholesalePrice: 9,
      season: Season.SPRING,
      origin: FlowerOrigin.LOCAL,
      country: 'Australia',
      color: ['pink', 'blush'],
      flowerType: 'Peony',
      occasion: ['wedding', 'birthday', 'romance'],
      isFeatured: true,
      categorySlug: 'peonies',
      inventory: 340,
      lowStock: 50,
    },
    {
      name: 'Dutch White Ranunculus',
      slug: 'dutch-white-ranunculus',
      description: 'Crisp white ranunculus imported weekly from Holland. Multi-layered petals with a sculptural, elegant form.',
      imageUrl: 'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?auto=format&fit=crop&w=800&q=80'],
      price: 12,
      wholesalePrice: 6,
      season: Season.SPRING,
      origin: FlowerOrigin.IMPORTED,
      country: 'Netherlands',
      color: ['white', 'cream'],
      flowerType: 'Ranunculus',
      occasion: ['wedding', 'corporate', 'sympathy'],
      isFeatured: true,
      categorySlug: 'ranunculus',
      inventory: 480,
      lowStock: 60,
      importInfo: { sourceCountry: 'Netherlands', supplier: 'Dutch Flower Group', arrivalDay: 'Tuesday', shelfLifeDays: 10 },
    },
    {
      name: 'Blue Anemone',
      slug: 'blue-anemone',
      description: 'Striking indigo and cobalt anemones with distinctive black centres. A showstopper for contemporary arrangements.',
      imageUrl: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80'],
      price: 15,
      wholesalePrice: 7.50,
      season: Season.WINTER,
      origin: FlowerOrigin.IMPORTED,
      country: 'Netherlands',
      color: ['blue', 'indigo', 'purple'],
      flowerType: 'Anemone',
      occasion: ['wedding', 'corporate', 'birthday'],
      isFeatured: true,
      categorySlug: 'wildflowers',
      inventory: 220,
      lowStock: 30,
      importInfo: { sourceCountry: 'Netherlands', supplier: 'Marginpar Kenya', arrivalDay: 'Thursday', shelfLifeDays: 8 },
    },
    {
      name: 'Phalaenopsis Orchid',
      slug: 'phalaenopsis-orchid',
      description: 'Exquisite purple-speckled moth orchids sourced directly from Kyoto, Japan. Long-lasting and architecturally stunning.',
      imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80'],
      price: 45,
      wholesalePrice: 22,
      season: Season.ALL_YEAR,
      origin: FlowerOrigin.IMPORTED,
      country: 'Japan',
      color: ['purple', 'white', 'magenta'],
      flowerType: 'Orchid',
      occasion: ['corporate', 'luxury', 'wedding'],
      isFeatured: true,
      categorySlug: 'orchids',
      inventory: 80,
      lowStock: 15,
      importInfo: { sourceCountry: 'Japan', supplier: 'Kyoto Botanical Exports', arrivalDay: 'Wednesday', shelfLifeDays: 21, arrivalFrequency: 'Fortnightly' },
    },
    {
      name: 'Garden Rose — Apricot Charm',
      slug: 'garden-rose-apricot-charm',
      description: 'Full-headed garden roses in soft apricot tones. Sourced from the Ecuadorian highlands for exceptional vase life.',
      imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=800&q=80'],
      price: 8,
      wholesalePrice: 3.50,
      season: Season.ALL_YEAR,
      origin: FlowerOrigin.IMPORTED,
      country: 'Ecuador',
      color: ['apricot', 'peach', 'coral'],
      flowerType: 'Rose',
      occasion: ['wedding', 'birthday', 'romance', 'corporate'],
      isFeatured: true,
      categorySlug: 'roses',
      inventory: 650,
      lowStock: 80,
      importInfo: { sourceCountry: 'Ecuador', supplier: 'Rosas del Ecuador', arrivalDay: 'Monday & Thursday', shelfLifeDays: 12 },
    },
    {
      name: 'Tulip — Parrot Flame',
      slug: 'tulip-parrot-flame',
      description: 'Dramatic parrot tulips in fiery red and gold. Imported from Holland, these fringed blooms make a bold statement.',
      imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=800&q=80'],
      price: 6,
      wholesalePrice: 3,
      season: Season.SPRING,
      origin: FlowerOrigin.IMPORTED,
      country: 'Netherlands',
      color: ['red', 'gold', 'orange'],
      flowerType: 'Tulip',
      occasion: ['birthday', 'spring', 'corporate'],
      isFeatured: false,
      categorySlug: 'tulips',
      inventory: 380,
      lowStock: 50,
      importInfo: { sourceCountry: 'Netherlands', supplier: 'Dutch Flower Group', arrivalDay: 'Tuesday & Friday', shelfLifeDays: 8 },
    },
    {
      name: 'Meadow Whimsy Mix',
      slug: 'meadow-whimsy-mix',
      description: 'Hand-harvested Sydney wildflower mix — daisies, lavender, cosmos, and seasonal natives. Wild, romantic, and uniquely Australian.',
      imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80'],
      price: 9,
      wholesalePrice: 4.50,
      season: Season.SUMMER,
      origin: FlowerOrigin.LOCAL,
      country: 'Australia',
      color: ['mixed', 'white', 'purple', 'yellow'],
      flowerType: 'Wildflower Mix',
      occasion: ['wedding', 'birthday', 'casual'],
      isFeatured: false,
      categorySlug: 'wildflowers',
      inventory: 120,
      lowStock: 20,
    },
    {
      name: 'Royal Protea Heirloom',
      slug: 'royal-protea-heirloom',
      description: "Spectacular King proteas from the Hunter Valley. Australia's national floral emblem, harvested at peak bloom for maximum impact.",
      imageUrl: 'https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: ['https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg?auto=compress&cs=tinysrgb&w=800'],
      price: 28,
      wholesalePrice: 14,
      season: Season.ALL_YEAR,
      origin: FlowerOrigin.LOCAL,
      country: 'Australia',
      color: ['pink', 'rust', 'cream'],
      flowerType: 'Protea',
      occasion: ['wedding', 'corporate', 'luxury'],
      isFeatured: true,
      categorySlug: 'proteas',
      inventory: 95,
      lowStock: 15,
    },
    {
      name: 'White Daisy Garden Mix',
      slug: 'white-daisy-garden-mix',
      description: 'Fresh and breezy white daisies with sunny yellow centres. Grown locally in the Blue Mountains foothills.',
      imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: ['https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=800'],
      price: 5,
      wholesalePrice: 2.50,
      season: Season.SUMMER,
      origin: FlowerOrigin.LOCAL,
      country: 'Australia',
      color: ['white', 'yellow'],
      flowerType: 'Daisy',
      occasion: ['birthday', 'sympathy', 'casual'],
      isFeatured: false,
      categorySlug: 'wildflowers',
      inventory: 200,
      lowStock: 30,
    },
    {
      name: 'Twilight Velvet Orchid',
      slug: 'twilight-velvet-orchid',
      description: 'Deep magenta-purple Cymbidium orchids from New Zealand. Long stems and velvety texture make these a designer favourite.',
      imageUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=800&q=80'],
      price: 35,
      wholesalePrice: 17,
      season: Season.AUTUMN,
      origin: FlowerOrigin.IMPORTED,
      country: 'New Zealand',
      color: ['magenta', 'deep purple', 'burgundy'],
      flowerType: 'Orchid',
      occasion: ['corporate', 'luxury', 'wedding'],
      isFeatured: true,
      categorySlug: 'orchids',
      inventory: 60,
      lowStock: 10,
      importInfo: { sourceCountry: 'New Zealand', supplier: 'NZ Orchid Collective', arrivalDay: 'Wednesday', shelfLifeDays: 18 },
    },
    {
      name: 'Autumn Banksia',
      slug: 'autumn-banksia',
      description: 'Striking golden-amber Banksia from Western Australia. A bold structural element in any arrangement.',
      imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80'],
      price: 22,
      wholesalePrice: 11,
      season: Season.AUTUMN,
      origin: FlowerOrigin.LOCAL,
      country: 'Australia',
      color: ['amber', 'gold', 'russet'],
      flowerType: 'Banksia',
      occasion: ['wedding', 'corporate', 'luxury'],
      isFeatured: false,
      categorySlug: 'natives',
      inventory: 75,
      lowStock: 15,
    },
    {
      name: 'Colombian Red Rose',
      slug: 'colombian-red-rose',
      description: 'Classic deep red long-stem roses from Colombia\'s Bogotá highlands. 60cm stems, velvety petals, powerful fragrance.',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'],
      price: 7,
      wholesalePrice: 3,
      season: Season.ALL_YEAR,
      origin: FlowerOrigin.IMPORTED,
      country: 'Colombia',
      color: ['red', 'deep red'],
      flowerType: 'Rose',
      occasion: ['romance', 'wedding', 'birthday'],
      isFeatured: false,
      categorySlug: 'roses',
      inventory: 800,
      lowStock: 100,
      importInfo: { sourceCountry: 'Colombia', supplier: 'Bogotá Blooms SA', arrivalDay: 'Tuesday, Thursday & Saturday', shelfLifeDays: 14 },
    },
  ]

  for (const flowerData of flowersData) {
    const { inventory, lowStock, importInfo, categorySlug, ...data } = flowerData
    const category = categories.find(c => c.slug === categorySlug)

    const flower = await prisma.flower.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        price: data.price,
        wholesalePrice: data.wholesalePrice,
        categoryId: category?.id,
      },
    })

    await prisma.flowerInventory.upsert({
      where: { flowerId: flower.id },
      update: {},
      create: {
        flowerId: flower.id,
        quantity: inventory,
        lowStockThreshold: lowStock,
        nextRestockDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    if (importInfo) {
      await prisma.importedFlower.upsert({
        where: { flowerId: flower.id },
        update: {},
        create: { flowerId: flower.id, ...importInfo },
      })
    }
  }

  // ─── Testimonials ─────────────────────────────────────────
  const testimonials = [
    {
      authorName: 'Olivia Harrington',
      company: 'The Grounds of Alexandria',
      role: 'Event Director',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80',
      content: 'Sydney Bloomer elevated our entire venue. The seasonal installations are consistently breathtaking and our guests always ask who does our flowers. Worth every cent.',
      rating: 5,
      eventType: 'Corporate Subscription',
    },
    {
      authorName: 'James & Sophie Chen',
      role: 'Wedding Clients',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
      content: 'We trusted Sydney Bloomer with our entire wedding floristry and they exceeded every expectation. From the bridal bouquet to the last centrepiece — absolute perfection.',
      rating: 5,
      eventType: 'Wedding',
    },
    {
      authorName: 'Marcus Webb',
      company: 'Park Hyatt Sydney',
      role: 'General Manager',
      avatarUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=100&q=80',
      content: 'Three years of flawless weekly deliveries. Sydney Bloomer understands luxury hospitality and delivers arrangements that match our five-star standard without fail.',
      rating: 5,
      eventType: 'Hotel Subscription',
    },
  ]

  for (let i = 0; i < testimonials.length; i++) {
    await prisma.testimonial.upsert({
      where: { id: `seed-testimonial-${i}` },
      update: {},
      create: { id: `seed-testimonial-${i}`, ...testimonials[i], sortOrder: i },
    })
  }

  // ─── Gallery ──────────────────────────────────────────────
  const galleryItems = [
    { imageUrl: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800', category: GalleryCategory.WEDDING, title: 'Spring Bridal Ceremony' },
    { imageUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=800&q=80', category: GalleryCategory.EVENTS, title: 'Gala Dinner Installation' },
    { imageUrl: 'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?auto=format&fit=crop&w=800&q=80', category: GalleryCategory.STUDIO, title: 'Studio Arrangement' },
    { imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=800&q=80', category: GalleryCategory.SEASONAL, title: 'Autumn Collection' },
    { imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=800&q=80', category: GalleryCategory.CORPORATE, title: 'Corporate Foyer Display' },
    { imageUrl: 'https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg?auto=compress&cs=tinysrgb&w=800', category: GalleryCategory.WEDDING, title: 'Reception Table Setting' },
  ]

  for (let i = 0; i < galleryItems.length; i++) {
    await prisma.gallery.upsert({
      where: { id: `seed-gallery-${i}` },
      update: {},
      create: { id: `seed-gallery-${i}`, ...galleryItems[i], sortOrder: i },
    })
  }

  // ─── Sample Event Inquiries ───────────────────────────────
  await prisma.eventInquiry.upsert({
    where: { id: 'seed-inquiry-1' },
    update: {},
    create: {
      id: 'seed-inquiry-1',
      fullName: 'Charlotte Davies',
      email: 'charlotte@email.com',
      phone: '+61 400 000 001',
      eventType: EventType.WEDDING,
      eventDate: new Date('2025-03-15'),
      guestCount: 180,
      venue: 'Establishment Hotel, Sydney CBD',
      budget: '$8,000–$12,000',
      description: 'Garden-style romantic wedding. Soft whites, blush pinks, and greenery throughout.',
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`   Admin login: admin@sydneybloomer.com.au / admin123!`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
