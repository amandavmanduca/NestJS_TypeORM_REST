import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BasesModule } from './modules/bases/bases.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { PlacesModule } from './modules/places/places.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { ResponsiblesModule } from './modules/responsibles/responsibles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DATABASE,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      port: 5432,
      host: process.env.DB_HOST,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/**/migrations/*.js'],
      subscribers: ['dist/**/subscriber/*.js'],
    }),
    UsersModule,
    BasesModule,
    CompaniesModule,
    PlacesModule,
    TicketsModule,
    ResponsiblesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
