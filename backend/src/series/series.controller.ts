import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put,

} from '@nestjs/common';
import {SeriesService} from "./series.service";
import {SerieDto} from "./dto/serie.dto/serie.dto";
import { Query } from '@nestjs/common';


@Controller('api/v1/series')
export class SeriesController {
    constructor(private readonly serieService: SeriesService) {
    }

    @Post('')
    async create(@Body() serieDto: SerieDto) {
        try {
            const data = await this.serieService.create(serieDto);
            if (data) {
                return {
                    status: 'Ok',
                    message: 'Serie Successfully created'
                }
            } else {
                throw new BadRequestException({
                    status: 'Error',
                    message: 'Error creating serie'
                })
            }
        } catch (e) {
            throw new BadRequestException(
                {status: 'Error', message: e.message})
        }
    }

    @Get('')
    async getSeries() {
        try {
            const data = await this.serieService.getSeries();
            return {status: 'Created', data}
        } catch (e: any) {
            return new BadRequestException({
                status: 'Error', message: e.message
            })
        }
    }

    @Get('search')
    async searchSeries(@Query('q') query: string) {
        try {
            const series = await this.serieService.searchSeries(query);
            return {
                status: 'ok',
                data: series,
            };
        } catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message,
            });
        }
    }

    @Get('serie/:id')
    async getSerie(@Param('id') id: string) {
        try {
            const data = await this.serieService.getSerie(id);
            if (data) {
                return { status: 'Ok', data }
            }
            throw new NotFoundException({
                status: 'Error',
                message: 'Serie not found'
            })
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get('categorias')
    async getCategorias() {
        try {
            const data =
                await this.serieService.getCategorias();

            return {
                status: 'Ok',
                data
            }
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get('categorias/:categoryName')
    async getSeriesByCategory(@Param('categoryName') categoryName: string) {
        try {
            const series = await this.serieService.getSeriesByCategoria(categoryName);
            return {
                status: 'ok',
                data: series
            };
        } catch (e) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message,
            });
        }
    }

    @Put('/:id')
    async updateSerie(
        @Param('id') id: string,
        @Body() serieDto: SerieDto) {
        try {
            const data =
                await this.serieService.updateSerie(
                    id, serieDto
                );
            if (!data) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Serie not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Serie updated'
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Delete('/:id')
    async deleteSerie(@Param('id') id: string) {
        try {
            const data =
                await this.serieService.deleteSerie(id);
            if (!data) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Serie not found'
                })
            }
            return {
                status: 'Ok',
                message: 'Serie deleted'
            }
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
}