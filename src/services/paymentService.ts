// Payment Service - UPI Integration for Indian Payment Methods
export interface PaymentDetails {
  amount: string;
  projectId: string;
  projectName: string;
  userId: string;
  userName: string;
  userEmail: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
}

const UPI_ID = '7895227827@paytm';

// Generate UPI Payment Link
export const generateUPIPaymentLink = (details: PaymentDetails): string => {
  // Remove ₹ symbol and commas from price
  const amountNum = details.amount.replace(/₹|,/g, '').trim();
  
  // UPI Deep Link Format
  const upiParams = new URLSearchParams({
    pa: UPI_ID, // Payment Address (UPI ID)
    pn: 'WebProject', // Payee Name
    tn: `Payment for ${details.projectName}`, // Transaction Note
    am: amountNum, // Amount
    cu: 'INR', // Currency
    // Additional params for better tracking
    mc: '0000', // Merchant Code (optional)
    tr: `WP${Date.now()}`, // Transaction Reference ID
  });

  return `upi://pay?${upiParams.toString()}`;
};

// Generate PhonePe Payment Link
export const generatePhonePeLink = (details: PaymentDetails): string => {
  const amountNum = details.amount.replace(/₹|,/g, '').trim();
  return `phonepe://pay?pa=${UPI_ID}&pn=WebProject&am=${amountNum}&cu=INR&tn=Payment for ${encodeURIComponent(details.projectName)}`;
};

// Generate Paytm Payment Link
export const generatePaytmLink = (details: PaymentDetails): string => {
  const amountNum = details.amount.replace(/₹|,/g, '').trim();
  return `paytmmp://pay?pa=${UPI_ID}&pn=WebProject&am=${amountNum}&cu=INR&tn=Payment for ${encodeURIComponent(details.projectName)}`;
};

// Generate Google Pay Link
export const generateGooglePayLink = (details: PaymentDetails): string => {
  const amountNum = details.amount.replace(/₹|,/g, '').trim();
  return `tez://upi/pay?pa=${UPI_ID}&pn=WebProject&am=${amountNum}&cu=INR&tn=Payment for ${encodeURIComponent(details.projectName)}`;
};

// Generate QR Code Data (for UPI QR)
export const generateQRData = (details: PaymentDetails): string => {
  const amountNum = details.amount.replace(/₹|,/g, '').trim();
  return `upi://pay?pa=${UPI_ID}&pn=WebProject&am=${amountNum}&cu=INR&tn=Payment for ${encodeURIComponent(details.projectName)}`;
};

// Process Payment (Records the payment attempt)
export const processPayment = async (details: PaymentDetails, method: 'upi' | 'phonepe' | 'paytm' | 'googlepay' | 'card' | 'netbanking'): Promise<PaymentResult> => {
  try {
    // Generate transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substring(7).toUpperCase()}`;
    
    // Save payment record
    const purchase = {
      id: `purchase-${Date.now()}`,
      userId: details.userId,
      projectId: details.projectId,
      projectName: details.projectName,
      amount: details.amount,
      paymentId: transactionId,
      paymentMethod: method,
      status: 'pending', // In real app, this would be updated via webhook
      timestamp: new Date().toISOString(),
      deliveryDate: calculateDeliveryDate(details.projectName),
    };
    
    // Save to localStorage (in production, this would be a backend API call)
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    purchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(purchases));
    
    // Log activity
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    activities.push({
      id: `activity-${Date.now()}`,
      userId: details.userId,
      action: 'purchase_initiated',
      description: `Initiated payment for ${details.projectName} via ${method}`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('activities', JSON.stringify(activities));
    
    return {
      success: true,
      transactionId,
      message: 'Payment initiated successfully. Please complete the payment in your payment app.'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Payment failed. Please try again.'
    };
  }
};

// Calculate delivery date based on project type
export const calculateDeliveryDate = (projectName: string): string => {
  const now = new Date();
  let daysToAdd = 7; // Default
  
  const name = projectName.toLowerCase();
  if (name.includes('basic') || name.includes('starter')) {
    daysToAdd = 3;
  } else if (name.includes('standard') || name.includes('business')) {
    daysToAdd = 7;
  } else if (name.includes('professional') || name.includes('advanced')) {
    daysToAdd = 12;
  } else if (name.includes('premium') || name.includes('dynamic')) {
    daysToAdd = 14;
  } else if (name.includes('enterprise') || name.includes('custom')) {
    daysToAdd = 30;
  }
  
  const deliveryDate = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
  return deliveryDate.toISOString();
};

// Get delivery timeline
export const getDeliveryTimeline = (purchaseDate: string, deliveryDate: string) => {
  const start = new Date(purchaseDate);
  const end = new Date(deliveryDate);
  const now = new Date();
  
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(0, totalDays - elapsedDays);
  
  const progress = Math.min(100, Math.round((elapsedDays / totalDays) * 100));
  
  return {
    totalDays,
    elapsedDays,
    remainingDays,
    progress,
    isCompleted: now >= end,
    expectedDelivery: end.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  };
};

// Verify payment (mock - in production this would verify with payment gateway)
export const verifyPayment = async (transactionId: string): Promise<boolean> => {
  // In production, this would call the payment gateway API to verify
  // For now, we'll simulate verification
  console.log('Verifying payment:', transactionId);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate random success (in production, this would be actual verification)
      resolve(Math.random() > 0.1); // 90% success rate for demo
    }, 1000);
  });
};
