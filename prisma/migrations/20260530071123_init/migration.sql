-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'ADMIN', 'WHOLESALE');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('SPRING', 'SUMMER', 'AUTUMN', 'WINTER', 'ALL_YEAR');

-- CreateEnum
CREATE TYPE "FlowerOrigin" AS ENUM ('LOCAL', 'IMPORTED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "DeliveryType" AS ENUM ('STANDARD', 'EXPRESS', 'SAME_DAY', 'PICKUP');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WEDDING', 'CORPORATE', 'BIRTHDAY', 'FUNERAL', 'REAL_ESTATE', 'RESTAURANT', 'HOTEL', 'OTHER');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'COMPLETED', 'DECLINED');

-- CreateEnum
CREATE TYPE "SubFrequency" AS ENUM ('WEEKLY', 'FORTNIGHTLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "SubStatus" AS ENUM ('ACTIVE', 'PAUSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "GalleryCategory" AS ENUM ('WEDDING', 'CORPORATE', 'SEASONAL', 'EVENTS', 'STUDIO');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "phone" TEXT,
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowerCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FlowerCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flower" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "scientificName" TEXT,
    "description" TEXT,
    "longDescription" TEXT,
    "careInstructions" TEXT,
    "fragrance" TEXT,
    "stemLengthCm" INTEGER,
    "vaseLifeDays" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "images" TEXT[],
    "price" DECIMAL(10,2) NOT NULL,
    "wholesalePrice" DECIMAL(10,2),
    "unit" TEXT NOT NULL DEFAULT 'stem',
    "minOrderQty" INTEGER NOT NULL DEFAULT 1,
    "wholesaleMinQty" INTEGER NOT NULL DEFAULT 10,
    "season" "Season" NOT NULL DEFAULT 'ALL_YEAR',
    "origin" "FlowerOrigin" NOT NULL DEFAULT 'LOCAL',
    "country" TEXT,
    "color" TEXT[],
    "flowerType" TEXT,
    "occasion" TEXT[],
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowerInventory" (
    "id" TEXT NOT NULL,
    "flowerId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "reservedQty" INTEGER NOT NULL DEFAULT 0,
    "lowStockThreshold" INTEGER NOT NULL DEFAULT 20,
    "nextRestockDate" TIMESTAMP(3),
    "restockQty" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlowerInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportedFlower" (
    "id" TEXT NOT NULL,
    "flowerId" TEXT NOT NULL,
    "sourceCountry" TEXT NOT NULL,
    "supplier" TEXT,
    "arrivalDay" TEXT,
    "arrivalFrequency" TEXT,
    "shelfLifeDays" INTEGER NOT NULL DEFAULT 7,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImportedFlower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "userId" TEXT,
    "guestEmail" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "subtotal" DECIMAL(10,2) NOT NULL,
    "deliveryFee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL,
    "deliveryType" "DeliveryType" NOT NULL DEFAULT 'STANDARD',
    "deliveryAddress" TEXT,
    "deliveryDate" TIMESTAMP(3),
    "notes" TEXT,
    "giftMessage" TEXT,
    "isWholesale" BOOLEAN NOT NULL DEFAULT false,
    "paymentId" TEXT,
    "paymentStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "flowerId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "trackingNumber" TEXT,
    "carrier" TEXT,
    "estimatedDate" TIMESTAMP(3),
    "actualDate" TIMESTAMP(3),
    "recipientName" TEXT,
    "recipientPhone" TEXT,
    "suburb" TEXT,
    "state" TEXT,
    "postcode" TEXT,
    "instructions" TEXT,
    "signature" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "flowerId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "flowerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventInquiry" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "eventType" "EventType" NOT NULL,
    "eventDate" TIMESTAMP(3),
    "guestCount" INTEGER,
    "venue" TEXT,
    "budget" TEXT,
    "description" TEXT,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "adminNotes" TEXT,
    "quotedAmount" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "frequency" "SubFrequency" NOT NULL DEFAULT 'WEEKLY',
    "budget" DECIMAL(10,2) NOT NULL,
    "preferences" TEXT,
    "address" TEXT,
    "status" "SubStatus" NOT NULL DEFAULT 'ACTIVE',
    "nextDelivery" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "imageUrl" TEXT NOT NULL,
    "category" "GalleryCategory" NOT NULL DEFAULT 'STUDIO',
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "tags" TEXT[],
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "company" TEXT,
    "role" TEXT,
    "avatarUrl" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "eventType" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT,
    "entityId" TEXT,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "discount" DECIMAL(5,2) NOT NULL,
    "isPercentage" BOOLEAN NOT NULL DEFAULT true,
    "minOrder" DECIMAL(10,2),
    "usageLimit" INTEGER,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FlowerCategory_name_key" ON "FlowerCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FlowerCategory_slug_key" ON "FlowerCategory"("slug");

-- CreateIndex
CREATE INDEX "FlowerCategory_slug_idx" ON "FlowerCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Flower_slug_key" ON "Flower"("slug");

-- CreateIndex
CREATE INDEX "Flower_slug_idx" ON "Flower"("slug");

-- CreateIndex
CREATE INDEX "Flower_season_idx" ON "Flower"("season");

-- CreateIndex
CREATE INDEX "Flower_origin_idx" ON "Flower"("origin");

-- CreateIndex
CREATE INDEX "Flower_isFeatured_idx" ON "Flower"("isFeatured");

-- CreateIndex
CREATE UNIQUE INDEX "FlowerInventory_flowerId_key" ON "FlowerInventory"("flowerId");

-- CreateIndex
CREATE INDEX "FlowerInventory_flowerId_idx" ON "FlowerInventory"("flowerId");

-- CreateIndex
CREATE UNIQUE INDEX "ImportedFlower_flowerId_key" ON "ImportedFlower"("flowerId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_orderNumber_idx" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_orderId_key" ON "Delivery"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_flowerId_key" ON "CartItem"("userId", "flowerId");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_userId_flowerId_key" ON "WishlistItem"("userId", "flowerId");

-- CreateIndex
CREATE INDEX "EventInquiry_status_idx" ON "EventInquiry"("status");

-- CreateIndex
CREATE INDEX "EventInquiry_eventType_idx" ON "EventInquiry"("eventType");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE INDEX "Blog_slug_idx" ON "Blog"("slug");

-- CreateIndex
CREATE INDEX "Blog_isPublished_idx" ON "Blog"("isPublished");

-- CreateIndex
CREATE INDEX "AdminLog_userId_idx" ON "AdminLog"("userId");

-- CreateIndex
CREATE INDEX "AdminLog_entity_idx" ON "AdminLog"("entity");

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_code_key" ON "Promotion"("code");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FlowerCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerInventory" ADD CONSTRAINT "FlowerInventory_flowerId_fkey" FOREIGN KEY ("flowerId") REFERENCES "Flower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportedFlower" ADD CONSTRAINT "ImportedFlower_flowerId_fkey" FOREIGN KEY ("flowerId") REFERENCES "Flower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_flowerId_fkey" FOREIGN KEY ("flowerId") REFERENCES "Flower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_flowerId_fkey" FOREIGN KEY ("flowerId") REFERENCES "Flower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_flowerId_fkey" FOREIGN KEY ("flowerId") REFERENCES "Flower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInquiry" ADD CONSTRAINT "EventInquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminLog" ADD CONSTRAINT "AdminLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
