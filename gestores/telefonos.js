const mariadb = require('mariadb')
const config = require('../config/bd')

async function consultar_todos(){
    const conn = await mariadb.createConnection(config)
    let telefonos = await conn.query("select * from telefonos")
    conn.end()
    return telefonos
}

async function consultar_telefono_por_id(idtelefono){
    const conn = await mariadb.createConnection(config)
    let telefonos = await conn.query("select * from telefonos where id_telefono = ?", [idtelefono])
    conn.end()
    return telefonos[0]
}

async function consultar_telefono_por_numero(numero){
    const conn = await mariadb.createConnection(config)
    let telefonos = await conn.query("select * from telefonos where numero = ?", [numero])
    conn.end()
    return telefonos[0]
}

async function agregar_telefono(nuevotelefono){
    const conn = await mariadb.createConnection(config)
    const valores = [nuevotelefono.numero, nuevotelefono.id_tipo, nuevotelefono.documento]
    await conn.query("insert into telefonos(numero,id_tipo,documento) values (?,?,?)", valores)
    conn.end()
}

async function eliminar_telefono(idtelefono){
    const conn = await mariadb.createConnection(config)
    await conn.query("delete from telefonos where id_telefono = ?", [idtelefono])
    conn.end()
}

async function modificar_telefono(modificado){
    const conn = await mariadb.createConnection(config)
    const valores = [modificado.numero, modificado.id_tipo, modificado.documento, modificado.id_telefono]
    await conn.query("update telefonos set numero = ?, id_tipo = ?, documento = ? where id_telefono = ?", valores)
    conn.end()
}

async function consultar_telefonos_por_secuencia(secuencia){
    const conn = await mariadb.createConnection(config)
    let telefonos_encontrados = await conn.query("select * from telefonos where numero like ?",[secuencia])
    conn.end()
    return telefonos_encontrados
}

async function consultar_telefonos_de_persona(documento){
    const conn = await mariadb.createConnection(config)
    let telefonos_encontrados = await conn.query("select * from telefonos where documento = ?",[documento])
    conn.end()
    return telefonos_encontrados
}

async function consultar_telefonos_de_persona_por_id_tipo(documento,idtipo){
    const conn = await mariadb.createConnection(config)
    let telefonos_encontrados = await conn.query("select * from telefonos where documento = ? and id_tipo = ?",[documento,idtipo])
    conn.end()
    return telefonos_encontrados
}

exports.consultar_todos = consultar_todos
exports.consultar_telefono_por_id = consultar_telefono_por_id
exports.consultar_telefono_por_numero = consultar_telefono_por_numero
exports.agregar_telefono = agregar_telefono
exports.eliminar_telefono = eliminar_telefono
exports.modificar_telefono = modificar_telefono
exports.consultar_telefonos_por_secuencia = consultar_telefonos_por_secuencia
exports.consultar_telefonos_de_persona = consultar_telefonos_de_persona
exports.consultar_telefonos_de_persona_por_id_tipo = consultar_telefonos_de_persona_por_id_tipo