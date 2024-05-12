// Save a new orphanage on database
export default function dbOrphanageInsert(db, orphanage) {
    return db.run(`
        INSERT INTO orphanages (
            latitude,
            longitude,
            name,
            about,
            cellphone,
            images,
            instructions,
            opening_hours,
            open_on_weekends
        ) VALUES (
            "${orphanage.latitude}",
            "${orphanage.longitude}",
            "${orphanage.name}",
            "${orphanage.about}",
            "${orphanage.cellphone}",
            "${
                Array.isArray(orphanage.images) ?
                orphanage.images.join(';') :
                orphanage.images
            }",
            "${orphanage.instructions}",
            "${orphanage.opening_hours}",
            "${orphanage.open_on_weekends}"
        );
    `)
}