import React from 'react';

interface ConnectionToastProps {
  visible: boolean;
  sender: {
    name: string;
    avatar: string;
  };
}

const ConnectionToast = ({ visible, sender }: ConnectionToastProps) => {
  return (
    <div
      className={`${
        visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={sender.avatar}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {sender.name}
            </p>
            <p className="text-sm text-gray-500">
              wants to connect with you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionToast;