const busModel = require('../models/busModel')

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

const updateSeats = async(bus, seats) =>
{
    const busData = new busModel(bus)
    
    seats.forEach(seat => {
        if (busData.availableSeats.upper.includes(seat)) {
            const index = busData.availableSeats.upper.indexOf(seat);
            if (index > -1) {
                busData.availableSeats.upper.splice(index, 1);
            }
        } else if (busData.availableSeats.lower.includes(seat)) {
            const index = busData.availableSeats.lower.indexOf(seat);
            if (index > -1) {
                busData.availableSeats.lower.splice(index, 1);
            }
        }
    });

    await busData.save();
}
module.exports = {
    findBusByBusID,
    createBus,
    deleteBus,
    getBusesByCriteria,
    updateSeats
}