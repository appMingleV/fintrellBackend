import {Router} from 'express';
import { projectrepoer,getProjectReport } from '../../controllers/projectReport/projectReport.js';
const routes=Router();
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const uploads=multer({storage});
routes.post('/',uploads.single('image'),projectrepoer);
routes.get('/:enterpriseId/:typeOfContent',getProjectReport);
  
export default routes;