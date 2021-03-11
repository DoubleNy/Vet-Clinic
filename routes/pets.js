const router = require('express').Router();
const { loginCheck } = require('../middlewares/middlewares');
const User = require('../models/User');
const Pet = require('../models/Pet');

// @desc      Get all pets
// @route     GET /pets
// @access    Private
router.get('/pets', (req, res, next) => {
    Pet.find()
        .populate('owner')
        .then((pets) => {
            console.log('pets', pets);
            // pets.map((pet) => {
            //     return User.findById(pet.owner).populate('owner');
            // });
            res.status(200).json(pets);
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

// router.get('/pets', (req, res, next) => {
//     let pets;
//     Pet.find()
//         .then((petsDB) => {
//             pets = petsDB.map((pet) => {
//                 User.find(pet.owner)
//                     .populate('owner')
//                     .then((owner) => {
//                         // let isEmployee = false;
//                         // if (req.user.role == 'employee') {
//                         //     isEmployee = true;
//                         // } owners: owners[0]
//                         return (pet = { ...pet, owner });
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                         next(err);
//                     });
//                 console.log('pets I send', pets);
//             });
//             res.status(200).json(pets);
//         })
//         .catch((err) => {
//             console.log(err);
//             next(err);
//         });
// });

// @desc      Get pet details
// @route     GET /pets/:id
// @access    Private
router.get('/pets/:id', (req, res, next) => {
    Pet.findById(req.params.id).then((pet) => {
        console.log('pet', pet);
        console.log('owner pet', pet.owner);
        User.find(pet.owner)
            .populate('owner')
            .then((owner) => {
                console.log('owner of the pet', owner[0]);
                res.status(200).json({ pet, owner: owner[0] });
            })
            .catch((err) => {
                next(err);
            });
    });
});

// @desc      Add pet
// @route     POST /pets/add
// @access    Private
router.post(
    '/pets/add',
    // loginCheck,

    (req, res, next) => {
        let {
            name,
            specie,
            breed,
            age,
            diagnosis,
            treatment,
            owner,
        } = req.body;

        if (req.user.role == 'client') {
            owner = req.user.id;
        }
        console.log('owner pets/add', owner);
        Pet.create({
            name,
            specie,
            breed,
            age,
            diagnosis,
            treatment,
            owner,
        })
            .then((pet) => {
                User.findByIdAndUpdate(owner, {
                    $push: { pets: pet._id },
                }).then((response) => {
                    res.status(201).json(response);
                });
            })
            .catch((err) => {
                next(err);
            });
    }
);

// @desc      Edit pet
// @route     PUT /pets/:id
// @access    Private
router.put(
    '/pets/:id',
    loginCheck(),

    (req, res, next) => {
        const { name, specie, breed, age, diagnosis, treatment } = req.body;

        Pet.findByIdAndUpdate(req.params.id, {
            name,
            specie,
            breed,
            age,
            diagnosis,
            treatment,
        })
            .then((pet) => {
                console.log('pet was updated', pet);
                res.status(200).json({
                    message: `Pet ${pet.name} was successfully updated`,
                });
            })
            .catch((err) => {
                next(err);
            });
    }
);
// @desc      Delete pet
// @route     DELETE /pets/:id
// @access    Private
router.delete('/pets/:id', loginCheck(), (req, res) => {
    // const query = { _id: req.params.id };

    // if user is not admin they have to be the owner
    // if (req.user.role !== 'employee') {
    //     query.owner = req.user._id;
    // }
    // console.log('query', query);
    Pet.findByIdAndDelete(req.params.id)
        .then((pet) => {
            console.log('This pet was removed', pet);
            res.status(200).json({
                message: `Pet ${pet.name} was successfully removed`,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
