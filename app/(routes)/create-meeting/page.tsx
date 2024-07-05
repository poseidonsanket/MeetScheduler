"use client";
import React, { useState } from "react";
import MeetingForm from "./_components/MeetingForm";
import PreviewMeeting from "./_components/PreviewMeeting";

function CreateMeeting() {
  const [formValue, setFormValue] = useState();
  return (
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
