import Dexie from 'dexie'

class AppDatabase extends Dexie {
  constructor() {
    super('radiology-hub')

    this.version(4).stores({
      patients:
        'id, shortName, firstName, middleName, lastName, birthDate, gender, createdAt, updatedAt, deleted',
    })
  }
}

export const db = new AppDatabase()
