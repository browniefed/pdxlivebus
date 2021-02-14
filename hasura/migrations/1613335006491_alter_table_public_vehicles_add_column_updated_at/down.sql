DROP TRIGGER IF EXISTS "set_public_vehicles_updated_at" ON "public"."vehicles";
ALTER TABLE "public"."vehicles" DROP COLUMN "updated_at";
