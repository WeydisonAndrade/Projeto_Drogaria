import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SubstitutionsModule } from './modules/substitutions/substitutions.module';
import { KommoModule } from './integrations/kommo/kommo.module';
import { TrierModule } from './integrations/trier/trier.module';
import { PaymentGatewayModule } from './integrations/payment-gateway/payment-gateway.module';
import { AudioProcessingModule } from './queues/audio-processing/audio-processing.module';
import { ImageProcessingModule } from './queues/image-processing/image-processing.module';
import { OrderProcessingModule } from './queues/order-processing/order-processing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    WhatsappModule,
    ConversationsModule,
    ProductsModule,
    OrdersModule,
    CouponsModule,
    PrescriptionsModule,
    PaymentsModule,
    SubstitutionsModule,
    KommoModule,
    TrierModule,
    PaymentGatewayModule,
    AudioProcessingModule,
    ImageProcessingModule,
    OrderProcessingModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

