const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

const userModel = require('../models/user.model')

let refreshTokens = []

const registerUser = async (req, res) => {
    const userId = uuidv4();
    const { username, email, firstName, password, lastName, phoneNumber } = req.body;
    const verifyEmail = await userModel.findOne({ email: email });
    try {
        if (verifyEmail) {
            res.status(409).json({
                message: "Email already registered"
            })
        } else {
            bcrypt.hash(password, 10)
                .then((hash) => {
                    //Registering the user
                    const user = new userModel({
                        userId: userId,
                        username: username,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hash,
                        phoneNumber: phoneNumber
                    });

                    //saving the data to the mongodb user collection
                    user.save()
                        .then((response) => {
                            res.status(201).json({
                                message: 'user successfully created!',
                                result: response,
                                success: true
                            })
                        })
                        .catch((error) => {
                            res.status(500).json({
                                error: error,
                            })
                        })
                })
        }
    } catch (error) {
        res.status(412).send({
            success: false,
            message: error.message
        })
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.send({ message: "email and password required!" });
    const user = await userModel.find({ email: email });
    try {
        if (user.length == 0) {
            return res.status(401).json({
                message: "Authentication Failed",
            })
        }
        // const passwordMatch = await bcrypt.compare(password, 10, user.password);
        // console.log(passwordMatch);
        // if (isValid) return res.send({message:"Authentication Failed"})
        const usernum = {
            email: user.email,
            userId: user.userId
        }

        const accessToken = jwt.sign(usernum, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign(usernum, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        return res.send({ accessToken: accessToken, refreshToken: refreshToken })

    } catch (error) {
        res.status(412).send({
            success: false,
            message: error.message
        })

    }
}


    const getUserById = async (req, res) => {
        const { id } = req.body;

        try {
            const verifyUser = await userModel.findOne({ _id: id })
            if (!verifyUser) {
                return res.status(404).json({
                    message: "user not found",
                    success: false,
                })
            } else {
                return res.status(200).json({
                    messgae: `user ${verifyUser.firstName}  ${verifyUser.lastName}`,
                    success: true
                })
            }
        }
        catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            })
        }
    }

    const getUsers = async (req, res) => {
        //Fetching all users from database
        try {
            const users = await userModel.find();
            return res.status(200).send({
                data: users,
                sucess: true,
            })
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            })
        }

    }

    const deleteUserById = async (req, res) => {
        const { id } = req.body
        try {
            const isUser = await userModel.findOneAndDelete(id);
            if (!isUser) {
                return res.status(404).send("Record not found!");
            }
            return res.status(201).send({ message: `User (${id}) deleted successfully` })
        } catch (err) {
            return res.status(500).send({ message: err.message || "Internal server error" })
        }
    }

    module.exports = {
        registerUser,
        loginUser,
        getUserById,
        getUsers,
        deleteUserById
    }