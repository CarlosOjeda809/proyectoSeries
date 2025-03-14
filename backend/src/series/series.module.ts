import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import {MongooseModule} from "@nestjs/mongoose";
import {SerieSchema} from "./schemas/serie.schema/serie.schema";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: 'Serie',
                    schema: SerieSchema,
                    collection: 'series2425'
                }
            ]
        )
    ],
    controllers: [SeriesController],
    providers: [SeriesService],
})
export class SeriesModule {}
