import connectDB from "../config/database";
import Message from "../models/Message";
import '@/app/models/service'; // Updated model import
import { getSessionUser } from "../utils/getSessionUser";
import MessageCard from "../components/MessageCard";
import { redirect } from "next/navigation";

const MessagesPage = async () => {
  await connectDB();
  
  const sessionUser = await getSessionUser();
  
  if (!sessionUser || !sessionUser.userId) {
    redirect('/api/auth/signin');
  }
  
  const { userId } = sessionUser;
  
  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('service', 'name') // Changed from property to service
    .lean();
    
  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('service', 'name') // Changed from property to service
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => ({
    _id: messageDoc._id.toString(),
    sender: {
      _id: messageDoc.sender._id.toString(),
      username: messageDoc.sender.username || 'Unknown User'
    },
    recipient: messageDoc.recipient.toString(),
    service: {
      _id: messageDoc.service?._id?.toString() || '',
      name: messageDoc.service?.name || 'Unknown Service'
    },
    name: messageDoc.name || '',
    email: messageDoc.email || '',
    phone: messageDoc.phone || '',
    body: messageDoc.body || '',
    read: messageDoc.read || false,
    createdAt: messageDoc.createdAt ? messageDoc.createdAt.toString() : null,
    updatedAt: messageDoc.updatedAt ? messageDoc.updatedAt.toString() : null
  }));

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Service Inquiries</h1>
          <div className='space-y-4'>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
