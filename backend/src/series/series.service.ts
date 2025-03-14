
import {Serie} from "./interfaces/serie/serie.interface"
import {SerieDto} from "./dto/serie.dto/serie.dto";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Observable} from "rxjs";

@Injectable()
export class SeriesService {
    constructor(@InjectModel('Serie') private serieModel:
                    Model<Serie>) {
    }
    async create(movieDto: SerieDto): Promise<any>{
        const movie = new this.serieModel(movieDto);
        return movie.save();
    }
    async getSeries(): Promise<Serie[]> {
        return this.serieModel.find();
    }
    async getSerie(idSerie: string): Promise<any> {
        return this.serieModel.findById(idSerie);
    }

    async getSeriesByCategoria(query: string): Promise<Serie[]> {
        const regex = new RegExp(query, 'i');
        return this.serieModel.find({
            categorias: { $in: [regex] }
        }).exec();
    }

    async searchSeries(query: string): Promise<Serie[]> {
        const regex = new RegExp(query, 'i');
        return this.serieModel.find({
            $or: [
                {titulo: {$regex: regex}},
                {sinopsis: {$regex: regex}},
            ],
        });
    }


    async updateSerie(idSerie: string, serieDto: SerieDto):
        Promise<any>{
        return this.serieModel.findByIdAndUpdate(
            idSerie,
            {$set: serieDto},
            {new: true});
    }
    async deleteSerie(idSerie: string): Promise<any>{
        return this.serieModel.findByIdAndDelete(idSerie);
    }

    async getCategorias():Promise<string[]>{
        return this.serieModel.find().distinct('categorias')
    }
}
