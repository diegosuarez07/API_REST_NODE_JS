const express = require('express')
const gestor_telefonos = require('../gestores/telefonos')
const gestor_personas = require('../gestores/personas')
const router = express.Router()

router.use(express.json())

//consultar todos
router.get("/", async (req,res) => {
    res.json(await gestor_telefonos.consultar_todos())
    res.end()
})

//consultar telefono por id
router.get("/:idtelefono", async (req,res) => {
    let idtelefono = parseInt(req.params.idtelefono)

    if(!isNaN(idtelefono)){
        let telefono_encontrado = await gestor_telefonos.consultar_telefono_por_id(idtelefono)

        if(telefono_encontrado){
            res.json(telefono_encontrado)
            res.status(200)
        }
        else{
            res.status(404).send("El teléfono que intenta buscar no existe")
        }
    }
    else{
        res.status(400).send("El parámetro debe ser numérico")
    }
    res.end()
})

//agregar un telefono nuevo o actualizar (post)
router.post("/", async (req,res) => {
        
        let nuevo = req.body
        //consulto primero si el telefono existe por su numero de telefono (no su id)
        let telefono_encontrado = await gestor_telefonos.consultar_telefono_por_numero(nuevo.numero)
        if(telefono_encontrado){
            res.status(400).send("Este teléfono ya existe")
        }
        else{
            //aca tengo que controlar que la persona a la cual le voy asociar el nuevo telefono, 
            //realmente sea una persona que exista. 
            //No puedo agregarle un telefono a un documento que no exista en la bd
            
            let persona_encontrada = await gestor_personas.consultar(nuevo.documento)
            if(persona_encontrada){
                await gestor_telefonos.agregar_telefono(nuevo)
                res.status(201).send("Teléfono creado correctamente")
            }else{
                res.status(400).send("La persona a la cual quiere asociar dicho telefono no existe")
            }
        }
        res.end()
})

//eliminar un telefono
router.delete("/:idtelefono", async (req,res) => {
    let idtelefono = parseInt(req.params.idtelefono)
    if(!isNaN(idtelefono)){
        let telefono_encontrado = await gestor_telefonos.consultar_telefono_por_id(idtelefono)
        if(telefono_encontrado){
            await gestor_telefonos.eliminar_telefono(idtelefono)
            res.status(200).send("Teléfono eliminado correctamente")
        }
        else{
            res.status(404).send("El teléfono que desea eliminar no existe")
        }
    }
    else{
        res.status(400).send("El parámetro debe ser numérico")
    }
    res.end()
})

//modificar un telefono
router.put("/:idtelefono", async (req,res) => {
    let idtelefono = parseInt(req.params.idtelefono)
    //valido que el idtelefono sea numerico
    if(!isNaN(idtelefono)){
        let telefono_encontrado = await gestor_telefonos.consultar_telefono_por_id(idtelefono)
        //valido que el telefono exista en la bd
        if(telefono_encontrado){
            let telefono_modificado = req.body
            telefono_modificado.id_telefono = idtelefono
            //valido que el campo id_tipo sea numerico
            if(!isNaN(telefono_modificado.id_tipo)){
                let persona_encontrada = await gestor_personas.consultar(telefono_modificado.documento)
                //valido que la persona a la cual quiero modificar el telefono exista
                //tambien permite que pueda asignarle el telefono a otra persona siempre en cuando esta exista
                if(persona_encontrada){
                    await gestor_telefonos.modificar_telefono(telefono_modificado)
                    res.status(200).send("Teléfono modificado correctamente")
                }else{
                    res.status(404).send("La persona a la cual desea modificar el teléfono no existe")
                }
            }else{
                res.status(400).send("El parámetro 'id_tipo' debe ser numérico")
            }
        }else{
            res.status(404).send("El teléfono que intenta modificar no existe")
        }
    }
    else{
        res.status(400).send("El parámetro id debe ser numérico")
    }
    res.end()
})

//consultar telefonos por secuencia
router.get("/secuencia/:sec", async(req,res) => {
    let secuencia = parseInt(req.params.sec)
    if(!isNaN(secuencia)){
        let sec = "%"
        let secuenciaNueva = sec.concat(secuencia)
        res.json(await gestor_telefonos.consultar_telefonos_por_secuencia(secuenciaNueva))
        res.status(200)
    }else{
        res.status(400).send("El parámetro debe ser numérico")
    }
    res.end()
})



exports.router = router