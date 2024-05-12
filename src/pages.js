import Database from "./database/db.js"
import dbOrphanageInsert from "./database/db-orphanage-insert.js"

export default {
    /* Creating objet. Same as:
    index: function(){}
    */
    index(request, response){
        return response.render('index')
    },
    orphanageAdd(request, response){
        return response.render('orphanage-add')
    },
    async orphanageDetails(request, response){
        const id = request.query.id
        try {
            const db = await Database;
            const result = await db.all(`SELECT * FROM orphanages WHERE id="${id}";`)
            const orphanage = result[0]
            // transform string into array
            orphanage.images = orphanage.images.split(';')
            // get the img[0] and remove 1 element from array
            orphanage.firstImg = orphanage.images.splice(0, 1)
            orphanage.open_on_weekends = (orphanage.open_on_weekends == "true") ? true : false

            return response.render('orphanage-details', {orphanage: orphanage})
        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados!')
        }
    },
    async orphanagesMap(request, response){
        try {
            const db = await Database;
            const orphanage_db = await db.all('SELECT * FROM orphanages')
            return response.render('orphanage-map', {orphanage_db})
        } catch (error) {
            console.log(error)
            return response.sed('Erro no banco de dados!')
        }
    },
    async orphanageSave(request, response){
        const fields = request.body
        console.log(fields)

        // verify if empty fields
        if(Object.values(fields).includes('') && fields.images != ''){
            return response.send('Faltou preencher alguma coisa (?_?)')
        }
        const db = await Database
        await dbOrphanageInsert(db, fields)
        return response.send('Orfanato cadastrado com sucesso :)')
    }
}