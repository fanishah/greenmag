import { ParseFilePipeBuilder } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const MulterSetting: any = {
  storage: diskStorage({
    destination: './public/img',
    filename: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), 'false');
      }
      callback(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
    },
  }),
};
const UploadedFileSetting: any = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
  .build();

export { MulterSetting, UploadedFileSetting };
