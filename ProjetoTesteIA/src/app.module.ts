import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ReminderModule } from './reminder/reminder.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'mestre',
    database: 'lembrete',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      subscriptions: {
        'graphql-ws': {
          connectionInitWaitTimeout: 10000,
        },
      },
      installSubscriptionHandlers: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    ReminderModule,

    WhatsappModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
