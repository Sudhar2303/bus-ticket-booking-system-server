const busModel = require('../Model/busModel')

const findBusByBusID = async(busID) => {
    return busModel.findOne({ busID })
}

const createBus = async( busData ) => {

    const user = new busModel(busData)

    return await user.save()
}

const deleteBus = async( _id) =>{
    return busModel.deleteOne({ _id })
}

const getBusesByCriteria = async(source, destination, travelDateParsed) =>{
     return busModel.find({
        source: { 
            $regex: new RegExp(`^${source}$`, "i") 
        }, 
        destination: { 
            $regex: new RegExp(`^${destination}$`, "i") 
        }, 
        travelDate: travelDateParsed, 
    });
}

module.exports = {
    findBusByBusID,
    createBus,
    deleteBus,
    getBusesByCriteria
}