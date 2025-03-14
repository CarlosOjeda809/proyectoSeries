Este proyecto consiste en un código básico de CRUD, en el que a partir de dos tipos de despliegues: WEB (Angular) o APP (Ionic) puedes modificar la información de una API (hecha en NEST) para lograr actualizar los datos mostrados en cada uno de los despliegues.

Las series que se muestran constan de varios datos básicos entre los que están: la imagen o portada (la cuál puedes cambiar a voluntad), la fecha de emisión (tambien editable), la categoría a la que pertenece (se puede modificar, añadir una nueva o eliminar una ya existente), un titulo y una sinopsis. 
Estas series se despliegan de una forma cómoda de ver, permitiendo al usuario ver los datos más importante de cada una de sus series favoritas y añadir las que el desee. 

En la versión APP (Ionic) hay muchas más opciones que se pueden observar al usar la app, entre las que están: una pagina principal con todas las apps conectadas a la respectiva API y con una página de detalles personalizada para cada una. Un menú interactivo en el que puedes
seleccionar la categoría y filtrar las series pertenecientes a esa categoría. Y un buscador en la tercera sección en el que puedes buscar una palabra perteneciente al título o la sinopsis de la respectiva serie. Además de todo ello hay funciones y acciones más básicas que se 
pueden observar al darle uso a la APP pero que serían tediosas de desarrollar en texto (menú desplegable, infinite-scroll, interfaz de puntuación, etc)

Finalmente, él apartado backend consiste en un código básico en typescript que permite al proyecto enlazarse con los datos de la API, seleccionar el puerto local donde se va a mostrar y en que servidor local lo va a hacer. Este backend sienta las bases a través de schemas e interfaces
para que el usuario pueda, a través de los desplegables APP y WEB modificar la información de la respectiva API.
