const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { previousPasswordService } = require('../services');

dayJs.extend(utc);

module.exports = async () => {
  try {
    console.log('Remove old passwords start', new Date().toISOString());
    const oneMonthBeforeNow = dayJs()
      .utc()
      .subtract(6, 'month');

    await previousPasswordService.deleteManyBeforeDate(oneMonthBeforeNow);

    console.log('Remove old passwords end', new Date().toISOString());
  } catch (e) {
    console.log(e);
  }
};
