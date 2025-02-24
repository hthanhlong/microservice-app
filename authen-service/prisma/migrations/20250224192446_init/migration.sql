-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "verifyCode" VARCHAR(6) NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "phone" VARCHAR(10),
    "address" VARCHAR(1000),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "subsType" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "expiresAtSub" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "userUuId" TEXT NOT NULL,
    "businessName" VARCHAR(50) NOT NULL,
    "businessAddress" VARCHAR(50) NOT NULL,
    "businessLicense" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_userUuId_key" ON "Vendor"("userUuId");
