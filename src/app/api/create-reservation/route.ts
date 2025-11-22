import { readFileSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
    try {
        const newData = await request.json();
        const filePath = path.join(process.cwd(), '/src/data/data.json');
        const fileContents = readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContents);
        data.push(newData);

        writeFileSync(filePath, JSON.stringify(data, null, 2));
        return NextResponse.json({ message: 'Məlumat uğurla əlavə edildi', data })
    } catch (error) {
        return NextResponse.json({ message: 'Xəta baş verdi', error }, { status: 500 });
    }
}