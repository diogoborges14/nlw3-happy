#!/usr/bin/node
import { Database } from 'sqlite-async'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

// Create table db
function execute(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            latitude TEXT,
            longitude TEXT,
            name TEXT,
            about TEXT,
            cellphone TEXT,
            images TEXT,
            instructions TEXT,
            opening_hours TEXT,
            open_on_weekends BOOLEAN
        );
    `)
}

export default Database.open(__dirname + "/database.sqlite").then(execute) // return db