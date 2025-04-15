import { useState } from 'react';
import styles from './styles.module.css';

export default function ConfirmationDialog({ 
  title = "Confirm Action", 
  message = "Are you sure you want to perform this action?", 
  onConfirm, 
  onCancel,
  triggerText = "Clear All",
  confirmText = "Confirm",
  cancelText = "Cancel"
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.trigger}>
        {triggerText}
      </button>

      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <h3>{title}</h3>
            <p>{message}</p>
            <div className={styles.buttons}>
              <button onClick={handleConfirm} className={styles.confirm}>
                {confirmText}
              </button>
              <button onClick={handleCancel} className={styles.cancel}>
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}