'use client';
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/GlobalContext";
import markMessageAsRead from "../actions/markMessageAsRead";
import deleteMessage from "../actions/deleteMessage";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isPending, startTransition] = useTransition();
  const [isDelete, setIsDelete] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    startTransition(async () => {
      try {
        const read = await markMessageAsRead(message._id);
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        toast.success(`Marked as ${read ? 'read' : 'unread'}`);
      } catch (error) {
        toast.error('Failed to update status');
        console.error(error);
      }
    });
  };

  const handleDeleteClick = async () => {
    startTransition(async () => {
      try {
        await deleteMessage(message._id);
        setIsDelete(true);
        setUnreadCount((prevCount) => (!isRead ? prevCount - 1 : prevCount));
        toast.success('Inquiry Deleted');
      } catch (error) {
        toast.error('Failed to delete inquiry');
        console.error(error);
      }
    });
  };

  if (isDelete) {
    return <p>Service request deleted.</p>;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className='absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-md'>
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Service Request:</span>{" "}
        {message.service?.name || "General Plumbing Inquiry"}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Customer Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Customer Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        className="mt-4 mr-3 bg-blue-600 text-white py-1 px-3 rounded-md disabled:opacity-50"
        onClick={handleReadClick}
        disabled={isPending}
      >
        {isPending ? 'Updating...' : (isRead ? 'Mark as Unread' : 'Mark as Read')}
      </button>
      <button
        className="mt-4 mr-3 bg-red-600 text-white py-1 px-3 rounded-md"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
