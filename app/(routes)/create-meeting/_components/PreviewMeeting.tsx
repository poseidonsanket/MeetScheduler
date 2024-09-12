import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function PreviewMeeting({ formValue, setFormValue }: any) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<any>();
  const [timeSlots, setTimeSlots] = useState<any>();

  useEffect(() => {
    formValue?.duration && createTimeSlot(formValue?.duration);
  }, [formValue]);

  useEffect(() => {
    if (date && timeSlot) {
      setFormValue({
        ...formValue,
        dateString: date,
        timeSlot: timeSlot,
      });
    }
  }, [date, timeSlot]);

  /**
   * Used to create timeslot depends on interval
   * @param {*} interval
   */
  const createTimeSlot = (interval: any) => {
    const startTime = 1 * 60; // 8 AM in minutes
    const endTime = 23 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });

    setTimeSlots(slots);
  };
  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8"
      style={{ borderTopColor: formValue?.themeColor }}
    >
      <Image src="/logo.svg" alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Meeting Info  */}
        <div className="p-4 border-r">
          <h2>Business Name</h2>
          <h2 className="font-bold text-3xl">
            {formValue?.eventName ? formValue?.eventName : "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {formValue?.duration} Min{" "}
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {formValue?.locationType} Meeting{" "}
            </h2>
            <Link href={"#"} className="text-primary">
              {formValue?.locationUrl}
            </Link>
          </div>
        </div>
        {/* Time & Date Selction  */}
        <div className="md:col-span-2 lg:col-span-2 lg:flex px-4">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Select Date & Time</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mt-5"
              disabled={(date) => date <= new Date()}
            />
          </div>
          <div
            className="flex flex-col w-full overflow-auto gap-4 p-5"
            style={{ maxHeight: "400px" }}
          >
            {timeSlots?.map((time: any, index: any) => (
              <Button
                className={`border-primary
                         text-primary ${timeSlot == time && "bg-blue-200"}`}
                variant="outline"
                key={index}
                onClick={() => setTimeSlot(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewMeeting;
