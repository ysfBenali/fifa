import React from 'react';

const colorsMapping: {
  [key: string]: {
    textColor: string;
    bgColor: string;
    borderColor: string;
  };
} = {
  error: {
    textColor: 'text-red-800',
    bgColor: 'bg-red-300',
    borderColor: 'border-red-400'
  },
  success: {
    textColor: 'text-green-800',
    bgColor: 'bg-green-300',
    borderColor: 'border-green-400'
  },
  warning: {
    textColor: 'text-yellow-400',
    bgColor: 'bg-yellow-300',
    borderColor: 'border-yellow-400'
  },
  info: {
    textColor: 'text-info-400',
    bgColor: 'bg-info-300',
    borderColor: 'border-info-400'
  }
};

function SnackBar({
  text,
  variant,
  onClose
}: {
  text: string;
  variant?: string;
  onClose?: () => void;
}) {
  const innerVariant = variant ? variant : 'info';

  const clx = `${colorsMapping[innerVariant].textColor} ${colorsMapping[innerVariant].bgColor} ${colorsMapping[innerVariant].borderColor} `;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="absolute bottom-1 left-5">
      <div
        className={`flex items-center w-[300px] p-4 mb-4 rounded-lg border-l-4 ${clx}`}
        role="alert"
      >
        <div className="ml-3 text-sm font-medium">{text}</div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8"
          data-dismiss-target="#alert-1"
          aria-label="Close"
          onClick={handleClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SnackBar;
