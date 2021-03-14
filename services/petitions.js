const petitionMocks = require('../utils/mocks/petitions');

class PetitionsService {
    constructor() {

    }

    getProducts ({tags}) {
        return Promise.resolve(petitionMocks)
    }

    getProduct ({petitionId}) {
        return Promise.resolve(petitionMocks[0])
    }

    createProduct ({petitionBody}) {
        return Promise.resolve(petitionMocks[0])
    }

    updateProduct ({petitionId, petitionBody}) {
        return Promise.resolve(petitionMocks[0])
    }

    deleteProduct ({petitionId}) {
        return Promise.resolve(petitionMocks[0])
    }

}

module.exports = PetitionsService;