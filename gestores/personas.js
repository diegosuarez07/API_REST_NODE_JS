const mariadb = require('mariadb')
const config = require("../config/bd")


async function agregarPersona(nueva) {
    //lista.push(nueva)
    const conn = await mariadb.createConnection(config)
    await conn.query("insert into personas2 (documento, nombre, apellido, edad) values (?,?,?,?)", [nueva.documento, nueva.nombre,nueva.apellido,nueva.edad])
    conn.end()
}

async function eliminarPersona(nueva){
    const conn = await mariadb.createConnection(config)
    await conn.query("delete from personas2 where documento = ?", [nueva.documento])
    conn.end()
}


async function modificarPersona(persona) {
    const conn = await mariadb.createConnection(config)
    const valores = [persona.nombre, persona.apellido, persona.edad, persona.documento]
    await conn.query("update personas2 set nombre = ?, apellido = ?, edad = ? where documento = ?", valores)
    conn.end()
}

async function consultar_todas() {
    const conn = await mariadb.createConnection(config)
    let personas = await conn.query("select * from personas2")
    conn.end()
    return personas
}

async function consultar(num) {
    const conn = await mariadb.createConnection(config)
    let personas = await conn.query("select * from personas2 where documento = ?", [num])
    conn.end()
    return personas[0]
}

async function consultar_personas_nombre_subcadena(subcadena){
    const conn = await mariadb.createConnection(config)
    let personas = await conn.query("select * from personas2 where nombre like ?",[subcadena])
    conn.end()
    return personas
}

async function consultar_personas_apellido_subcadena(subcadena){
    const conn = await mariadb.createConnection(config)
    let personas = await conn.query("select * from personas2 where apellido like ?", [subcadena])
    conn.end()
    return personas
}

exports.agregarPersona = agregarPersona
exports.consultar_todas = consultar_todas
exports.consultar = consultar
exports.modificarPersona = modificarPersona
exports.eliminarPersona = eliminarPersona
exports.consultar_personas_nombre_subcadena = consultar_personas_nombre_subcadena
exports.consultar_personas_apellido_subcadena = consultar_personas_apellido_subcadena