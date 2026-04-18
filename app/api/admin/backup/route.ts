import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbPath = path.join(process.cwd(), "prisma", "dev.db");

  if (!fs.existsSync(dbPath)) {
    return NextResponse.json({ error: "Database file not found" }, { status: 404 });
  }

  const stat = fs.statSync(dbPath);
  const fileStream = fs.createReadStream(dbPath);

  // Read raw bytes to return directly
  const data = fs.readFileSync(dbPath);

  return new NextResponse(data, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="resistencia_backup_${new Date().toISOString().split('T')[0]}.db"`,
      "Content-Length": stat.size.toString(),
    },
  });
}
