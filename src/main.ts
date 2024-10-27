import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3030;
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    const config = new DocumentBuilder()
      .setTitle("Taste Table")
      .setDescription(
        "Bu restaranlarda stol ustida menu qr code orqali buyurtma qiladigan dastur"
      )
      .setVersion("1.0")
      .addTag("Nestjs, validation, swagger, guard, mongodb")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(3000, () => console.log(`Server running at port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
}
start();
