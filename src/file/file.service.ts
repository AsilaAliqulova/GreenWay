import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as path from "path";
import * as uuid from "uuid";
import * as fs from "fs";

@Injectable()
export class FileService {
  async saveFile(file: any): Promise<string> {
    try {
      if (!file || !file.buffer) {
        throw new InternalServerErrorException("Fayl noto‘g‘ri yoki bo‘sh");
      }

      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "..", "..", "static_image");

      console.log("Saving file to:", path.join(filePath, fileName));

      if (!fs.existsSync(filePath)) {
        try {
          fs.mkdirSync(filePath, { recursive: true });
          console.log("Folder created:", filePath);
        } catch (mkdirError) {
          console.error("Error creating folder:", mkdirError);
          throw new InternalServerErrorException("Katalog yaratishda xatolik");
        }
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      console.log("File saved successfully:", fileName);

      return fileName;
    } catch (error) {
      console.error("Error saving file:", error);
      throw new InternalServerErrorException("Fileda yozishda xatolik");
    }
  }
}

// @Injectable()
// export class FileService {
//   async saveFile(file: Express.Multer.File): Promise<string> {
//     try {
//       if (!file || !file.buffer) throw new InternalServerErrorException("The file is incorrect or empty");

//       const fileName = uuid.v4() + path.extname(file.originalname);
//       const filePath = path.resolve(__dirname, "..", "..", "static_image");

//       if (!fs.existsSync(filePath)) {
//         fs.mkdirSync(filePath, { recursive: true });
//       }

//       fs.writeFileSync(path.join(filePath, fileName), file.buffer);

//       return fileName;
//     } catch (error) {
//       throw new InternalServerErrorException("File writing error");
//     }
//   }
// }
