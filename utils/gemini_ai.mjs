import express from "express";
import dotenv from 'dotenv'
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold
} from "@google/generative-ai";

dotenv.config()


const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.gemeni_api_key

export const run_gemeni = async (data) => {
try {
    console.log("the data is >>>>",data)
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048
    };

    const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }
    ];

    const parts = [{ text: `chat back according to this /${data.body}/` }];
    console.log("isit bad object>>>>>>>>>>",parts)
    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings
    });

    const response = result.response;
    console.log(response.text());
    return response.text();
} catch (error) {
    console.log(error)
}
};


