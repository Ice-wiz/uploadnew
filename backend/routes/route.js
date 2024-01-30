import { Router } from 'express';

const router = Router();

router.get("/signed-url",async function(req,res){
    const {fileName, fileType} = req.query;
    const result = await s3.uploadFile(fileName,fileType);
  res.send(result);
})

export default router