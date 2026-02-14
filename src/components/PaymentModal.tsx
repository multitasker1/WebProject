import { useState } from 'react';
import { X, CreditCard, Smartphone, QrCode, CheckCircle, Loader, ExternalLink } from 'lucide-react';
import { processPayment, generateUPIPaymentLink, generatePhonePeLink, generatePaytmLink, generateGooglePayLink, PaymentDetails } from '../services/paymentService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  price: string;
  userId: string;
  userName: string;
  userEmail: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  projectId,
  projectName,
  price,
  userId,
  userName,
  userEmail,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'phonepe' | 'paytm' | 'googlepay' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  if (!isOpen) return null;

  const paymentDetails: PaymentDetails = {
    amount: price,
    projectId,
    projectName,
    userId,
    userName,
    userEmail,
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Generate payment link based on method
    let paymentLink = '';
    switch (paymentMethod) {
      case 'phonepe':
        paymentLink = generatePhonePeLink(paymentDetails);
        break;
      case 'paytm':
        paymentLink = generatePaytmLink(paymentDetails);
        break;
      case 'googlepay':
        paymentLink = generateGooglePayLink(paymentDetails);
        break;
      case 'upi':
      default:
        paymentLink = generateUPIPaymentLink(paymentDetails);
        break;
    }

    // Try to open payment app
    if (paymentMethod !== 'card' && paymentMethod !== 'netbanking') {
      window.location.href = paymentLink;
    }

    // Process payment record
    const result = await processPayment(paymentDetails, paymentMethod);
    
    if (result.success) {
      setTransactionId(result.transactionId || '');
      setPaymentSuccess(true);
    }
    
    setIsProcessing(false);
  };

  const paymentMethods = [
    { id: 'phonepe', name: 'PhonePe', icon: Smartphone, color: 'bg-purple-600' },
    { id: 'paytm', name: 'Paytm', icon: Smartphone, color: 'bg-blue-600' },
    { id: 'googlepay', name: 'Google Pay', icon: Smartphone, color: 'bg-green-600' },
    { id: 'upi', name: 'UPI', icon: QrCode, color: 'bg-orange-600' },
    { id: 'card', name: 'Card', icon: CreditCard, color: 'bg-indigo-600' },
    { id: 'netbanking', name: 'Net Banking', icon: CreditCard, color: 'bg-teal-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" onClick={onClose} />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {paymentSuccess ? 'Payment Initiated!' : 'Complete Payment'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {projectName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {paymentSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Payment Request Sent!
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Please complete the payment in your payment app.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Transaction ID</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">
                    {transactionId}
                  </p>
                </div>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <p>✓ Your order has been recorded</p>
                  <p>✓ Payment timeline has started</p>
                  <p>✓ Check your dashboard for delivery updates</p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <>
                {/* Amount */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Amount</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">{price}</p>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Choose Payment Method
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === method.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900 dark:border-blue-400'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                          <method.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {method.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-6">
                  <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Payment Details:
                  </h5>
                  <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <p>• UPI ID: 7895227827@paytm</p>
                    <p>• UPI Number: 7895227827</p>
                    <p>• All major UPI apps supported</p>
                    <p>• Secure & Instant Payment</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-1 flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-5 h-5" />
                        <span>Pay {price}</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>

                <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
                  By proceeding, you agree to our Terms & Conditions. Payment is secure and encrypted.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
