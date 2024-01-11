const starkbank = require('starkbank');
const privateKeyContent = process.env.PrivateKey;
const projectId = process.env.ProjectId;
const project = new starkbank.Project({
      id: projectId,
      privateKey: privateKeyContent,
      environment: 'sandbox'
    });
starkbank.user = project;
starkbank.language = 'en-US';

exports.handler = async (event) => {
  try {
    const invoiceCallback = JSON.parse(event.body).event.log.invoice;
    const transferAmount = invoiceCallback.amount - invoiceCallback.fee;
    const transfers = await starkbank.transfer.create([
      {
        amount: transferAmount,
        bankCode: '20018183',
        branchCode: '0001',
        accountNumber: '6341320293482496',
        accountType: "payment",
        taxId: '20.018.183/0001-80',
        name: 'Stark Bank S.A.',

      }
    ]);
    return {
      statusCode: 200,
      body: JSON.stringify(transfers)
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing callback', error: error.message })
    };
  }
};

exports.language = "en-US";
exports.user = project;
