import { writeFile, unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (req: Request, res: Response) => {

//   console.log("get request ");

// };

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // const path = `/tmp/${file.name}`;
  const path = `${process.cwd()}/public/cache.pdf`;
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const path = `${process.cwd()}/public/cache.pdf`;

  try {
    await unlink(path);
    console.log(`File ${path} removed successfully!`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error removing file ${path}: ${error}`);
  }
}
