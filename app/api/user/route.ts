import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { users } from "@/db/schema";
import { db } from "@/db";

/**
 * Creates a database user from the authenticated session's name and email.
 *
 * @param request - The incoming request; its body is unused.
 * @returns A JSON response with status 200 on creation, 401 for a missing session
 * email, 400 for an existing user, or 500 if the database operation fails.
 */
export async function POST(request: Request) {
    const session =await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try{
     const result = await db.insert(users).values({
        name: session.user.name,
        email: session.user.email,
     }).onConflictDoNothing({
        target: users.email
     }).returning();
     
     if (result.length === 0) {
        return NextResponse.json({ error: "User already exists" }, { status: 200 });
     }

     return NextResponse.json({ message: "User created successfully" }, { status: 200 });
    }

    catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}