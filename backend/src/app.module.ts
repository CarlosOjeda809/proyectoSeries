import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import 'dotenv/config';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import * as process from 'node:process';
import {SeriesModule} from "./series/series.module";

@Module({
    imports: [

        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            'mongodb+srv://trabajo:trabajo@cluster0.zqgq0.mongodb.net/trabajo_final?retryWrites=true&w=majority&appName=Cluster0'
        ),
        SeriesModule,

    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
