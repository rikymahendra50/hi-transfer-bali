import fs from "fs";
import path from "path";
export default defineEventHandler(async (event) => {
  return await fs.readFileSync(
    path.join(process.cwd(), "/data", "country.json")
  );
});
