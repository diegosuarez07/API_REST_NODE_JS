const express = require('express')
const gestor_personas = require('../gestores/personas')
const gestor_telefonos = require('../gestores/telefonos')
const router = express.Router()

router.use(express.json())

//endpoint (verbo + uri)
router.get("/", async (req, res) => {
    res.json(await gestor_personas.consultar_todas())
    res.end()
})


router.get("/:numero", async (req, res) => {
    let num = parseInt(req.params.numero)
    
    if (!isNaN(num))  { // Si no es NaN, es porque es un número correcto
        let persona_encontrada = await gestor_personas.consultar(num)

        if (persona_encontrada) 
            res.json(persona_encontrada)
        else
            res.status(404)
    }
    else{ 
        res.status(400).send("El parámetro debe ser numérico")
    }
    res.end()
})

router.put("/:numero", (req, res) => {
    let num = parseInt(req.params.numero)
    let nueva = req.body
    nueva.numero = num

    gestor_personas.agregar(nueva)

    res.sendStatus(201)

})

router.put("/:numero/:nombre/:apellido/:edad", (req, res) => {
    let num = parseInt(req.params.numero)
    let nom = req.params.nombre
    let ape = req.params.apellido
    let edad = parseInt(req.params.edad)

    
    let nueva = { numero: num, nombre: nom, apellido: ape, edad: edad }
    gestor_personas.agregar(nueva)

    res.sendStatus(201)

})


router.post("/:documento", async (req,res) => {
    let dni = parseInt(req.params.documento)
    if(!isNaN(dni)){
    let nueva = req.body
    nueva.documento = dni
        let persona_encontrada = await gestor_personas.consultar(dni)
        if(persona_encontrada){
            res.status(400).send("La persona ya existe")
        }else{
            await gestor_personas.agregarPersona(nueva)
            res.sendStatus(201).send("Persona creada correctamente")
        }
    }else{
        res.status(400).send("El parametro debe ser numerico")
    }
})

router.delete("/:documento", async (req,res) => {
    let dni = parseInt(req.params.documento)
    if(!isNaN(dni)){
        let persona = req.body
        persona.documento = dni
        let persona_encontrada = await gestor_personas.consultar(dni)
        if(persona_encontrada){
            await gestor_personas.eliminarPersona(persona)
            res.sendStatus(200)
        }else{
            res.status(404).send("La persona que desea eliminar no existe")
        }
    }else{
        res.status(400).send("El parámetro debe ser numérico")
    }
    res.end()
})

//consultar nombres de personas cuyo nombre incluya una subcadena que le paso por parametro
router.get("/filtronombre/:fil", async (req,res) => {
    let secuencia = req.params.fil
    let sec = "%"
    let secuenciaNueva = sec.concat(secuencia,"%")
    res.json(await gestor_personas.consultar_personas_nombre_subcadena(secuenciaNueva))
    res.status(200)
    res.end()
})

//consultar apellidos de personas cuyo apellido incluya una subcadena que le paso por parametro
router.get("/filtroapellido/:fil", async (req,res) => {
    let secuencia = req.params.fil
    let sec = "%"
    let secuenciaNueva = sec.concat(secuencia,"%")
    res.json(await gestor_personas.consultar_personas_apellido_subcadena(secuenciaNueva))
    res.status(200)
    res.end()
})

//consulta todos los telefonos que tiene una persona
router.get("/:id/telefonos", async (req,res) => {
    let id = parseInt(req.params.id)
    if(!isNaN(id)){
        //el parametro id seria el numero de documento de la persona
        let persona_encontrada = await gestor_personas.consultar(id)
        if(persona_encontrada){
            //una vez que la persona existe entonces ahora si buscar los telefonos que tenga asociados
            res.json(await gestor_telefonos.consultar_telefonos_de_persona(persona_encontrada.documento))
            res.status(200)
        }else{
            res.status(404).send("La persona no existe en la bd")
        }
    }else{
        res.status(400).send("El parámetro debe ser numérico")
    }
    res.end()
})

//consultar todos los telefonos que tiene una persona filtrando por id tipo
router.get("/:id/telefonos/:tipo", async (req,res) => {
    let id = parseInt(req.params.id)
    let tipo = parseInt(req.params.tipo)
    if(!isNaN(id) && !isNaN(tipo)){
        //el parametro id seria el numero de documento de la persona
        let persona_encontrada = await gestor_personas.consultar(id)
        if(persona_encontrada){
            //una vez que la persona existe entonces ahora si buscar los telefonos que tenga asociados
            //filtrando por tipo
            res.json(await gestor_telefonos.consultar_telefonos_de_persona_por_id_tipo(persona_encontrada.documento, tipo))
            res.status(200)
        }else{
            res.status(404).send("La persona no existe en la bd")
        }
    }else{
        res.status(400).send("Los parámetros deben ser numéricos ambos")
    }
    res.end()
})

exports.router = router