"use client";
import React from "react";
import {
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { app } from "@/config/firebaseConfig";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const db = getFirestore(app);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const checkBusinessRegistration = async () => {
    try {
      const docRef = doc(db, "Business", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        router.replace("/create-business");
      }
    } catch (error) {
      console.error("Error checking business registration:", error);
    }
  };

  React.useEffect(() => {
    if (user) {
      checkBusinessRegistration();
    }
  }, [user]);

  return (
    <div className="flex flex-col p-10">
      <div className="flex-1">
        <main className="container mx-auto px-4 py-8">
          <section className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Effortlessly Schedule Meetings
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Simplify your team's scheduling process with our intuitive app.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => router.push("/create-meeting")}>
              Get Started
            </button>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Key Features
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <li className="bg-white shadow-md p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">
                  Intuitive Interface
                </h3>
                <p className="text-gray-600">
                  Easily create and manage meetings with our user-friendly
                  interface.
                </p>
              </li>
              <li className="bg-white shadow-md p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">
                  Edit/Delete Meeting
                </h3>
                <p className="text-gray-600">
                  Modify or remove scheduled meetings with ease using our
                  intuitive interface.
                </p>
              </li>
              <li className="bg-white shadow-md p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">
                  Flexible Scheduling
                </h3>
                <p className="text-gray-600">
                  Schedule meetings at your convenience with customizable
                  options.
                </p>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
