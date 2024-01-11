const starkbank = require('starkbank');
const utils = require('./utils');
const privateKeyContent = process.env.PrivateKey;
const projectId = process.env.ProjectId;
const project = new starkbank.Project({
      id: projectId,
      privateKey: privateKeyContent,
      environment: 'sandbox'
    });
starkbank.user = project;
starkbank.language = 'en-US';

exports.handler = async () => {
  try {
    let invoices = await starkbank.invoice.create(utils.generateInvoiceArray());

    return {
      statusCode: 200,
      body: JSON.stringify(invoices)
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending invoice', error: error.message })
    };
  }
};

exports.language = "en-US";
exports.user = project; 
