import { DynamicModule, Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Answers, Questions, Users } from './app.model';
import { JwtModule } from '@nestjs/jwt';
import { NestSessionOptions, SessionModule } from 'nestjs-session';

declare const module: any;

@Module({})
export class AppModule {
  public static initialize(): DynamicModule {
    const renderModule =
      module.hot?.data?.renderModule ??
      RenderModule.forRootAsync(Next({ dev: NODE_ENV === 'development' }), {
        viewsDir: null,
      });

    if (module.hot) {
      module.hot.dispose((data: any) => {
        data.renderModule = renderModule;
      });
    }

    return {
      module: AppModule,
      imports: [
        renderModule,
        SessionModule.forRoot({
          session: { secret: 'keyboard cat' },
        }),
        JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET',
          signOptions: {
            expiresIn: '24h',
          },
        }),
        SequelizeModule.forFeature([Users, Questions, Answers]),
        ConfigModule.forRoot({ envFilePath: '.env' }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRESS_HOST,
          port: Number(process.env.POSTGRESS_PORT),
          username: process.env.POSTGRESS_USER,
          password: process.env.POSTGRESS_PASSWORD,
          database: process.env.POSTGRESS_DB,
          models: [Users, Questions, Answers],
          autoLoadModels: true,
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
