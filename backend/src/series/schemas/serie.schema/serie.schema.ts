import mongoose, {Schema} from "mongoose";

export const SerieSchema =
    new Schema({
            titulo: { type: String, required: true },
            poster: { type: String, required: true },
            categorias: [{type: String, required: true}],
            numero_capitulos: { type: Number, required: true },
            fecha_emision: { type: String, required: true },
            sinopsis: { type: String, required: true }
    }, {versionKey: false});

