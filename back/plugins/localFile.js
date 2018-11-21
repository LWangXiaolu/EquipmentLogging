const fs=require('fs-extra');

const {logger}=require('./../startup/logging');

module.exports={
    readLocalFile: async function(f) {
  try {
    let data =await fs.readFile(f, 'utf8');
    return data.slice(-6,-2);
  } catch (err) {
    logger.error(err);
  }
}
}


