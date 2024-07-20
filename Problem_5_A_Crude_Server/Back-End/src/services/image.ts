import * as fs from 'fs';
import path, { join } from 'path';
import fileUpload from 'express-fileupload';
import express from 'express';

// Ensure the ErrorWithStatusCode class is defined or imported correctly
class ErrorWithStatusCode extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

const getDefaultImagePathAndURL = () => {
    const imageURL = join(process.env.BACKEND_URL || '', 'images');
    const imagePath = join(
        __dirname,
        __dirname.includes('build') ? '../../../src' : '../',
        process.env.STORAGE_URL || ''
    );
    return { imageURL, imagePath };
};

const imageConfig = fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    limitHandler: (_req: any, _res: any, next: (arg0: ErrorWithStatusCode) => void) => {
        next(
            new ErrorWithStatusCode(
                'File size limit has been reached',
                413,
            ),
        );
    },
    useTempFiles: true,
    tempFileDir: '/tmp/',
});

const sendFile = (req: express.Request, res: express.Response) => {
    const { filename } = req.params;

    const { imagePath } = getDefaultImagePathAndURL();
    const image = join(imagePath, filename);

    if (fs.existsSync(image)) {
        res.sendFile(image);
    } else {
        res.status(404).send('File not found');
    }
};

const uploadImage = async (file: fileUpload.UploadedFile, userId: number): Promise<string> => {
    const { imagePath } = getDefaultImagePathAndURL();
    const fileBaseUrl = `${process.env.BACKEND_URL}/images`;

    // Ensure the folder exists
    if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath, { recursive: true });
    }

    // Generate a unique filename for the avatar
    const uniqueFileName = `${userId}-${Date.now()}-${path.basename(file.name)}`;
    const filePath = path.join(imagePath, uniqueFileName);

    // Read the file data from the temporary path and write it to the final destination
    try {
        const fileData = fs.readFileSync(file.tempFilePath);
        fs.writeFileSync(filePath, fileData);
    } catch (error) {
        console.error('Error reading or writing file:', error);
        throw error; // Re-throw the error to handle it further up the stack
    }

    // Generate the URL to access the uploaded avatar
    const avatarUrl = `${fileBaseUrl}/${uniqueFileName}`;

    return avatarUrl;
};

const deleteImage = (fileName: string) => {
    const { imagePath } = getDefaultImagePathAndURL();
    const filePath = path.join(imagePath, fileName);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted image: ${fileName}`);
    } else {
        console.log(`Image not found: ${fileName}`);
    }
};

export { getDefaultImagePathAndURL, imageConfig, sendFile, uploadImage, deleteImage };