import { createRxDatabase } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { patientSchema, reportSchema } from '../db/schemas'

let dbPromise: any = null

async function initDB() {
  const db = await createRxDatabase({
    name: 'radiology_local_db',
    storage: getRxStorageDexie(),
  })

  // Регистрируем обе коллекции одновременно
  await db.addCollections({
    patients: { schema: patientSchema },
    reports: { schema: reportSchema },
  })

  return db
}

export const useDb = () => {
  if (!dbPromise) {
    dbPromise = initDB()
  }

  const getCollections = async () => {
    const db = await dbPromise
    return {
      patients: db.patients,
      reports: db.reports,
    }
  }

  return { getCollections }
}
