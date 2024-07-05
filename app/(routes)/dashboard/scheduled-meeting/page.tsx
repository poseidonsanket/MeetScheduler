"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parse, isBefore, isAfter } from "date-fns";
import ScheduledMeetingList from "./_components/ScheduledMeetingList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { app } from "@/config/firebaseConfig";

function ScheduledMeeting() {
  const db = getFirestore(app);
  const { user }: any = useKindeBrowserClient();
  const [meetingList, setMeetingList] = useState<any | undefined>([]);
  useEffect(() => {
    user && getScheduledMeetings();
  }, []);

  const getScheduledMeetings = async () => {
    setMeetingList([]);
    const q = query(
      collection(db, "MeetingEvent"),
      where("createdBy", "==", user.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setMeetingList((prev: any) => [...prev, doc.data()]);
    });
  };


  /**
   * Used to Filter the Meeting
   * @param {*} type
   * @returns
   *
   */

  const filterMeetingList = (type: any) => {
    const currentDate = new Date();
    return meetingList.filter((item: any) => {
      // Firebase timestamp to JavaScript Date object
      const itemDate = item.date.toDate(); // Assuming item.date is a Firebase timestamp
      const itemTime = parse(item.time, "hh:mm aa", new Date());

      // Combine date and time into a single Date object
      const itemDateTime = new Date(
        itemDate.getFullYear(),
        itemDate.getMonth(),
        itemDate.getDate(),
        itemTime.getHours(),
        itemTime.getMinutes()
      );

      if (type === "upcoming") {
        return isAfter(itemDateTime, currentDate);
      } else {
        return isBefore(itemDateTime, currentDate);
      }
    });
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Scheduled Meetings</h2>
      <hr className="my-5"></hr>
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ScheduledMeetingList meetingList={filterMeetingList("upcoming")} />{" "}
        </TabsContent>
        <TabsContent value="expired">
          <ScheduledMeetingList meetingList={filterMeetingList("expired")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ScheduledMeeting;
