const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;
const fs = require('fs');
const axios = require('axios');
const cors = require('cors')
const { randomString } = require('../middlewares/GenRandom');
const UserModel = require('../models/user.model');
const ErrorModel = require('../models/error.model')

router.use(cors());

// configuring model
async function apierror(response) {
    var error_desc = ''
    var error_line = ''
    var error_verify = ''
    var error_links = ''

    await axios.post(process.env.PREDICTION_SERVER, {
        "Message_send": response
    }).then((result) => {
        console.log("RESULT FROM MODEL: " + result.data.error_line)
        var line = parseInt(result.data.error_line) - 1;
        error_desc = result.data.prediction;
        error_line = line;
        error_verify = result.data.verify;
        error_links = result.data.links

        return { error_desc, error_line, error_verify, error_links }
    })
    return { error_desc, error_line, error_verify, error_links };
}

router.get('/sendwithexe', async (req, res) => {
    let data = req.query["category"]
    let email = req.query["isUser"]
    var rand = randomString(12);
    const user = await UserModel.findOne({ email: email })
    console.log("USER IS: " + email)

    fs.writeFileSync('./codeFiles/' + rand + '.py', data)
    const { exec } = require('child_process');

    exec('py -3.9 ./codeFiles/' + rand + '.py', (err, stdout, stderr) => {
        if (err) {
            //checking user
            let dataFromFastApi = apierror(err.toString())
            dataFromFastApi.then(async function ({ error_desc, error_line, error_verify, error_links }) {
                // if error is present in dataset
                if (error_verify === true) {
                    if (email === "notuser" || email === "undefined" || email === "" || email === null) {
                        console.log("RESULT: " + error_desc);
                        console.log("Error line: " + error_line);
                        console.log("Error verify: " + error_verify);

                        res.send({
                            "output": error_desc,
                            error_line: error_line,
                            error_verify: error_verify,
                            error_links: error_links,
                            "success": false,
                        });
                    } else {

                        
                        user.setError += 1;
                        res.send({
                            "output": error_desc,
                            error_line: error_line,
                            error_verify: error_verify,
                            error_links: error_links,
                            "success": false,
                            "setError": user.setError,
                            "setSuccess": user.setSuccess
                        });
                        user.save();
                    }
                }
                else {
                    // on error not registered 
                    var output = "We are extremly sorry the current error is not registered in the database we have sent the request to developers"
                    console.log("ERROR IS NOT REGISTERED");
                    try {
                        await ErrorModel.create({ _error: err })
                        user.setError += 1;
                        console.log("ERROR ADDED TO DB")
                        res.send({
                            "output": output,
                            "setError": user.setError,
                            "setSuccess": user.setSuccess,
                        })
                        user.save();
                    } catch (e) {
                        console.log("ERROR ENTERING ERROR IN DB: " + e);
                    }
                }
            })

        }
        else {
            if (email === "notuser" || email === "undefined" || email === "" || email === null) {
                console.log("USER IS NOT PRESENT")
                res.send({ "output": stdout, "success": true });
            } else {
                console.log("USER IS PRESENT")
                user.setSuccess += 1;
                console.log("USER SUCCESS RATE" + user.setSuccess)
                res.send({ "output": stdout, "success": true, "setError": user.setError, "setSuccess": user.setSuccess });
                user.save();
            }
        }

    });
    // await user.save();   
})



module.exports = router;