import Dexie from 'dexie'

class AppDatabase extends Dexie {
  constructor() {
    super('radiology-hub')

    this.version(9).stores({
      patients:
        'id, shortName, firstName, middleName, lastName, birthDate, gender, createdAt, updatedAt, deleted',
      reports:
        'id, patientId, modality, createdAt, updatedAt, studyDescription, description, conclusion, deleted',
      templates:
        'id, modality, region, description, conclusion, deleted, createdAt',
      settings: 'key, updatedAt',
    })
  }
}

export const db = new AppDatabase()
