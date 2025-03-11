import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function start() {
  try {
    const PORT = process.env.PORT ?? 3003;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");
    // app.enableCors({
    //   origin: (origin, callback) => {
    //     const allowedOrigins = [
    //       "http://localhost:8000",
    //       "http://localhost:3000",
    //       "https://ecoway.uz",
    //       "http://api.ecoway.uz",
    //       "https://ecoway.vercal.app",
    //     ];
    //     if (!origin || allowedOrigins.includes(origin)) {
    //       console.log(origin);
          
    //       callback(null, true,undefined);

    //     } else {
    //       callback(new BadRequestException("Not allowed by CORS"));
    //     }
    //   },
    //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //   credentials: true,
    // });

    const config = new DocumentBuilder()
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your Bearer token",
          name: "JWT",
          in: "header",
        },
        "authorization"
      )
      .setTitle("GreenWay example")
      .setDescription("The GreenWay API description")
      .setVersion("1.0")
      .addTag("GreenWay")
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, documentFactory);

    await app.listen(PORT, () => {
      console.log(`Server is runnning at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
start();
