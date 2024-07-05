"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocationOption from "@/app/_utils/LocationOption";
import Image from "next/image";
import Link from "next/link";
import ThemeOptions from "@/app/_utils/ThemeOption";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

function MeetingForm({ setFormValue, formValue }: any) {
  console.log(formValue);
  const params = useParams();
  const metId = params.meetingId;
  console.log(metId);
  const [location, setLocation] = useState<any>(formValue?.location);
  const [themeColor, setThemeColor] = useState(formValue?.themeColor);
  const [eventName, setEventName] = useState(formValue?.eventName);
  const [duration, setDuration] = useState(formValue?.duration);
  const [locationType, setLocationType] = useState<any>(
    formValue?.locationType
  );
  const [locationUrl, setLocationUrl] = useState(formValue?.locationUrl);
  const { user }: any = useKindeBrowserClient();
  const db = getFirestore(app);
  const router = useRouter();
  useEffect(() => {
    setFormValue({
      ...formValue,
      eventName: eventName,
      duration: duration,
      locationType: locationType,
      locationUrl: locationUrl,
      themeColor: themeColor,
    });
  }, [eventName, duration, locationType, locationUrl, themeColor]);

  const date = formValue?.date;
  const time = formValue?.time;
  console.log(date, time);

  const onCreateClick = async () => {
    if (!metId) {
      console.error("Invalid form value or missing ID");
      return;
    }

    if (!date || !time) {
      console.error("Date or time is undefined");
      return;
    }

    //@ts-ignore
    const meetingEventRef: any = doc(db, "MeetingEvent", metId);

    await updateDoc(meetingEventRef, {
      eventName: eventName,
      duration: duration,
      locationType: locationType,
      locationUrl: locationUrl,
      themeColor: themeColor,
      businessId: doc(db, "Business", user?.email),
      createdBy: user?.email,
      date: date,
      time: time,
    });
    console.log(formValue);

    toast("Meeting Event Updated!");
    router.replace("/dashboard/meeting-type");
  };
  return (
    <div className="p-8 ">
      <Link href={"/dashboard"}>
        <h2 className="flex gap-2">
          <ChevronLeft /> Cancel
        </h2>
      </Link>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr></hr>
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name *</h2>
        <Input
          placeholder="Name of your meeting event"
          value={eventName}
          onChange={(event: any) => setEventName(event.target.value)}
        />

        <h2 className="font-bold">Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {duration} Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDuration(15)}>
              15 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(30)}>
              30 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(45)}>
              45 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(60)}>
              60 Min
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location *</h2>
        <div className="grid grid-cols-4 gap-3">
          {LocationOption.map((option, index) => (
            <div
              key={index}
              className={`border flex flex-col
                     justify-center items-center 
                     p-3 rounded-lg cursor-pointer
                     hover:bg-blue-100 hover:border-primary
                     ${
                       locationType == option.name &&
                       "bg-blue-100 border-primary"
                     }`}
              onClick={() => {
                setLocationType(option.name);
                setLocation(option.name);
              }}
            >
              <Image
                src={option.icon}
                width={30}
                height={30}
                alt={option.name}
              />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>
        {locationType && (
          <>
            <h2 className="font-bold">Add {location} Url *</h2>
            <Input
              placeholder="Add Url"
              value={locationUrl}
              onChange={(event: any) => setLocationUrl(event.target.value)}
            />
          </>
        )}
        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-evenly">
          {ThemeOptions.map((color, index) => (
            <div
              key={index}
              className={`h-7 w-7 rounded-full
                    ${themeColor == color && " border-4 border-black"}`}
              style={{ backgroundColor: color }}
              onClick={() => setThemeColor(color)}
            ></div>
          ))}
        </div>
      </div>

      <Button className="w-full mt-9" onClick={() => onCreateClick()}>
        Create
      </Button>
    </div>
  );
}

export default MeetingForm;
