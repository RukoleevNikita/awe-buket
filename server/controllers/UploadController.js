import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cd) => {
        cd(null, `${file.originalname}`);
    }
});

const upload = multer({ storage }).any("image");

export const uploadHandler = async (req, res) => {
    
    upload(req, res, async err => {
        if (err) res.end("error!");

        let paths = [];
        await req.files.map(el => {
            paths.push(`${el.path}`);
        });

        res.status(201).json({
            status: "success",
            urls: paths,
        });
    });
};
