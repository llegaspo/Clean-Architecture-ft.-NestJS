import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsApiModule } from 'apps/products/products-api-service/src/products.module';

@Module({
  imports: [ProductsApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
