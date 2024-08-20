-- CreateTable
CREATE TABLE "specialits" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "specialits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctorspecialits" (
    "speficalitiesId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "Doctorspecialits_pkey" PRIMARY KEY ("speficalitiesId","doctorId")
);

-- AddForeignKey
ALTER TABLE "Doctorspecialits" ADD CONSTRAINT "Doctorspecialits_speficalitiesId_fkey" FOREIGN KEY ("speficalitiesId") REFERENCES "specialits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctorspecialits" ADD CONSTRAINT "Doctorspecialits_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
