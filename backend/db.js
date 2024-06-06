const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://ns7428149338:ns999.co.in@cluster0.y0zerpt.mongodb.net/gofood?retryWrites=true&w=majority'

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("gofood");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("gofood2");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })

            })
        }
    });
}

module.exports = mongoDB;
