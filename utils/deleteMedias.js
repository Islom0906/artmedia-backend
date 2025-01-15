import path from 'path';
import fs from 'fs';

const deleteMedias = (medias) => {
    medias.forEach((media) => {
        const filePath = path.join('media', media.name);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
                return;
            }

            console.log(`Successfully deleted file: ${filePath}`);
        });
    });
};

export default deleteMedias;
