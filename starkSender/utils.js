function generateCpf() {
    const num1 = randomThreeDigits();
    const num2 = randomThreeDigits();
    const num3 = randomThreeDigits();
    const dig1 = dig(num1, num2, num3);
    const dig2 = dig(num1, num2, num3, dig1);
    return `${num1}.${num2}.${num3}-${dig1}${dig2}`;
  }
  
  function dig(n1, n2, n3, n4) { 
    const nums = n1.split("").concat(n2.split(""), n3.split(""));
    if (n4 !== undefined){ 
      nums[9] = n4;
    }
    
    let x = 0;
    for (let i = (n4 !== undefined ? 11:10), j = 0; i >= 2; i--, j++) {
      x += parseInt(nums[j]) * i;
    }
    
    const y = x % 11;
    return y < 2 ? 0 : 11 - y; 
  }
  
  function randomThreeDigits() {
    const digits = Math.floor(Math.random() * 999);
    return ("" + digits).padStart(3, '0'); 
  }

function generateInvoiceArray() {
    const randomNumber = Math.floor(Math.random() * (12 - 8)) + 8;
    const invoiceArray = [];
    for (let i = 0; i < randomNumber; i++) {
      const invoiceObject = {
        amount: Math.floor(Math.random() * 10000) + 10000,
        name: `Random person ${Date.now()}`,
        taxId: generateCpf()
      };
      invoiceArray.push(invoiceObject);
    }
  
    return invoiceArray;
}

module.exports = { generateInvoiceArray };