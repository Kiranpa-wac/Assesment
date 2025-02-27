import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

const SuccessToast = ({ message = "Record Updated Successfully" }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div 
      className="position-fixed bottom-0 end-0 p-3" 
      style={{ zIndex: 1050 }}
    >
      <div 
        className="toast show" 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="toast-header bg-success text-white">
          <CheckCircle size={20} className="me-2" />
          <strong className="me-auto">Success</strong>
          <small>Just now</small>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setVisible(false)}
            aria-label="Close"
          />
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
};

export default SuccessToast;