"use client";
import React, { useEffect, useState } from "react";
import MeetingForm from "../_components/MeetingForm";
import PreviewMeeting from "../_components/PreviewMeeting";
import { useParams, useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";

function CreateMeeting() {
  const params = useParams();
  const meetingId = params.meetingId;
  const [formValue, setFormValue] = useState<any | undefined>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (meetingId) {
      fetchMeetingData(meetingId);
    }
  }, [meetingId]);

  const fetchMeetingData = async (id: any) => {
    const db = getFirestore(app);
    const docRef = doc(db, "MeetingEvent", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFormValue(docSnap.data());
      setLoading(false);
    } else {
      console.log("No such document!");
    }
  };

  // console.log(formValue);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {/* Meeting Form  */}
      <div className="lg:shadow-md lg:border lg:h-screen">
        <MeetingForm
          setFormValue={(v: any) => setFormValue(v)}
          formValue={formValue}
        />
      </div>
      {/* Preview  */}
      <div className="md:col-span-2 ">
        <PreviewMeeting
          formValue={formValue}
          setFormValue={(v: any) => setFormValue(v)}
        />
      </div>
    </div>
  );
}

export default CreateMeeting;
