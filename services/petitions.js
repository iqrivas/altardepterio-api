const petitionMocks = require('../utils/mocks/petitions');
const MongoLib = require('../lib/mongo');

class PetitionsService {
    constructor() {
        this.collection = 'requests';
        this.mongoDB = new MongoLib();
    }

    async getPetitions ({tags}) {
        const query = tags && {sqid: { $in: tags}};
        const petitions = await this.mongoDB.getAll(this.collection, query);
        return petitions || [];
    }

    async getPetition ({petitionId}) {
        const petition = await this.mongoDB.get(this.collection, petitionId);
        return petition || {};
    }

    async createPetition ({petitionBody}) {
        const createdPetitionId = await this.mongoDB.create(this.collection, petitionBody);
        return createdPetitionId;
    }

    async updatePetition ({petitionId, petitionBody}) {
        const updatedPetitionId = await this.mongoDB.update(this.collection, petitionId, petitionBody);
        return updatedPetitionId;
    }

    async deletePetition ({petitionId}) {
        const deletedPetitionId = await this.mongoDB.delete(this.collection, petitionId);
        return deletedPetitionId;
    }

}

module.exports = PetitionsService;