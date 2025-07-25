'use client';
import { useEffect } from "react";
import { useActionState } from "react"; // ✅ useActionState for Server Actions
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import addMessage from "../actions/addMessage";
import SubmitMessageButton from "./SubmitMessageButton";

const ServiceContactForm = ({ service }) => {
  const { data: session } = useSession();
  const [state, formAction] = useActionState(addMessage, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success('Message sent successfully');
  }, [state]);

  if (state.submitted) {
    return (
      <p className="text-green-500 mb-4">
        Your service request has been sent
      </p>
    );
  }

  return (
    session && (
      <>
        {/* <!-- Contact Plumber Form --> */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-6">Contact Plumber</h3>
          <form action={formAction}>
            <input type="hidden" id="service" name="service" defaultValue={service._id} />
            <input type="hidden" id="recipient" name="recipient" defaultValue={service.owner} />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                Describe Your Issue:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                id="body"
                name="body"
                placeholder="Briefly explain the plumbing issue you're facing"
              ></textarea>
            </div>

            <div>
              <SubmitMessageButton />
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default ServiceContactForm;
