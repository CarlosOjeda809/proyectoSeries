export interface ApiResponseSeries {
    status: string
    data: Serie[]
}
export interface ApiResponseCategorias {
    status: string
    data: string[]
}

export interface ApiResponseSerie {
    status: string
    data: Serie
}

export interface ApiResponseMessage {
    status: string
    message: string
}

export interface Serie {
    _id: string
    titulo: string
    poster: string
    categorias: string[]
    numero_capitulos: number
    fecha_emision: string
    sinopsis: string
}
